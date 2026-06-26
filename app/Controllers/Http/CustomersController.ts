import Customer from 'App/Models/Customer'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {
  CreateCustomerValidator,
  UpdateCustomerValidator,
  GetCustomerValidator,
  DeleteCustomerValidator,
} from 'App/Validators/CreateCustomerValidator'

export default class CustomersController {
  public async index({ request }: HttpContextContract) {
    const { limit } = await request.validate(GetCustomerValidator)
    if (limit) {
      return await Customer.query().limit(limit)
    }
    return await Customer.all()
  }

  public async show({ params }: HttpContextContract) {
    return await Customer.findOrFail(params.id)
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(CreateCustomerValidator)
    return await Customer.create(payload)
  }

  public async update({ params, request }: HttpContextContract) {
    const customer = await Customer.findOrFail(params.id)
    const payload = await request.validate(UpdateCustomerValidator)
    customer.merge(payload)
    await customer.save()
    return customer
  }

  public async destroy({ request, params }: HttpContextContract) {
    const payload = await request.validate(DeleteCustomerValidator)
    const customer = await Customer.findOrFail(payload.id)
    await customer.delete()
    return {
      message: 'Customer deleted successfully',
    }
  }
}
