import { runInTenant } from 'test/helpers/tenant'
import { truncateAllTables } from 'test/helpers/db'

import { UserBuilder } from 'test/helpers/builders/user'
import { isExistsUser } from '~/modules/users/service/exists'

describe('[INTEGRAÇÃO] Verificando se existe o usuario', () => {
  beforeEach(truncateAllTables)
  afterAll(truncateAllTables)

  test('Confirma que existe o usuario esperado', () =>
    runInTenant(async () => {
      /**
       * Create user.
       */
      const createdUser = await new UserBuilder().save()

      /**
       * Create user.
       */
      const userExists = await isExistsUser(createdUser.id)

      /**
       * Expect data.
       */
      expect(userExists).toBe(true)
    }))

  test('Confirma que não existe o usuario esperado', () =>
    runInTenant(async () => {
      /**
       * Create id invalid.
       */
      const id = 'ID invalido'

      /**
       * Create user.
       */
      const userExists = await isExistsUser(id)

      /**
       * Expect data.
       */
      expect(userExists).toBe(false)
    }))
})
