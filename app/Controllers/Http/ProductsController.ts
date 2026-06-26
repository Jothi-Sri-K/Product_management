import Product from 'App/Models/Product'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { BaseModel } from '@ioc:Adonis/Lucid/Orm'

import {
  CreateProductValidator,
  UpdateProductValidator,
  CreateManyProductsValidator,
  GetProductValidator,
  DeleteProductValidator,
} from 'App/Validators/ProductValidator'

const ProductModel = Product as typeof BaseModel

export default class ProductsController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateProductValidator)
      const product = await Product.create(payload)
      return product
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to create product',
        error: error.message,
      })
    }
  }

  public async index({ request, response }: HttpContextContract) {
    try {
      const { limit } = await request.validate(GetProductValidator)
      if (limit) {
        return await Product.query().limit(limit)
      }
      return await Product.all()
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to fetch products',
        error: error.message,
      })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      return await Product.findOrFail(params.id)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to fetch product',
        error: error.message,
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const product = await Product.findOrFail(params.id)
      const payload = await request.validate(UpdateProductValidator)
      product.merge(payload)
      await product.save()
      return product
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to update product',
        error: error.message,
      })
    }
  }

  public async delete_rec({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(DeleteProductValidator)
      const product = await Product.findOrFail(payload.id)
      await product.delete()
      return {
        message: 'Product deleted successfully',
      }
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to delete product',
        error: error.message,
      })
    }
  }

  public async create_many({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateManyProductsValidator)
      const result = await Product.createMany(payload.products)
      return result
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to create products',
        error: error.message,
      })
    }
  }

  public async sort_desc({ response }: HttpContextContract) {
    try {
      return await Product.query().orderBy('id', 'desc')
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to fetch products',
        error: error.message,
      })
    }
  }
}
