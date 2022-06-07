import db from '~/db/prisma'
import { logger } from '~/common/logger'

import { isExistsMovement } from './exists'
import { updateMovementParams } from './types'

/**
 * Updating the movement.
 */
export const updateMovement = async (params: updateMovementParams) => {
  /**
   * Log.
   */
  logger.info('==== ATUALIZANDO O MOVIMENTO =====')

  /**
   * Extracts values.
   */
  const { id, dateMovement, content, value, userId } = params

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
    logger.info('==== ATUALIZANDO O MOVIMENTO =====')
    return {}
  }

  /**
   * Updating the movement.
   */
  const movement = await db.movement.update({
    where: {
      id
    },
    data: {
      value,
      content,
      dateMovement
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
  logger.info(`Movemento atualizado: ${JSON.stringify(movement)}`)
  logger.info('==== ATUALIZANDO O MOVIMENTO =====')

  return movement
}
