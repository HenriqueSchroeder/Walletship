import db from '~/db/prisma'

/**
 * If the movement exists.
 */
export const isExistsMovement = async (movementId: string, userId?: string) => {
  /**
   * Consulting the movement ID.
   */
  const movementExists = await db.movement.findFirst({
    where: {
      id: movementId,
      wallet: {
        userId
      }
    }
  })

  return Boolean(movementExists)
}
