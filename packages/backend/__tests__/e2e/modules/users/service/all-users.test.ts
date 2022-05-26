import { user_role } from '@prisma/client'
import { allUsersQuery } from './queries'

import { loginAdmin } from 'test/helpers/login-setup'
import { runInTenant } from 'test/helpers/tenant'
import { UserBuilder } from 'test/helpers/builders/user'
import { client, closeServer, startServer } from 'test/helpers/server'

describe('[E2E] Mostra rodos os usuarios para o administrador', () => {
  beforeAll(startServer)
  afterAll(closeServer)

  test('Retorna todos os usuarios para o administrador', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create admin.
       */
      const { generatedToken } = await loginAdmin()

      /**
       * Create users.
       */
      await new UserBuilder()
        .setEmail('hjdgasjkdhg@gmail.com')
        .setRole(user_role.USER)
        .setIsActive(true)
        .save()

      await new UserBuilder()
        .setEmail('akshjdlka@gmail.com')
        .setRole(user_role.USER)
        .save()

      await new UserBuilder()
        .setEmail('hjdjdjda@gmail.com')
        .setRole(user_role.ADMIN)
        .setIsActive(true)
        .save()

      /**
       * All users.
       */
      const { data } = await client(generatedToken).query({
        query: allUsersQuery
      })

      /**
       * Expect data.
       */
      expect(data.allUsers).toMatchObject(
        expect.arrayContaining([
          {
            id: expect.any(String),
            name: expect.any(String),
            role: expect.any(String),
            email: expect.any(String),
            isActive: expect.any(Boolean),
            __typename: 'AllUsersReturn'
          }
        ])
      )
    }))
})
