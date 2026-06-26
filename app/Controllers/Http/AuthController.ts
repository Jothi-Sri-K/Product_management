import User from 'App/Models/User'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RegisterValidator, LoginValidator } from 'App/Validators/AuthValidator'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)
    const { name, email, password, role } = payload
    const existingUser = await User.query().where('email', email).first()

    if (existingUser) {
      return response.conflict({
        message: 'User already exists',
      })
    }

    const hashedPassword = await Hash.make(password)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'customer',
    })

    return response.created({
      message: 'User created successfully',
      user,
    })
  }

  public async login({ request, response }: HttpContextContract) {
    const payload = await request.validate(LoginValidator)
    const { email, password } = payload

    const user = await User.query().where('email', email).first()

    if (!user) {
      return response.unauthorized({
        message: 'Invalid Credentials',
      })
    }

    const isPasswordCorrect = await Hash.verify(user.password, password)

    if (!isPasswordCorrect) {
      return response.unauthorized({
        message: 'Invalid Credentials',
      })
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      Env.get('JWT_SECRET'),
      {
        expiresIn: '1h',
      }
    )

    return {
      token,
    }
  }
}
