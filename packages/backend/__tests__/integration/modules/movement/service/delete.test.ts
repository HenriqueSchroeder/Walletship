import { runInTenant } from 'test/helpers/tenant'
import { UserBuilder } from 'test/helpers/builders/user'
import { MovementBuilder } from 'test/helpers/builders/movement'
import { truncateAllTables } from 'test/helpers/db'

import { deleteMovement } from '~/modules/movement/service/delete'

describe('[INTEGRAÇÃO] Deletando os movementos do usuário', () => {
  beforeEach(truncateAllTables)
  afterAll(truncateAllTables)

  test('Daletando o movemento ', () =>
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
       * Create params.
       */
      const params = {
        id: createdMovement.id,
        userId: createdUser.id
      }

      /**
       * Deleting the movement.
       */
      const movement = await deleteMovement(params)

      /**
       * Expect data.
       */
      expect(movement).toBe(true)
    }))

  test('Tentar deletar um movemento inexistente', () =>
    runInTenant(async () => {
      /**
       * Create user.
       */
      const createdUser = await new UserBuilder().save()

      /**
       * Create params.
       */
      const params = {
        id: 'ID invalido',
        userId: createdUser.id
      }

      /**
       * Deleting the movement.
       */
      const movement = await deleteMovement(params)

      /**
       * Expect data.
       */
      expect(movement).toBe(false)
    }))

  test('Tentar deletar um movemento de outro usuário', () =>
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
        userId: createdFirstUser.id
      }

      /**
       * Deleting the movement.
       */
      const movement = await deleteMovement(params)

      /**
       * Expect data.
       */
      expect(movement).toBe(false)
    }))
})
