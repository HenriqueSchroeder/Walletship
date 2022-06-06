import db from '~/db/prisma'

/**
 * If the wallet exists.
 */
export const isExistsWallet = async (walletId: string, userId?: string) => {
  /**
   * Consulting the wallet ID.
   */
  const walletExists = await db.wallet.findFirst({
    where: {
      id: walletId,
      userId
    }
  })

  return Boolean(walletExists)
}
