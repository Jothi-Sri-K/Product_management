import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ROLE_PERMISSIONS } from 'Config/permission'

export default class Permission {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>,
    permissionsArray: string[]
  ) {
    const user = (request as any).user

    if (!user) {
      return response.unauthorized({
        message: 'User not authenticated',
      })
    }

    const requestedPermission = permissionsArray.join(':')

    const role = user.role as keyof typeof ROLE_PERMISSIONS

    const permissions = ROLE_PERMISSIONS[role]

    if (!permissions?.includes(requestedPermission)) {
      return response.forbidden({
        message: 'Permission denied',
      })
    }

    await next()
  }
}
