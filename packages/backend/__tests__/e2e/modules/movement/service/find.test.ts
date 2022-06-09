import { loginUser } from 'test/helpers/login-setup'
import { runInTenant } from 'test/helpers/tenant'
import { client, closeServer, startServer } from 'test/helpers/server'

import { findMovementsUserQuery } from './queries'
import { MovementBuilder } from 'test/helpers/builders/movement'
import { WalletBuilder } from 'test/helpers/builders/wallet'
import { CategoryBuilder } from 'test/helpers/builders/category'

describe('[E2E] Mostra todas as movimentações do usuario', () => {
  beforeAll(startServer)
  afterAll(closeServer)

  test('Retorna todas as movimentações do usuario', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create user.
       */
      const { createdUser, generatedToken } = await loginUser()

      /**
       * Create moviments.
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
        new MovementBuilder().setUser(createdUser).save()
      ])

      /**
       * Find moviments.
       */
      const { data } = await client(generatedToken).query({
        query: findMovementsUserQuery
      })

      /**
       * Expect data.
       */
      expect(data.findMovementUser.length).toBe(createdMovements.length)
      expect(data.findMovementUser).toMatchObject(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            value: expect.any(Number),
            content: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            dateMovement: expect.any(String),
            __typename: 'FindMovementsData'
          })
        ])
      )
    }))

  test('Consultar as movimentações da carteira do usuario', () =>
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
       * Creates other moviments
       */
      await Promise.all([
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
       * Create moviments for wallet.
       */
      const createdMovements = await Promise.all([
        new MovementBuilder()
          .setUser(createdUser)
          .setWallet(createdWallet)
          .save(),
        new MovementBuilder()
          .setUser(createdUser)
          .setWallet(createdWallet)
          .save(),
        new MovementBuilder()
          .setUser(createdUser)
          .setWallet(createdWallet)
          .save(),
        new MovementBuilder()
          .setUser(createdUser)
          .setWallet(createdWallet)
          .save(),
        new MovementBuilder()
          .setUser(createdUser)
          .setWallet(createdWallet)
          .save(),
        new MovementBuilder()
          .setUser(createdUser)
          .setWallet(createdWallet)
          .save(),
        new MovementBuilder()
          .setUser(createdUser)
          .setWallet(createdWallet)
          .save(),
        new MovementBuilder()
          .setUser(createdUser)
          .setWallet(createdWallet)
          .save()
      ])

      /**
       * Create params.
       */
      const filter = { walletId: [createdWallet.id] }

      /**
       * Find moviments.
       */
      const { data } = await client(generatedToken).query({
        query: findMovementsUserQuery,
        variables: { filter }
      })

      /**
       * Expect data.
       */
      expect(data.findMovementUser.length).toBe(createdMovements.length)
      expect(data.findMovementUser).toMatchObject(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            value: expect.any(Number),
            content: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            dateMovement: expect.any(String),
            __typename: 'FindMovementsData'
          })
        ])
      )
    }))

  test('Consultar as movimentações pela categoria do usuario', () =>
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
       * Create category.
       */
      const createdCategory = await new CategoryBuilder()
        .setWallet(createdWallet)
        .save()

      /**
       * Creates other moviments
       */
      await Promise.all([
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
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save(),
        new MovementBuilder().setUser(createdUser).save()
      ])

      /**
       * Create moviments for category.
       */
      const createdMovements = await Promise.all([
        new MovementBuilder()
          .setCategory(createdCategory)
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save(),
        new MovementBuilder()
          .setCategory(createdCategory)
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save(),
        new MovementBuilder()
          .setCategory(createdCategory)
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save(),
        new MovementBuilder()
          .setCategory(createdCategory)
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save(),
        new MovementBuilder()
          .setCategory(createdCategory)
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save(),
        new MovementBuilder()
          .setCategory(createdCategory)
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save(),
        new MovementBuilder()
          .setCategory(createdCategory)
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save(),
        new MovementBuilder()
          .setCategory(createdCategory)
          .setWallet(createdWallet)
          .setUser(createdUser)
          .save()
      ])

      /**
       * Create params.
       */
      const filter = { categoryId: [createdCategory.id] }

      /**
       * Find moviments.
       */
      const { data } = await client(generatedToken).query({
        query: findMovementsUserQuery,
        variables: { filter }
      })

      /**
       * Expect data.
       */
      expect(data.findMovementUser.length).toBe(createdMovements.length)
      expect(data.findMovementUser).toMatchObject(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            value: expect.any(Number),
            content: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            dateMovement: expect.any(String),
            __typename: 'FindMovementsData'
          })
        ])
      )
    }))

  test('Consultar uma movimentação do usuario', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create user.
       */
      const { createdUser, generatedToken } = await loginUser()

      /**
       * Create moviments.
       */
      const createdMovement = await new MovementBuilder()
        .setContent('ojnaskjdansndknndkna')
        .setUser(createdUser)
        .save()

      /**
       * Creates other moviments for the same user.
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
       * Create params.
       */
      const filter = { movementId: [createdMovement.id] }

      /**
       * Find moviments.
       */
      const { data } = await client(generatedToken).query({
        query: findMovementsUserQuery,
        variables: { filter }
      })

      /**
       * Expect data.
       */
      expect(data.findMovementUser.length).toBe(filter.movementId.length)
      expect(data.findMovementUser).toMatchObject(
        expect.arrayContaining([
          expect.objectContaining({
            id: createdMovement.id,
            content: createdMovement.content,
            createdAt: createdMovement.createdAt.toISOString(),
            updatedAt: createdMovement.updatedAt.toISOString(),
            __typename: 'FindMovementsData'
          })
        ])
      )
    }))

  test('Consultar varias movimentações do usuario', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create user.
       */
      const { createdUser, generatedToken } = await loginUser()

      /**
       * Create moviments.
       */
      const createdFirstMovement = await new MovementBuilder()
        .setUser(createdUser)
        .save()

      const createdSecondMovement = await new MovementBuilder()
        .setUser(createdUser)
        .save()

      const createdThirdMovement = await new MovementBuilder()
        .setUser(createdUser)
        .save()

      /**
       * Creates other Movements for the same user.
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
       * Create params.
       */
      const filter = {
        movementId: [
          createdFirstMovement.id,
          createdSecondMovement.id,
          createdThirdMovement.id
        ]
      }

      /**
       * Find Movements.
       */
      const { data } = await client(generatedToken).query({
        query: findMovementsUserQuery,
        variables: { filter }
      })

      /**
       * Expect data.
       */
      expect(data.findMovementUser.length).toBe(filter.movementId.length)
      expect(data.findMovementUser).toMatchObject(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            value: expect.any(Number),
            content: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            dateMovement: expect.any(String),
            __typename: 'FindMovementsData'
          })
        ])
      )
    }))
})
