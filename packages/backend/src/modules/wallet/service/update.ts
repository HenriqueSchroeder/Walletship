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
   * Updating the wallet.
   */
  const wallet = await db.wallet.update({
    where: {
      id
    },
    data: {
      title,
      content
    }
  })

  /**
   * Logs.
   */
  logger.info(`Carteira atualizada: ${wallet}`)
  logger.info('==== ATUALIZANDO A CARTEIRA =====')

  return wallet
}
