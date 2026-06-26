import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'

import Customer from 'App/Models/Customer'
import Product from 'App/Models/Product'
import Order from 'App/Models/Order'
import OrderItem from 'App/Models/OrderItem'

import {
  CreateOrderValidator,
  ShowOrderValidator,
  ListOrdersValidator,
  DeleteOrderValidator,
} from 'App/Validators/OrderValidator'

export default class OrdersController {
  public async store({ request, response }: HttpContextContract) {
    const trx = await Database.transaction()

    try {
      const payload = await request.validate(CreateOrderValidator)
      const { customerId, products } = payload
      const customer = await Customer.find(customerId)

      if (!customer) {
        await trx.rollback()
        return response.notFound({
          message: 'Customer not found',
        })
      }

      let totalAmount = 0
      const validatedProducts: any[] = []

      for (const item of products) {
        const product = await Product.query().where('name', item.name).first()

        if (!product) {
          await trx.rollback()
          return response.badRequest({
            message: `${item.name} not found`,
          })
        }

        if (product.quantity < item.quantity) {
          await trx.rollback()
          return response.badRequest({
            message: `Insufficient stock for ${product.name}`,
          })
        }

        totalAmount += product.price * item.quantity
        validatedProducts.push({
          product,
          quantity: item.quantity,
        })
      }

      const order = await Order.create(
        {
          customerId,
          status: 'Pending',
          totalAmount,
        },
        {
          client: trx,
        }
      )

      for (const item of validatedProducts) {
        await OrderItem.create(
          {
            orderId: order.id,
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          },
          {
            client: trx,
          }
        )
        item.product.quantity = item.product.quantity - item.quantity
        await item.product.useTransaction(trx).save()
      }

      await trx.commit()

      return response.created({
        message: 'Order placed successfully',
        order,
      })
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

  public async index({ request }: HttpContextContract) {
    const { limit } = await request.validate(ListOrdersValidator)
    if (limit) {
      return await Order.query().limit(limit)
    }
    return await Order.all()
  }

  public async show({ params }: HttpContextContract) {
    return await Order.findOrFail(params.id)
  }

  public async delete_rec({ request, params }: HttpContextContract) {
    const payload = await request.validate(DeleteOrderValidator)
    const order = await Order.findOrFail(payload.id)
    await order.delete()
    return {
      message: 'Order deleted successfully',
    }
  }
}
