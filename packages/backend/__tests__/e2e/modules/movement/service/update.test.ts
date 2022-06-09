import { loginUser } from 'test/helpers/login-setup'
import { runInTenant } from 'test/helpers/tenant'
import { MovementBuilder } from 'test/helpers/builders/movement'
import { client, closeServer, startServer } from 'test/helpers/server'

import { updateMovementQuery } from './queries'

describe('[E2E] Atualiza dados da movimentação do usuario', () => {
  beforeAll(startServer)
  afterAll(closeServer)

  test('Atualizando os dados da movimentação', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create user.
       */
      const { createdUser, generatedToken } = await loginUser()

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
        value: 140.6,
        content: 'AAAoaijojoaijsodjoajodjosjo',
        dateMovement: new Date().toISOString()
      }

      /**
       * Update movement.
       */
      const { data } = await client(generatedToken).query({
        query: updateMovementQuery,
        variables: { params }
      })

      /**
       * Expect data.
       */
      expect(data.updateMovement).toMatchObject(params)
    }))
})
