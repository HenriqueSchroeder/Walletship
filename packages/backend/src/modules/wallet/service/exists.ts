import db from '~/db/prisma'

/**
 * If the wallet exists.
 */
export const isExistsWallet = async (walletId: string) => {
  /**
   * Consulting the wallet ID.
   */
  const walletExists = await db.wallet.findUnique({
    where: {
      id: walletId
    }
  })

  return Boolean(walletExists)
}
