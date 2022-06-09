import { loginUser } from 'test/helpers/login-setup'
import { runInTenant } from 'test/helpers/tenant'
import { client, closeServer, startServer } from 'test/helpers/server'

import { createMovementQuery } from './queries'
import { WalletBuilder } from 'test/helpers/builders/wallet'
import { CategoryBuilder } from 'test/helpers/builders/category'

describe('[E2E] Criação das movimentações do usuario', () => {
  beforeAll(startServer)
  afterAll(closeServer)

  test('Criando um movimento', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * create user.
       */
      const { generatedToken, createdUser } = await loginUser()

      /**
       * Create wallet.
       */
      const createdWallet = await new WalletBuilder()
        .setUser(createdUser)
        .save()

      /**
       * Create category.
       */
      const createdCategory = await new CategoryBuilder()
        .setWallet(createdWallet)
        .setUser(createdUser)
        .save()

      /**
       * Create params.
       */
      const params = {
        value: 1245.6,
        content: 'Movement 1 content',
        walletId: createdWallet.id,
        categoryId: createdCategory.id,
        dateMovement: new Date().toISOString()
      }

      /**
       * Create movement.
       */
      const { data } = await client(generatedToken).query({
        query: createMovementQuery,
        variables: { params }
      })

      /**
       * Expect data.
       */
      expect(data.createMovement).toMatchObject({
        status: 'OK',
        description: 'Created movement'
      })
    }))

  test('Tentando criar um movimento passado o Id da categoria que esta vinculado a outra carteira', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * create user.
       */
      const { generatedToken, createdUser } = await loginUser()

      /**
       * Create wallet.
       */
      const createdFirstWallet = await new WalletBuilder()
        .setUser(createdUser)
        .save()
      const createdSecondWallet = await new WalletBuilder()
        .setUser(createdUser)
        .save()

      /**
       * Create category.
       */
      const createdCategory = await new CategoryBuilder()
        .setWallet(createdSecondWallet)
        .setUser(createdUser)
        .save()

      /**
       * Create params.
       */
      const params = {
        value: 1245.6,
        content: 'Movement 1 content',
        walletId: createdFirstWallet.id,
        categoryId: createdCategory.id,
        dateMovement: new Date().toISOString()
      }

      /**
       * Create movement.
       */
      const { data } = await client(generatedToken).query({
        query: createMovementQuery,
        variables: { params }
      })

      /**
       * Expect data.
       */
      expect(data.createMovement).toMatchObject({
        id: '',
        status: 'ERROR',
        description: 'Category does not belong to the wallet'
      })
    }))
})
