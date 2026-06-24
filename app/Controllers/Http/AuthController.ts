import User from 'App/Models/User'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const { name, email, password, role } = request.all()
    const existingUser = await User.query().where('email', email).first()

    if (existingUser) {
      return response.conflict({
        message: 'User already exists',
      })
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'customer',
    })

    return response.created({
      message: 'User created successfully',
      user,
    })
  }

  public async login({ request, response }: HttpContextContract) {
    const { email, password } = request.all()

    const user = await User.query().where('email', email).first()

    if (!user || user.password !== password) {
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