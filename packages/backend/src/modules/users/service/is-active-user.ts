import db from '~/db/prisma'

/**
 * Checks if the user is active.
 */
export const isActiveUser = async (uuid: string) => {
  /**
   * Find the user.
   */
  const userExists = await db.user.findFirst({
    where: {
      id: uuid,
      isActive: true
    }
  })

  return Boolean(userExists)
}
