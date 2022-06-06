import db from '~/db/prisma'

/**
 * If the user exists.
 */
export const isExistsUser = async (userId: string) => {
  /**
   * Consulting the User ID.
   */
  const userExists = await db.user.findUnique({
    where: {
      id: userId
    }
  })

  return Boolean(userExists)
}
