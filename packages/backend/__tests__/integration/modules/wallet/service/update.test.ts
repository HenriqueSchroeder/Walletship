import { runInTenant } from 'test/helpers/tenant'
import { WalletBuilder } from 'test/helpers/builders/wallet'
import { truncateAllTables } from 'test/helpers/db'

import { updateWallet } from '~/modules/wallet/service/update'

describe('[INTEGRAÇÃO] Atualizando as carteiras', () => {
  beforeEach(truncateAllTables)
  afterAll(truncateAllTables)

  test('Atualizando os dados da carteira ', () =>
    runInTenant(async () => {
      /**
       * Create wallet.
       */
      const createdWallet = await new WalletBuilder().save()

      /**
       * Create params.
       */
      const params = {
        title: 'Wallet test',
        content: 'Wallet test',
        id: createdWallet.id
      }

      /**
       * Update wallet.
       */
      const wallet = await updateWallet(params)

      /**
       * Expect data.
       */
      expect(wallet).toMatchObject(params)
    }))

  test('Tentar atualizar os dados de uma carteira inexistente', () =>
    runInTenant(async () => {
      /**
       * Create params.
       */
      const params = {
        title: 'Wallet test',
        content: 'Wallet test',
        id: 'ID invalido'
      }

      /**
       * Update wallet.
       */
      const wallet = await updateWallet(params)

      /**
       * Expect data.
       */
      expect(wallet).toStrictEqual({})
    }))
})
