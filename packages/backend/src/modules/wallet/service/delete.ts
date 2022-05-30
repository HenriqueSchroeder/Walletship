import db from '~/db/prisma'
import { logger } from '~/common/logger'

import { deleteWalletParams } from './types'

/**
 * Deleting the wallet.
 */
export const deleteWallet = async (params: deleteWalletParams) => {
  /**
   * Log.
   */
  logger.info('==== DELETANDO A CARTEIRA =====')

  /**
   * Extracts values.
   */
  const { id } = params

  /**
   * There is a wallet.
   */
  const walletExists = await db.wallet.findUnique({ where: { id } })

  /**
   * If there is no wallet.
   */
  if (!walletExists) {
    logger.info('Carteira não existe')
    logger.info('==== DELETANDO A CARTEIRA =====')
    return true
  }

  /**
   * Deleting the wallet.
   */
  await db.wallet.delete({
    where: {
      id
    }
  })

  /**
   * Logs.
   */
  logger.info('Carteira deletada ')
  logger.info('==== DELETANDO A CARTEIRA =====')

  return true
}
