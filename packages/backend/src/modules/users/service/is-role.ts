import { user_role } from '@prisma/client'
import db from '~/db/prisma'

/**
 * Checks if the user is active.
 */
export const isRoleUser = async (uuid: string, role: user_role[]) => {
  /**
   * Find the user.
   */
  const userExists = await db.user.findFirst({
    where: {
      id: uuid,
      role: {
        in: role
      }
    }
  })

  return Boolean(userExists)
}
