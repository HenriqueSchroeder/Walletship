import { loginUser } from 'test/helpers/login-setup'
import { runInTenant } from 'test/helpers/tenant'
import { WalletBuilder } from 'test/helpers/builders/wallet'
import { client, closeServer, startServer } from 'test/helpers/server'

import { findWalletsUserQuery } from './queries'

describe('[E2E] Mostra todas as carteriras do usuario', () => {
  beforeAll(startServer)
  afterAll(closeServer)

  test('Retorna todas as carteriras do usuario', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create user.
       */
      const { createdUser, generatedToken } = await loginUser()

      /**
       * Create wallets.
       */
      const createdWallets = await Promise.all([
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save()
      ])

      /**
       * Find wallets.
       */
      const { data } = await client(generatedToken).query({
        query: findWalletsUserQuery
      })

      /**
       * Expect data.
       */
      expect(data.findWalletsUser.length).toBe(createdWallets.length)
      expect(data.findWalletsUser).toMatchObject(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            content: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            __typename: 'findWalletsData'
          })
        ])
      )
    }))

  test('Consultar uma carteira do usuario', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create user.
       */
      const { createdUser, generatedToken } = await loginUser()

      /**
       * Create wallets.
       */
      const createdWallet = await new WalletBuilder()
        .setContent('ojnaskjdansndknndkna')
        .setTitle('Wallet bom dia')
        .setUser(createdUser)
        .save()

      /**
       * Creates other wallets for the same user.
       */
      await Promise.all([
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save()
      ])

      /**
       * Create params.
       */
      const filter = { walletId: [createdWallet.id] }

      /**
       * Find wallets.
       */
      const { data } = await client(generatedToken).query({
        query: findWalletsUserQuery,
        variables: { filter }
      })

      /**
       * Expect data.
       */
      expect(data.findWalletsUser.length).toBe(filter.walletId.length)
      expect(data.findWalletsUser).toMatchObject(
        expect.arrayContaining([
          expect.objectContaining({
            id: createdWallet.id,
            title: createdWallet.title,
            content: createdWallet.content,
            createdAt: createdWallet.createdAt.toISOString(),
            updatedAt: createdWallet.updatedAt.toISOString(),
            __typename: 'findWalletsData'
          })
        ])
      )
    }))

  test('Consultar varias carteiras do usuario', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create user.
       */
      const { createdUser, generatedToken } = await loginUser()

      /**
       * Create wallets.
       */
      const createdFirstWallet = await new WalletBuilder()
        .setContent('ojnaskjdansndknndkna')
        .setTitle('Wallet bom dia')
        .setUser(createdUser)
        .save()

      const createdSecondWallet = await new WalletBuilder()
        .setContent('sdfsfdsdfsfs')
        .setTitle('Wallet de bom dia')
        .setUser(createdUser)
        .save()

      const createdThirdWallet = await new WalletBuilder()
        .setContent('sdfsdfsdfsdf')
        .setTitle('Wallet é dia')
        .setUser(createdUser)
        .save()

      /**
       * Creates other wallets for the same user.
       */
      await Promise.all([
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save(),
        new WalletBuilder().setUser(createdUser).save()
      ])

      /**
       * Create params.
       */
      const filter = {
        walletId: [
          createdFirstWallet.id,
          createdSecondWallet.id,
          createdThirdWallet.id
        ]
      }

      /**
       * Find wallets.
       */
      const { data } = await client(generatedToken).query({
        query: findWalletsUserQuery,
        variables: { filter }
      })

      /**
       * Expect data.
       */
      expect(data.findWalletsUser.length).toBe(filter.walletId.length)
      expect(data.findWalletsUser).toMatchObject(
        expect.arrayContaining([
          expect.objectContaining({
            id: createdFirstWallet.id,
            title: createdFirstWallet.title,
            content: createdFirstWallet.content,
            createdAt: createdFirstWallet.createdAt.toISOString(),
            updatedAt: createdFirstWallet.updatedAt.toISOString(),
            __typename: 'findWalletsData'
          }),
          expect.objectContaining({
            id: createdSecondWallet.id,
            title: createdSecondWallet.title,
            content: createdSecondWallet.content,
            createdAt: createdSecondWallet.createdAt.toISOString(),
            updatedAt: createdSecondWallet.updatedAt.toISOString(),
            __typename: 'findWalletsData'
          }),
          expect.objectContaining({
            id: createdThirdWallet.id,
            title: createdThirdWallet.title,
            content: createdThirdWallet.content,
            createdAt: createdThirdWallet.createdAt.toISOString(),
            updatedAt: createdThirdWallet.updatedAt.toISOString(),
            __typename: 'findWalletsData'
          })
        ])
      )
    }))
})
