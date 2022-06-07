import { runInTenant } from 'test/helpers/tenant'
import { UserBuilder } from 'test/helpers/builders/user'
import { MovementBuilder } from 'test/helpers/builders/movement'
import { truncateAllTables } from 'test/helpers/db'

import { isExistsMovement } from '~/modules/movement/service/exists'

describe('[INTEGRAÇÃO] Verificando se existe movemento', () => {
  beforeEach(truncateAllTables)
  afterAll(truncateAllTables)

  test('Confirma que existe o movemento esperado', () =>
    runInTenant(async () => {
      /**
       * Create movement.
       */
      const createdMovement = await new MovementBuilder().save()

      /**
       * Create movement.
       */
      const movementExists = await isExistsMovement(createdMovement.id)

      /**
       * Expect data.
       */
      expect(movementExists).toBe(true)
    }))

  test('Confirma que existe o movemento esperado e que seja do usuário', () =>
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
       * Create movement.
       */
      const movementExists = await isExistsMovement(
        createdMovement.id,
        createdUser.id
      )

      /**
       * Expect data.
       */
      expect(movementExists).toBe(true)
    }))

  test('Confirma que não existe o movemento esperado', () =>
    runInTenant(async () => {
      /**
       * Create id invalid.
       */
      const id = 'ID invalido'

      /**
       * Create movement.
       */
      const movementExists = await isExistsMovement(id)

      /**
       * Expect data.
       */
      expect(movementExists).toBe(false)
    }))

  test('Confirma que não existe o movemento do usuario esperado', () =>
    runInTenant(async () => {
      /**
       * Create id invalid.
       */
      const userId = 'ID invalido'

      /**
       * Create movement.
       */
      const createdMovement = await new MovementBuilder().save()

      /**
       * Create movement.
       */
      const movementExists = await isExistsMovement(createdMovement.id, userId)

      /**
       * Expect data.
       */
      expect(movementExists).toBe(false)
    }))
})
