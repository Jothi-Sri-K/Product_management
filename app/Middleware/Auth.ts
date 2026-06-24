import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'

export default class JwtAuth {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const authHeader = request.header('Authorization')

    if (!authHeader) {
      return response.unauthorized({
        message: 'Token Missing',
      })
    }

    const token = authHeader.replace('Bearer ', '')

    try {
      const secret = Env.get('JWT_SECRET') as string

      const payload: any = jwt.verify(token, secret)

      const user = await User.find(payload.id)

      if (!user) {
        return response.unauthorized({
          message: 'User not found',
        })
      }
      ;(request as any).user = user
      await next()
    } catch {
      return response.unauthorized({
        message: 'Invalid Token',
      })
    }
  }
}
