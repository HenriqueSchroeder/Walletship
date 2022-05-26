import { runInTenant } from 'test/helpers/tenant'
import { client, closeServer, startServer } from 'test/helpers/server'

import { updateUserQuery } from './queries'
import { loginUser } from 'test/helpers/login-setup'

describe('[E2E] Atualiza dados do usuario/administrador', () => {
  beforeAll(startServer)
  afterAll(closeServer)

  test('Atualizando os dados do usuario', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create user.
       */
      const { createdUser, generatedToken } = await loginUser()

      /**
       * Create params.
       */
      const params = {
        id: createdUser.id,
        name: 'jubliscleudio',
        email: 'jubliscleudio@gmail.com',
        password: 'SenhaJub123',
        isActive: true
      }

      /**
       * Create user.
       */
      const { data } = await client(generatedToken).query({
        query: updateUserQuery,
        variables: { params }
      })

      /**
       * Expect data.
       */
      expect(data.updateUser).toMatchObject({
        id: params.id,
        name: params.name,
        role: createdUser.role,
        email: params.email,
        isActive: params.isActive
      })
    }))
})
