import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class CreateOrderValidator {
  public schema = schema.create({
    customerId: schema.number([rules.unsigned()]),
    products: schema.array([rules.minLength(1)]).members(
      schema.object().members({
        name: schema.string(),
        quantity: schema.number([rules.unsigned(), rules.range(1, 1000)]),
      })
    ),
  })

  public messages = {
    required: '{{ field }} is required',
  }
}

export class ShowOrderValidator {
  public schema = schema.create({
    id: schema.number([rules.unsigned()]),
  })

  public messages = {
    required: '{{ field }} is required',
  }
}

export class ListOrdersValidator {
  public schema = schema.create({
    limit: schema.number.optional(),
  })

  public messages = {
    required: '{{ field }} is required',
  }
}

export class DeleteOrderValidator {
  constructor(protected ctx: HttpContextContract) {}
  public data = this.ctx.params
  public schema = schema.create({
    id: schema.number(),
  })
}
