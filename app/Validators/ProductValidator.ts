import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class CreateProductValidator {
  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(255), rules.minLength(3)]),
    price: schema.number([rules.unsigned(), rules.range(1, 999999)]),
    quantity: schema.number([rules.unsigned(), rules.range(0, 10000)]),
  })
  public messages: CustomMessages = {
    'name.required': 'product name is required.',
    'name.minLength': 'product name must contain at least 3 characters .',
    'price.required': 'price is required.',
    'price.unsigned': 'price cannot be a (-)ve value.',
    'quantity.required': 'quantity is required.',
  }
}

export class UpdateProductValidator {
  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [rules.maxLength(255), rules.minLength(3)]),
    price: schema.number.optional([rules.unsigned(), rules.range(1, 999999)]),
    quantity: schema.number.optional([rules.unsigned(), rules.range(0, 10000)]),
  })
}

export class GetProductValidator {
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
export class CreateManyProductsValidator {
  public settings = { bail: true }
  public schema = schema.create({
    products: schema.array([rules.minLength(1), rules.maxLength(100)]).members(
      schema.object().members({
        name: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(100)]),
        price: schema.number([rules.unsigned(), rules.range(1, 999999)]),
        quantity: schema.number([rules.unsigned(), rules.range(0, 10000)]),
      })
    ),
  })
  public messages: CustomMessages = {
    'products.required': 'products array is required.',
    'products.*.name.required': 'each product must have name.',
  }
}

export class DeleteProductValidator {
  constructor(protected ctx: HttpContextContract) {}
  public data = this.ctx.params
  public schema = schema.create({
    id: schema.number(),
  })
}
