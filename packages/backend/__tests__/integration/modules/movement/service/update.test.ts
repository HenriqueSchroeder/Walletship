import { runInTenant } from 'test/helpers/tenant'
import { UserBuilder } from 'test/helpers/builders/user'
import { MovementBuilder } from 'test/helpers/builders/movement'
import { truncateAllTables } from 'test/helpers/db'

import { updateMovement } from '~/modules/movement/service/update'

describe('[INTEGRAÇÃO] Atualizando os movemento', () => {
  beforeEach(truncateAllTables)
  afterAll(truncateAllTables)

  test('Atualizando os dados de movemento', () =>
    runInTenant(async () => {
      /**
       * Create user.
       */
      const createdUser = await new UserBuilder().save()

      /**
       * Create movement.
       */
      const createdMovement = await new MovementBuilder()
        .setUser(createdUser)
        .save()

      /**
       * Create id's.
       */
      const ids = { userId: createdUser.id, id: createdMovement.id }

      /**
       * Create movement date
       */
      const dateMovement = new Date()

      /**
       * Create params.
       */
      const params = {
        value: 123.45,
        content: 'Movement test aaaaa',
        dateMovement: dateMovement.toISOString()
      }

      /**
       * Update movement.
       */
      const movement = await updateMovement({ ...params, ...ids })

      /**
       * Expect data.
       */
      expect(movement).toMatchObject({ ...params, dateMovement })
    }))

  test('Tentar atualizar os dados de um movemento inexistente', () =>
    runInTenant(async () => {
      /**
       * Create user.
       */
      const createdUser = await new UserBuilder().save()

      /**
       * Create params.
       */
      const params = {
        id: 'ID inexistente',
        value: 123.45,
        userId: createdUser.id,
        content: 'Movement test aaaaa',
        dateMovement: new Date().toISOString()
      }

      /**
       * Update wallet.
       */
      const category = await updateMovement(params)

      /**
       * Expect data.
       */
      expect(category).toStrictEqual({})
    }))

  test('Tentar atualizar os dados de movemento de outro usuário', () =>
    runInTenant(async () => {
      /**
       * Create user.
       */
      const createdFirstUser = await new UserBuilder().save()
      const createdSecondUser = await new UserBuilder().save()

      /**
       * Create movement.
       */
      const createdMovement = await new MovementBuilder()
        .setUser(createdSecondUser)
        .save()

      /**
       * Create params.
       */
      const params = {
        id: createdMovement.id,
        value: 123.45,
        userId: createdFirstUser.id,
        content: 'Movement test aaaaa',
        dateMovement: new Date().toISOString()
      }

      /**
       * Update wallet.
       */
      const category = await updateMovement(params)

      /**
       * Expect data.
       */
      expect(category).toStrictEqual({})
    }))
})
