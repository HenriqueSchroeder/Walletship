import { runInTenant } from 'test/helpers/tenant'
import { UserBuilder } from 'test/helpers/builders/user'
import { WalletBuilder } from 'test/helpers/builders/wallet'
import { CategoryBuilder } from 'test/helpers/builders/category'
import { truncateAllTables } from 'test/helpers/db'

import { findCategories } from '~/modules/category/service/find'

describe('[INTEGRAÇÃO] Mostrando todas as categorias do usuario', () => {
  beforeEach(truncateAllTables)
  afterAll(truncateAllTables)

  test('Mostrando todas as categorias do usuario', () =>
    runInTenant(async () => {
      /**
       * Create user.
       */
      const createdUser = await new UserBuilder().save()

      /**
       * Create categories.
       */
      const createdCategories = await Promise.all([
        new CategoryBuilder().setUser(createdUser).save(),
        new CategoryBuilder().setUser(createdUser).save(),
        new CategoryBuilder().setUser(createdUser).save(),
        new CategoryBuilder().setUser(createdUser).save(),
        new CategoryBuilder().setUser(createdUser).save(),
        new CategoryBuilder().setUser(createdUser).save(),
        new CategoryBuilder().setUser(createdUser).save(),
        new CategoryBuilder().setUser(createdUser).save(),
        new CategoryBuilder().setUser(createdUser).save(),
        new CategoryBuilder().setUser(createdUser).save(),
        new CategoryBuilder().setUser(createdUser).save(),
        new CategoryBuilder().setUser(createdUser).save(),
        new CategoryBuilder().setUser(createdUser).save(),
        new CategoryBuilder().setUser(createdUser).save()
      ])

      /**
       * Create the parameters.
       */
      const params = {
        userId: createdUser.id
      }

      /**
       * Find user categories.
       */
      const categories = await findCategories(params)

      /**
       * Expect data.
       */
      expect(categories).toHaveLength(createdCategories.length)
    }))

  test('Mostrando todas as categorias do usuario filtrando a carteira', () =>
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
        new CategoryBuilder().setUser(createdUser).save(),
        new CategoryBuilder().setUser(createdUser).save(),
        new CategoryBuilder().setUser(createdUser).save(),
        new CategoryBuilder().setUser(createdUser).save(),
        new CategoryBuilder().setUser(createdUser).save(),
        new CategoryBuilder().setUser(createdUser).save(),
        new CategoryBuilder().setUser(createdUser).save(),
        new CategoryBuilder().setUser(createdUser).save(),
        new CategoryBuilder().setUser(createdUser).save()
      ])

      /**
       * Create category linked to the wallet.
       */
      const createdCategoties = await Promise.all([
        new CategoryBuilder()
          .setUser(createdUser)
          .setWallet(createdWallet)
          .save(),
        new CategoryBuilder()
          .setUser(createdUser)
          .setWallet(createdWallet)
          .save(),
        new CategoryBuilder()
          .setUser(createdUser)
          .setWallet(createdWallet)
          .save(),
        new CategoryBuilder()
          .setUser(createdUser)
          .setWallet(createdWallet)
          .save(),
        new CategoryBuilder()
          .setUser(createdUser)
          .setWallet(createdWallet)
          .save(),
        new CategoryBuilder()
          .setUser(createdUser)
          .setWallet(createdWallet)
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
       * Find user categoties.
       */
      const categoties = await findCategories(params)

      /**
       * Expect data.
       */
      expect(categoties).toHaveLength(createdCategoties.length)
    }))

  test('Retorna nada pois o usuario não tem categoria', () =>
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
       * Find categories.
       */
      const categories = await findCategories(params)

      /**
       * Expect data.
       */
      expect(categories).toHaveLength(0)
      expect(categories).toStrictEqual([])
    }))

  test('Retorna nada pois o usuario não tem categoria vinculada a carteira', () =>
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
       * Create the parameters.
       */
      const params = {
        userId: createdUser.id,
        walletId: [createdWallet.id]
      }

      /**
       * Find categories.
       */
      const categories = await findCategories(params)

      /**
       * Expect data.
       */
      expect(categories).toHaveLength(0)
      expect(categories).toStrictEqual([])
    }))
})
