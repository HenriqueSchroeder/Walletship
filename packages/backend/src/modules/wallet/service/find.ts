import { logger } from '~/common/logger'
import db from '~/db/prisma'
import { findWalletParams } from './types'

/**
 * Displays all user's wallets.
 */
export const findWallets = async (params: findWalletParams) => {
  /**
   * Log.
   */
  logger.info('==== TODAS AS CARTEIRAS DO USUARIO =====')

  /**
   * Extracts values.
   */
  const { userId } = params

  /**
   * Find wallts.
   */
  const wallets = await db.wallet.findMany({
    where: { userId },
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
  logger.info(`Carteiras do usuario: ${JSON.stringify(wallets)}`)
  logger.info('==== TODAS AS CARTEIRAS DO USUARIO =====')

  return wallets
}
