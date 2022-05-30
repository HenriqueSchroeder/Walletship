import { runInTenant } from 'test/helpers/tenant'
import { WalletBuilder } from 'test/helpers/builders/wallet'
import { truncateAllTables } from 'test/helpers/db'

import { deleteWallet } from '~/modules/wallet/service/delete'

describe('[INTEGRAÇÃO] Deletando as carteiras', () => {
  beforeEach(truncateAllTables)
  afterAll(truncateAllTables)

  test('Daletando a carteira ', () =>
    runInTenant(async () => {
      /**
       * Create wallet.
       */
      const createdWallet = await new WalletBuilder().save()

      /**
       * Create params.
       */
      const params = {
        id: createdWallet.id
      }

      /**
       * Deleting the wallet.
       */
      const wallet = await deleteWallet(params)

      /**
       * Expect data.
       */
      expect(wallet).toBe(true)
    }))

  test('Tentar deletar uma carteira inexistente', () =>
    runInTenant(async () => {
      /**
       * Create params.
       */
      const params = {
        id: 'ID invalido'
      }

      /**
       * Deleting the wallet.
       */
      const wallet = await deleteWallet(params)

      /**
       * Expect data.
       */
      expect(wallet).toBe(true)
    }))
})
