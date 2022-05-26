import db from '~/db/prisma'

/**
 * Find all users.
 */
export const allUsers = async () => {
  return await db.user.findMany({
    select: {
      id: true,
      role: true,
      name: true,
      email: true,
      isActive: true
    }
  })
}
