import { runInTenant } from 'test/helpers/tenant'
import { WalletBuilder } from 'test/helpers/builders/wallet'
import { truncateAllTables } from 'test/helpers/db'

import { isExistsWallet } from '~/modules/wallet/service/exists'

describe('[INTEGRAÇÃO] Verificando se existe carteira', () => {
  beforeEach(truncateAllTables)
  afterAll(truncateAllTables)

  test('Confirma que existe a carteira esperada', () =>
    runInTenant(async () => {
      /**
       * Create wallet.
       */
      const createdWallet = await new WalletBuilder().save()

      /**
       * Create wallet.
       */
      const walletExists = await isExistsWallet(createdWallet.id)

      /**
       * Expect data.
       */
      expect(walletExists).toBe(true)
    }))

  test('Confirma que não existe a carteira esperada', () =>
    runInTenant(async () => {
      /**
       * Create id invalid.
       */
      const id = 'ID invalido'

      /**
       * Create wallet.
       */
      const walletExists = await isExistsWallet(id)

      /**
       * Expect data.
       */
      expect(walletExists).toBe(false)
    }))
})
