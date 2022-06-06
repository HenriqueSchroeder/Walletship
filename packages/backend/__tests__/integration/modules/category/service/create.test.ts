import { runInTenant } from 'test/helpers/tenant'
import { UserBuilder } from 'test/helpers/builders/user'
import { truncateAllTables } from 'test/helpers/db'

import { createCategory } from '~/modules/category/service/create'
import { WalletBuilder } from 'test/helpers/builders/wallet'

describe('[INTEGRAÇÃO] Criando as categorias', () => {
  beforeEach(truncateAllTables)
  afterAll(truncateAllTables)

  test('Criando uma categoria', () =>
    runInTenant(async () => {
      /**
       * Create user.
       */
      const createdUser = await new UserBuilder().save()

      /**
       * Create params.
       */
      const params = {
        title: 'Category test',
        userId: createdUser.id,
        content: 'Category test'
      }

      /**
       * Create category.
       */
      const category = await createCategory(params)

      /**
       * Expect data.
       */
      expect(category).toMatchObject({
        id: expect.any(String),
        status: 'OK',
        description: 'Created category'
      })
    }))

  test('Tentar criar uma categoria em um usuario inexistente', () =>
    runInTenant(async () => {
      /**
       * Create params.
       */
      const params = {
        title: 'Category test',
        userId: 'ID invalido',
        content: 'Category test'
      }

      /**
       * Create category.
       */
      const category = await createCategory(params)

      /**
       * Expect data.
       */
      expect(category).toMatchObject({
        id: '',
        status: 'ERROR',
        description: 'User does not exist'
      })
    }))

  test('Criando uma categoria vinculado a uma carteira', () =>
    runInTenant(async () => {
      /**
       * Create user.
       */
      const createdUser = await new UserBuilder().save()

      /**
       * Create wallet.
       */
      const createdWallet = await new WalletBuilder()
        .setUser(createdUser)
        .save()

      /**
       * Create params.
       */
      const params = {
        title: 'Category test',
        userId: createdUser.id,
        content: 'Category test',
        walletId: createdWallet.id
      }

      /**
       * Create category.
       */
      const category = await createCategory(params)

      /**
       * Expect data.
       */
      expect(category).toMatchObject({
        id: expect.any(String),
        status: 'OK',
        description: 'Created category'
      })
    }))

  test('Tentar criar uma categoria em uma carteira inexistente', () =>
    runInTenant(async () => {
      /**
       * Create user.
       */
      const createdUser = await new UserBuilder().save()

      /**
       * Create params.
       */
      const params = {
        title: 'Category test',
        userId: createdUser.id,
        content: 'Category test',
        walletId: 'ID invalido'
      }

      /**
       * Create category.
       */
      const category = await createCategory(params)

      /**
       * Expect data.
       */
      expect(category).toMatchObject({
        id: expect.any(String),
        status: 'ERROR',
        description: 'Wallet does not exist'
      })
    }))

  test('Tentar criar uma categoria em um usuario e uma carteira inexistente', () =>
    runInTenant(async () => {
      /**
       * Create params.
       */
      const params = {
        title: 'Category test',
        userId: 'ID invalido',
        content: 'Category test',
        walletId: 'ID invalido'
      }

      /**
       * Create category.
       */
      const category = await createCategory(params)

      /**
       * Expect data.
       */
      expect(category).toMatchObject({
        id: expect.any(String),
        status: 'ERROR',
        description: 'User does not exist'
      })
    }))
})
