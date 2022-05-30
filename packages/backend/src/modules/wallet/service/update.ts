import db from '~/db/prisma'
import { logger } from '~/common/logger'

import { updateWalletParams } from './types'

/**
 * Updating the wallet.
 */
export const updateWallet = async (params: updateWalletParams) => {
  /**
   * Log.
   */
  logger.info('==== ATUALIZANDO A CARTEIRA =====')

  /**
   * Extracts values.
   */
  const { id, title, content } = params

  /**
   * There is a wallet.
   */
  const walletExists = await db.wallet.findUnique({ where: { id } })

  /**
   * If there is no wallet.
   */
  if (!walletExists) {
    /**
     * Logs.
     */
    logger.info('Carteira não existe')
    logger.info('==== ATUALIZANDO A CARTEIRA =====')
    return {}
  }

  /**
   * Updating the wallet.
   */
  const wallet = await db.wallet.update({
    where: {
      id
    },
    data: {
      title,
      content
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true
    }
  })

  /**
   * Logs.
   */
  logger.info(`Carteira atualizada: ${wallet}`)
  logger.info('==== ATUALIZANDO A CARTEIRA =====')

  return wallet
}
