import { loginUser } from 'test/helpers/login-setup'
import { runInTenant } from 'test/helpers/tenant'
import { client, closeServer, startServer } from 'test/helpers/server'

import { createWalletQuery } from './queries'

describe('[E2E] Criação das carteiras do usuario', () => {
  beforeAll(startServer)
  afterAll(closeServer)

  test('Criar uma carteira', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * create user.
       */
      const { generatedToken } = await loginUser()

      /**
       * Create params.
       */
      const params = {
        title: 'Wallet 1',
        content: 'Wallet 1 content'
      }

      /**
       * Create wallet.
       */
      const { data } = await client(generatedToken).query({
        query: createWalletQuery,
        variables: { params }
      })

      /**
       * Expect data.
       */
      expect(data.createWallet).toMatchObject({
        status: 'OK',
        description: 'Created wallet'
      })
    }))
})
