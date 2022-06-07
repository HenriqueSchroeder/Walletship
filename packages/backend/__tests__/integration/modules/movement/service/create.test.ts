import { runInTenant } from 'test/helpers/tenant'
import { UserBuilder } from 'test/helpers/builders/user'
import { WalletBuilder } from 'test/helpers/builders/wallet'
import { CategoryBuilder } from 'test/helpers/builders/category'
import { truncateAllTables } from 'test/helpers/db'

import { createMovement } from '~/modules/movement/service/create'

describe('[INTEGRAÇÃO] Criando os movementos', () => {
  beforeEach(truncateAllTables)
  afterAll(truncateAllTables)

  test('Criando um movemento', () =>
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
        value: -10.5,
        userId: createdUser.id,
        content: 'Movement test',
        walletId: createdWallet.id,
        categoryId: createdCategory.id,
        dateMovement: new Date().toISOString()
      }

      /**
       * Create movement.
       */
      const movement = await createMovement(params)

      /**
       * Expect data.
       */
      expect(movement).toMatchObject({
        id: expect.any(String),
        status: 'OK',
        description: 'Created movement'
      })
    }))

  test('Tentar criar um movemento em um usuario inexistente', () =>
    runInTenant(async () => {
      /**
       * Create wallet.
       */
      const createdWallet = await new WalletBuilder().save()

      /**
       * Create category.
       */
      const createdCategory = await new CategoryBuilder()
        .setWallet(createdWallet)
        .save()

      /**
       * Create params.
       */
      const params = {
        value: -130.5,
        userId: 'idUserInexistente',
        content: 'Movement test',
        walletId: createdWallet.id,
        categoryId: createdCategory.id,
        dateMovement: new Date().toISOString()
      }

      /**
       * Create movement.
       */
      const movement = await createMovement(params)

      /**
       * Expect data.
       */
      expect(movement).toMatchObject({
        id: '',
        status: 'ERROR',
        description: 'User does not exist'
      })
    }))

  test('Tentar criar um movemento em uma carteira inexistente', () =>
    runInTenant(async () => {
      /**
       * Create user.
       */
      const createdUser = await new UserBuilder().save()

      /**
       * Create category.
       */
      const createdCategory = await new CategoryBuilder()
        .setUser(createdUser)
        .save()

      /**
       * Create params.
       */
      const params = {
        value: -130.5,
        userId: createdUser.id,
        content: 'Movement test',
        walletId: 'idWalletInexistente',
        categoryId: createdCategory.id,
        dateMovement: new Date().toISOString()
      }

      /**
       * Create movement.
       */
      const movement = await createMovement(params)

      /**
       * Expect data.
       */
      expect(movement).toMatchObject({
        id: '',
        status: 'ERROR',
        description: 'Wallet does not exist'
      })
    }))

  test('Tentar criar um movemento em uma categoria inexistente', () =>
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
        value: -130.5,
        userId: createdUser.id,
        content: 'Movement test',
        walletId: createdWallet.id,
        categoryId: 'idCategoryInexistente',
        dateMovement: new Date().toISOString()
      }

      /**
       * Create movement.
       */
      const movement = await createMovement(params)

      /**
       * Expect data.
       */
      expect(movement).toMatchObject({
        id: '',
        status: 'ERROR',
        description: 'Category does not exist'
      })
    }))

  test('Tentar criar um movemento com a categoria vinculada em outra carteira', () =>
    runInTenant(async () => {
      /**
       * Create user.
       */
      const createdUser = await new UserBuilder().save()

      /**
       * Create wallets.
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
        value: 1530.5,
        userId: createdUser.id,
        content: 'Movement test',
        walletId: createdFirstWallet.id,
        categoryId: createdCategory.id,
        dateMovement: new Date().toISOString()
      }

      /**
       * Create movement.
       */
      const movement = await createMovement(params)

      /**
       * Expect data.
       */
      expect(movement).toMatchObject({
        id: '',
        status: 'ERROR',
        description: 'Category does not belong to the wallet'
      })
    }))
})
