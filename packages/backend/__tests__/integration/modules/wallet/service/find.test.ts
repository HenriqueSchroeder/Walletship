import { runInTenant } from 'test/helpers/tenant'
import { UserBuilder } from 'test/helpers/builders/user'
import { WalletBuilder } from 'test/helpers/builders/wallet'
import { truncateAllTables } from 'test/helpers/db'

import { findWallets } from '~/modules/wallet/service/find'

describe('[INTEGRAÇÃO] Mostrando todas as carteiras do usuario', () => {
  beforeEach(truncateAllTables)
  afterAll(truncateAllTables)

  test('Mostrando todas as carteiras do usuario', () =>
    runInTenant(async () => {
      /**
       * Create user.
       */
      const createdUser = await new UserBuilder().save()

      /**
       * Create wallets.
       */
      const createdWallets = await Promise.all([
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save()
      ])

      /**
       * Create the parameters.
       */
      const params = {
        userId: createdUser.id
      }

      /**
       * Find user wallets.
       */
      const wallets = await findWallets(params)

      /**
       * Expect data.
       */
      expect(wallets).toHaveLength(createdWallets.length)
    }))

  test('Retorna nada pois o usuario não tem carteira', () =>
    runInTenant(async () => {
      /**
       * Create user.
       */
      const createdUser = await new UserBuilder().save()

      /**
       * Create the parameters.
       */
      const params = {
        userId: createdUser.id
      }

      /**
       * Find user wallts.
       */
      const wallets = await findWallets(params)

      /**
       * Expect data.
       */
      expect(wallets).toHaveLength(0)
      expect(wallets).toStrictEqual([])
    }))
})
