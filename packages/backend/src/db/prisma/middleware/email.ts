import { Prisma } from '@prisma/client'
import { isEmail } from 'class-validator'

/**
 * Encrypt the password.
 */
export const emailVerification = async (
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
    if (user.email && !isEmail(user.email)) {
      throw new Error('Email is not valid')
    }
  }

  return await next(params)
}
