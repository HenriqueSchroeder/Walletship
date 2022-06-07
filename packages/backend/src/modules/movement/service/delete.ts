import db from '~/db/prisma'
import { logger } from '~/common/logger'

import { isExistsMovement } from './exists'
import { deleteMovementParams } from './types'

/**
 * Deleting the movement.
 */
export const deleteMovement = async (params: deleteMovementParams) => {
  /**
   * Log.
   */
  logger.info('==== DELETANDO O MOVIMENTO =====')

  /**
   * Extracts values.
   */
  const { id, userId } = params

  /**
   * There is a movement.
   */
  const movementExists = await isExistsMovement(id, userId)

  /**
   * If there is no movement.
   */
  if (!movementExists) {
    /**
     * Logs.
     */
    logger.info('Movemento não existe')
    logger.info('==== DELETANDO O MOVIMENTO =====')
    return true
  }

  /**
   * Deleting the movement.
   */
  await db.movement.delete({
    where: {
      id
    }
  })

  /**
   * Logs.
   */
  logger.info('Movemento deletado')
  logger.info('==== DELETANDO O MOVIMENTO =====')

  return true
}
