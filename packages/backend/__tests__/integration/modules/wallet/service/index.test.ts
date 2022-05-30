import { runInTenant } from 'test/helpers/tenant'
import { UserBuilder } from 'test/helpers/builders/user'
import { truncateAllTables } from 'test/helpers/db'

import { createWallet } from '~/modules/wallet/service/create'

describe('[INTEGRAÇÃO] Criando as carteiras', () => {
  beforeEach(truncateAllTables)
  afterAll(truncateAllTables)

  test('Criando uma carteira', () =>
    runInTenant(async () => {
      /**
       * Create user.
       */
      const createdUser = await new UserBuilder().save()

      /**
       * Create params.
       */
      const params = {
        title: 'Wallet test',
        content: 'Wallet test',
        userId: createdUser.id
      }

      /**
       * Create wallet.
       */
      const wallet = await createWallet(params)

      /**
       * Expect data.
       */
      expect(wallet.id).not.toBeUndefined()
      expect(wallet.status).toBe('OK')
      expect(wallet.description).toBe('Created wallet')
    }))

  test('Tentar criar uma carteira em um usuario inexistente', () =>
    runInTenant(async () => {
      /**
       * Create params.
       */
      const params = {
        title: 'Wallet test',
        content: 'Wallet test',
        userId: 'ID invalido'
      }

      /**
       * Create wallet.
       */
      const wallet = await createWallet(params)

      /**
       * Expect data.
       */
      expect(wallet).toMatchObject({
        id: '',
        status: 'ERROR',
        description: 'User does not exist'
      })
    }))
})
