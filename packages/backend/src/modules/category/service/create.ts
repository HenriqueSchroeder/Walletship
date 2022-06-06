import db from '~/db/prisma'
import { logger } from '~/common/logger'

import { isExistsUser } from '~/modules/users/service/exists'
import { isExistsWallet } from '~/modules/wallet/service/exists'
import { createCategoryParams } from './types'

/**
 * Creates the categories.
 */
export const createCategory = async (params: createCategoryParams) => {
  /**
   * Log.
   */
  logger.info('==== CRIA CATEGORIA =====')

  /**
   * Extracts values.
   */
  const { userId, walletId, title, content } = params

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
    logger.info('==== CRIA CATEGORIA =====')
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
      logger.info('==== CRIA CATEGORIA =====')
      return { status: 'ERROR', description: 'Wallet does not exist', id: '' }
    }
  }

  /**
   * Creating the category.
   */
  const category = await db.category.create({
    data: {
      title,
      content,
      userId,
      walletId
    }
  })

  /**
   * Logs.
   */
  logger.info('Categoria criada')
  logger.info('==== CRIA CATEGORIA =====')

  return { status: 'OK', description: 'Created category', id: category.id }
}
