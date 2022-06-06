import { loginUser } from 'test/helpers/login-setup'
import { runInTenant } from 'test/helpers/tenant'
import { client, closeServer, startServer } from 'test/helpers/server'

import { findCategoriesUserQuery } from './queries'
import { CategoryBuilder } from 'test/helpers/builders/category'
import { WalletBuilder } from 'test/helpers/builders/wallet'

describe('[E2E] Mostra todas as categorias do usuario', () => {
  beforeAll(startServer)
  afterAll(closeServer)

  test('Retorna todas as categorias do usuario', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create user.
       */
      const { createdUser, generatedToken } = await loginUser()

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
        new CategoryBuilder().setUser(createdUser).save()
      ])

      /**
       * Find categories.
       */
      const { data } = await client(generatedToken).query({
        query: findCategoriesUserQuery
      })

      /**
       * Expect data.
       */
      expect(data.findCategoryUser.length).toBe(createdCategories.length)
      expect(data.findCategoryUser).toMatchObject(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            content: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            __typename: 'FindCategoriesData'
          })
        ])
      )
    }))

  test('Consultar as categorias de uma carteira do usuario', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create user.
       */
      const { createdUser, generatedToken } = await loginUser()

      /**
       * Create wallet.
       */
      const createdWallet = await new WalletBuilder()
        .setUser(createdUser)
        .save()

      /**
       * Creates other categories
       */
      await Promise.all([
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
       * Create categories for wallet.
       */
      const createdCategories = await Promise.all([
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
       * Create params.
       */
      const filter = { walletId: [createdWallet.id] }

      /**
       * Find categories.
       */
      const { data } = await client(generatedToken).query({
        query: findCategoriesUserQuery,
        variables: { filter }
      })

      /**
       * Expect data.
       */
      expect(data.findCategoryUser.length).toBe(createdCategories.length)
      expect(data.findCategoryUser).toMatchObject(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            content: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            __typename: 'FindCategoriesData'
          })
        ])
      )
    }))

  test('Consultar uma categoria do usuario', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create user.
       */
      const { createdUser, generatedToken } = await loginUser()

      /**
       * Create categories.
       */
      const createdCategory = await new CategoryBuilder()
        .setContent('ojnaskjdansndknndkna')
        .setTitle('Category bom dia')
        .setUser(createdUser)
        .save()

      /**
       * Creates other categories for the same user.
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
       * Create params.
       */
      const filter = { categoryId: [createdCategory.id] }

      /**
       * Find categories.
       */
      const { data } = await client(generatedToken).query({
        query: findCategoriesUserQuery,
        variables: { filter }
      })

      /**
       * Expect data.
       */
      expect(data.findCategoryUser.length).toBe(filter.categoryId.length)
      expect(data.findCategoryUser).toMatchObject(
        expect.arrayContaining([
          expect.objectContaining({
            id: createdCategory.id,
            title: createdCategory.title,
            content: createdCategory.content,
            createdAt: createdCategory.createdAt.toISOString(),
            updatedAt: createdCategory.updatedAt.toISOString(),
            __typename: 'FindCategoriesData'
          })
        ])
      )
    }))

  test('Consultar varias categorias do usuario', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create user.
       */
      const { createdUser, generatedToken } = await loginUser()

      /**
       * Create categories.
       */
      const createdFirstCategory = await new CategoryBuilder()
        .setContent('ojnaskjdansndknndkna')
        .setTitle('Category bom dia')
        .setUser(createdUser)
        .save()

      const createdSecondCategory = await new CategoryBuilder()
        .setContent('sdfsfdsdfsfs')
        .setTitle('Category de bom dia')
        .setUser(createdUser)
        .save()

      const createdThirdCategory = await new CategoryBuilder()
        .setContent('sdfsdfsdfsdf')
        .setTitle('Category é dia')
        .setUser(createdUser)
        .save()

      /**
       * Creates other Categorys for the same user.
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
       * Create params.
       */
      const filter = {
        categoryId: [
          createdFirstCategory.id,
          createdSecondCategory.id,
          createdThirdCategory.id
        ]
      }

      /**
       * Find Categorys.
       */
      const { data } = await client(generatedToken).query({
        query: findCategoriesUserQuery,
        variables: { filter }
      })

      /**
       * Expect data.
       */
      expect(data.findCategoryUser.length).toBe(filter.categoryId.length)
      expect(data.findCategoryUser).toMatchObject(
        expect.arrayContaining([
          expect.objectContaining({
            id: createdFirstCategory.id,
            title: createdFirstCategory.title,
            content: createdFirstCategory.content,
            createdAt: createdFirstCategory.createdAt.toISOString(),
            updatedAt: createdFirstCategory.updatedAt.toISOString(),
            __typename: 'FindCategoriesData'
          }),
          expect.objectContaining({
            id: createdSecondCategory.id,
            title: createdSecondCategory.title,
            content: createdSecondCategory.content,
            createdAt: createdSecondCategory.createdAt.toISOString(),
            updatedAt: createdSecondCategory.updatedAt.toISOString(),
            __typename: 'FindCategoriesData'
          }),
          expect.objectContaining({
            id: createdThirdCategory.id,
            title: createdThirdCategory.title,
            content: createdThirdCategory.content,
            createdAt: createdThirdCategory.createdAt.toISOString(),
            updatedAt: createdThirdCategory.updatedAt.toISOString(),
            __typename: 'FindCategoriesData'
          })
        ])
      )
    }))
})
