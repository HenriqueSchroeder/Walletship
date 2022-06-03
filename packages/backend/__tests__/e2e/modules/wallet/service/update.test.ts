import { loginUser } from 'test/helpers/login-setup'
import { runInTenant } from 'test/helpers/tenant'
import { WalletBuilder } from 'test/helpers/builders/wallet'
import { client, closeServer, startServer } from 'test/helpers/server'

import { updateWalletQuery } from './queries'

describe('[E2E] Atualiza dados da carterira do usuario', () => {
  beforeAll(startServer)
  afterAll(closeServer)

  test('Atualizando os dados da carteira', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create user.
       */
      const { generatedToken } = await loginUser()

      /**
       * Create wallet.
       */
      const createdWallet = await new WalletBuilder().save()

      /**
       * Create params.
       */
      const params = {
        id: createdWallet.id,
        title: 'Bom dua',
        content: 'AAAoaijojoaijsodjoajodjosjo'
      }

      /**
       * Update wallet.
       */
      const { data } = await client(generatedToken).query({
        query: updateWalletQuery,
        variables: { params }
      })

      /**
       * Expect data.
       */
      expect(data.updateWallet).toMatchObject({
        id: params.id,
        title: params.title,
        content: params.content
      })
    }))
})
