import db from '~/db/prisma'
import { logger } from '~/common/logger'

import { createWalletParams } from './types'

/**
 * Creates the wallets.
 */
export const createWallet = async (params: createWalletParams) => {
  /**
   * Log.
   */
  logger.info('==== CRIA CARTEIRA =====')

  /**
   * Extracts values.
   */
  const { userId, title, content } = params

  /**
   * Consulting the User ID.
   */
  const userExists = await db.user.findUnique({
    where: {
      id: userId
    }
  })

  /**
   * If the user does not exist.
   */
  if (!userExists) {
    /**
     * Logs.
     */
    logger.info('Usuario não existe')
    logger.info('==== CRIA CARTEIRA =====')
    return { status: 'ERROR', description: 'User does not exist', id: '' }
  }

  /**
   * Creating the wallet.
   */
  const wallet = await db.wallet.create({
    data: {
      title,
      content,
      userId
    }
  })

  /**
   * Logs.
   */
  logger.info(`Carteira criada: ${JSON.stringify(wallet)}`)
  logger.info('==== CRIA CARTEIRA =====')

  return { status: 'OK', description: 'Created wallet', id: wallet.id }
}
