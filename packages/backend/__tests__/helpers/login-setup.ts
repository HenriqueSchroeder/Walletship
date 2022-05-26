import { sign } from 'jsonwebtoken'
import { user_role } from '@prisma/client'

import { SALT } from '~/config/env'
import { UserBuilder } from './builders/user'

/**
 * Make a login with user.
 */
export const loginUser = async () => {
  /**
   * Create user.
   */
  const createdUser = await new UserBuilder().setIsActive(true).save()

  /**
   * Generate token.
   */
  const data = {
    uuid: createdUser.id,
    role: createdUser.role,
    email: createdUser.email
  }

  const generatedToken = sign({ data }, SALT, { expiresIn: '1d' })

  return {
    generatedToken,
    createdUser
  }
}

/**
 * Make a login with admin.
 */
export const loginAdmin = async () => {
  /**
   * Create user.
   */
  const createdAdmin = await new UserBuilder()
    .setRole(user_role.ADMIN)
    .setIsActive(true)
    .save()

  /**
   * Generate token.
   */
  const data = {
    uuid: createdAdmin.id,
    role: createdAdmin.role,
    email: createdAdmin.email
  }

  const generatedToken = sign({ data }, SALT, { expiresIn: '1d' })

  return {
    generatedToken,
    createdAdmin
  }
}
