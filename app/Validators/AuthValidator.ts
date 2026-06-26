import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'

export class RegisterValidator {
  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(100)]),
    email: schema.string({ trim: true }, [rules.email()]),
    password: schema.string({}, [rules.minLength(6), rules.maxLength(20)]),
    role: schema.enum.optional(['admin', 'manager', 'customer'] as const),
  })

  public messages: CustomMessages = {
    'name.required': 'Name is required.',
    'name.minLength': 'Name must contain at least 3 characters.',
    'name.maxLength': 'Length of name should nt exceed 100 characters.',
    'email.required': 'Email is required.',
    'email.email': 'Enter a valid email address.',
    'password.required': 'Password is required.',
    'password.minLength': 'Password must contain at least 6 characters.',
    'password.maxLength': 'Password length cannot exceed 20 characters.',
    'role.enum': 'Role must be either admin or manager or customer.',
  }
}

export class LoginValidator {
  public schema = schema.create({
    email: schema.string({ trim: true }, [rules.email()]),
    password: schema.string(),
  })

  public messages: CustomMessages = {
    'email.required': 'Email is required.',
    'email.email': 'enter a valid email address.',
    'password.required': 'Password is required.',
  }
}
