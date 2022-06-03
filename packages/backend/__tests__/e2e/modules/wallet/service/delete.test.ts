import { loginUser } from 'test/helpers/login-setup'
import { runInTenant } from 'test/helpers/tenant'
import { WalletBuilder } from 'test/helpers/builders/wallet'
import { client, closeServer, startServer } from 'test/helpers/server'

import { deleteWalletQuery } from './queries'

describe('[E2E] Deletar a carterira do usuario', () => {
  beforeAll(startServer)
  afterAll(closeServer)

  test('deletando a carteira do usuario', () =>
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
        id: createdWallet.id
      }

      /**
       * delete wallet.
       */
      const { data } = await client(generatedToken).query({
        query: deleteWalletQuery,
        variables: { params }
      })

      /**
       * Expect data.
       */
      expect(data.deleteWallet).toMatchObject({
        __typename: 'DeletedWalletData',
        deleted: true
      })
    }))
})
