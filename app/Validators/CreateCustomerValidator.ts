import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class CreateCustomerValidator {
  public schema = schema.create({
    name: schema.string(),

    email: schema.string({}, [
      rules.email(),
      rules.unique({
        table: 'customers',
        column: 'email',
      }),
    ]),
    phone: schema.string(),
  })

  public messages = {
    'email.email': 'Invalid email format',
    'email.unique': 'Email already exists',
  }
}

export class DeleteCustomerValidator {
  constructor(protected ctx: HttpContextContract) {}
  public data = this.ctx.params
  public schema = schema.create({
    id: schema.number(),
  })
}

export class GetCustomerValidator {
  constructor(protected ctx: HttpContextContract) {}
  public data = this.ctx.request.qs()
  public schema = schema.create({
    limit: schema.number.optional([rules.range(1, 100)]),
  })
  public messages = {
    'limit.range': 'The requested limit must be a number between 1 and 100.',
    'limit.number': 'The limit parameter must be a valid number.',
  }
}

export class UpdateCustomerValidator {
  public schema = schema.create({
    name: schema.string.optional(),

    email: schema.string.optional(),

    phone: schema.string.optional(),
  })

  public messages = {}
}
