import db from '~/db/prisma'
import { logger } from '~/common/logger'

import { isExistsUser } from '~/modules/users/service/exists'
import { isExistsWallet } from '~/modules/wallet/service/exists'
import { createMovementParams } from './types'
import { isExistsCategory } from '~/modules/category/service/exists'

/**
 * Creates the movements.
 */
export const createMovement = async (params: createMovementParams) => {
  /**
   * Log.
   */
  logger.info('==== CRIA MOVIMENTO =====')

  /**
   * Extracts values.
   */
  const { userId, walletId, categoryId, content, dateMovement, value } = params

  /**
   * Consulting the User ID.
   */
  const userExists = await isExistsUser(userId)

  /**
   * If the user does not exist.
   */
  if (!userExists) {
    /**
     * Logs.
     */
    logger.info('Usuario não existe')
    logger.info('==== CRIA MOVIMENTO =====')
    return { status: 'ERROR', description: 'User does not exist', id: '' }
  }

  /**
   * If a wallet is passed.
   */
  if (walletId) {
    /**
     * Consulting the wallet ID.
     */
    const walletExists = await isExistsWallet(walletId, userId)

    /**
     * If you don't find your wallet.
     */
    if (!walletExists) {
      /**
       * Logs.
       */
      logger.info('Carteira não existe')
      logger.info('==== CRIA MOVIMENTO =====')
      return { status: 'ERROR', description: 'Wallet does not exist', id: '' }
    }
  }

  /**
   * If a category is passed.
   */
  if (categoryId) {
    /**
     * Consulting the category ID.
     */
    const categoryExists = await isExistsCategory(categoryId, userId)

    /**
     * If you don't find your category.
     */
    if (!categoryExists) {
      /**
       * Logs.
       */
      logger.info('Categoria não existe')
      logger.info('==== CRIA MOVIMENTO =====')
      return { status: 'ERROR', description: 'Category does not exist', id: '' }
    }
  }

  /**
   * Find category.
   */
  const category = await db.category.findUnique({
    where: {
      id: categoryId
    },
    include: {
      wallet: true
    }
  })

  /**
   * Checks if the category is from a wallet.
   */
  if (category?.wallet?.id !== walletId && category?.wallet?.id !== undefined) {
    /**
     * Logs.
     */
    logger.info('Categoria não pertence a carteira')
    logger.info('==== CRIA MOVIMENTO =====')
    return {
      status: 'ERROR',
      description: 'Category does not belong to the wallet',
      id: ''
    }
  }

  /**
   * Creating the movement.
   */
  const movement = await db.movement.create({
    data: {
      dateMovement,
      categoryId,
      walletId,
      content,
      value
    }
  })

  /**
   * Logs.
   */
  logger.info(`Movemento criado: ${JSON.stringify(movement)}`)
  logger.info('==== CRIA MOVIMENTO =====')

  return { status: 'OK', description: 'Created movement', id: movement.id }
}
