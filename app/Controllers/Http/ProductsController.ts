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
  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(CreateProductValidator)
    const product = await Product.create(payload)
    return product
  }

  public async index({ request }: HttpContextContract) {
    const { limit } = await request.validate(GetProductValidator)

    if (limit) {
      return await Product.query().limit(limit)
    }
    return await Product.all()
  }


  public async show({ params }: HttpContextContract) {
    return await Product.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const product = await Product.findOrFail(params.id)
    const payload = await request.validate(UpdateProductValidator)
    product.merge(payload)
    await product.save()
    return product
  }

  public async delete_rec({ request,params }: HttpContextContract) {\
    await request.validate(DeleteProductValidator)
    const product = await Product.findOrFail(params.id)
    await product.delete()
    return {
      message: 'Product deleted successfully',
    }
  }

  public async create_many({ request }: HttpContextContract) {
    const payload = await request.validate(CreateManyProductsValidator)
    const result = await Product.createMany(payload.products)
    return result
  }

  public async sort_desc() {
    return await Product.query().orderBy('id', 'desc')
  }

}
