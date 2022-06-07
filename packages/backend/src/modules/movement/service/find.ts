import { logger } from '~/common/logger'
import db from '~/db/prisma'

import { findMovementParams } from './types'

/**
 * Displays all user's movements.
 */
export const findMovements = async (filter: findMovementParams) => {
  /**
   * Log.
   */
  logger.info('==== TODAS OS MOVIMENTOS DO USUARIO =====')

  /**
   * Extracts values.
   */
  const { userId, movementId, categoryId, walletId } = filter

  /**
   * Find movements.
   */
  const movements = await db.movement.findMany({
    where: {
      id: { in: movementId },
      wallet: { id: { in: walletId }, user: { id: userId } },
      categoryId: { in: categoryId }
    },
    select: {
      id: true,
      value: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      dateMovement: true
    }
  })

  /**
   * Logs.
   */
  logger.info(`Categorias do usuario: ${JSON.stringify(movements)}`)
  logger.info('==== TODAS OS MOVIMENTOS DO USUARIO =====')

  return movements
}
