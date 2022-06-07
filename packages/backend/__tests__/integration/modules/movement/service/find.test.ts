import { runInTenant } from 'test/helpers/tenant'
import { UserBuilder } from 'test/helpers/builders/user'
import { WalletBuilder } from 'test/helpers/builders/wallet'
import { truncateAllTables } from 'test/helpers/db'

import { findMovements } from '~/modules/movement/service/find'
import { MovementBuilder } from 'test/helpers/builders/movement'
import { CategoryBuilder } from 'test/helpers/builders/category'

describe('[INTEGRAÇÃO] Mostrando todos os movementos do usuario', () => {
  beforeEach(truncateAllTables)
  afterAll(truncateAllTables)

  test('Mostrando todos os movementos do usuario', () =>
    runInTenant(async () => {
      /**
       * Create user.
       */
      const createdUser = await new UserBuilder().save()

      /**
       * Create movement.
       */
      const createdMovements = await Promise.all([
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save()
      ])

      /**
       * Create the parameters.
       */
      const params = {
        userId: createdUser.id
      }

      /**
       * Find user movements.
       */
      const movements = await findMovements(params)

      /**
       * Expect data.
       */
      expect(movements).toHaveLength(createdMovements.length)
    }))

  test('Mostrando todos os movementos do usuario filtrando a carteira', () =>
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
       * Create categories.
       */
      await Promise.all([
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save()
      ])

      /**
       * Create movement linked to the wallet.
       */
      const createdMovements = await Promise.all([
        new MovementBuilder()
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save(),
        new MovementBuilder()
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save(),
        new MovementBuilder()
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save(),
        new MovementBuilder()
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save(),
        new MovementBuilder()
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save(),
        new MovementBuilder()
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save()
      ])

      /**
       * Create the parameters.
       */
      const params = {
        userId: createdUser.id,
        walletId: [createdWallet.id]
      }

      /**
       * Find user movements.
       */
      const movements = await findMovements(params)

      /**
       * Expect data.
       */
      expect(movements).toHaveLength(createdMovements.length)
    }))

  test('Mostrando todos os movementos do usuario filtrando a categoria', () =>
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
       * Create categories.
       */
      const createdFirstCategory = await new CategoryBuilder()
        .setWallet(createdWallet)
        .setUser(createdUser)
        .save()
      const createdSecondCategory = await new CategoryBuilder()
        .setWallet(createdWallet)
        .setUser(createdUser)
        .save()

      /**
       * Create categories.
       */
      await Promise.all([
        new MovementBuilder()
          .setCategory(createdSecondCategory)
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save(),
        new MovementBuilder()
          .setCategory(createdSecondCategory)
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save(),
        new MovementBuilder()
          .setCategory(createdSecondCategory)
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save(),
        new MovementBuilder()
          .setCategory(createdSecondCategory)
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save(),
        new MovementBuilder()
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save()
      ])

      /**
       * Create movement linked to the category.
       */
      const createdMovements = await Promise.all([
        new MovementBuilder()
          .setCategory(createdFirstCategory)
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save(),
        new MovementBuilder()
          .setCategory(createdFirstCategory)
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save(),
        new MovementBuilder()
          .setCategory(createdFirstCategory)
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save(),
        new MovementBuilder()
          .setCategory(createdFirstCategory)
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save(),
        new MovementBuilder()
          .setCategory(createdFirstCategory)
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save(),
        new MovementBuilder()
          .setCategory(createdFirstCategory)
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save()
      ])

      /**
       * Create the parameters.
       */
      const params = {
        userId: createdUser.id,
        categoryId: [createdFirstCategory.id]
      }

      /**
       * Find user movements.
       */
      const movements = await findMovements(params)

      /**
       * Expect data.
       */
      expect(movements).toHaveLength(createdMovements.length)
    }))

  test('Retorna nada pois o usuario não tem movemento', () =>
    runInTenant(async () => {
      /**
       * Create user.
       */
      const createdUser = await new UserBuilder().save()

      /**
       * Create the parameters.
       */
      const params = {
        userId: createdUser.id
      }

      /**
       * Find movements.
       */
      const movements = await findMovements(params)

      /**
       * Expect data.
       */
      expect(movements).toHaveLength(0)
      expect(movements).toStrictEqual([])
    }))

  test('Retorna nada pois o usuario não tem categoria vinculada a carteira', () =>
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
       * Create movement.
       */
      await new MovementBuilder()
        .setWallet(createdSecondWallet)
        .setUser(createdUser)
        .save()

      /**
       * Create the parameters.
       */
      const params = {
        userId: createdUser.id,
        walletId: [createdFirstWallet.id]
      }

      /**
       * Find movement.
       */
      const movement = await findMovements(params)

      /**
       * Expect data.
       */
      expect(movement).toHaveLength(0)
      expect(movement).toStrictEqual([])
    }))
})
