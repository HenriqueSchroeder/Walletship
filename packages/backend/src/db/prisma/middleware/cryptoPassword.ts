import bcrypt from 'bcryptjs'
import { Prisma } from '@prisma/client'

/**
 * Encrypt the password.
 */
export const cryptoPassword = async (
  params: Prisma.MiddlewareParams,
  next: any
) => {
  /**
   * If you are creating or updating user.
   */
  if (
    (params.action === 'create' || params.action === 'update') &&
    params.model == 'user'
  ) {
    const user = params.args.data
    if (user.password) {
      const hash = bcrypt.hashSync(user.password, 5)
      user.password = hash
    }
  }

  return await next(params)
}
