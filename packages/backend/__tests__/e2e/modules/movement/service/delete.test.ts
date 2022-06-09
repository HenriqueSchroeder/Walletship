import { loginUser } from 'test/helpers/login-setup'
import { runInTenant } from 'test/helpers/tenant'
import { MovementBuilder } from 'test/helpers/builders/movement'
import { client, closeServer, startServer } from 'test/helpers/server'

import { deleteMovementQuery } from './queries'

describe('[E2E] Deletar a movimentação do usuario', () => {
  beforeAll(startServer)
  afterAll(closeServer)

  test('Deletando a Movimentação do usuario', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create user.
       */
      const { createdUser, generatedToken } = await loginUser()

      /**
       * Create moviment.
       */
      const createdMoviment = await new MovementBuilder()
        .setUser(createdUser)
        .save()

      /**
       * Create params.
       */
      const params = {
        id: createdMoviment.id
      }

      /**
       * delete moviment.
       */
      const { data } = await client(generatedToken).query({
        query: deleteMovementQuery,
        variables: { params }
      })

      /**
       * Expect data.
       */
      expect(data.deleteMovement).toMatchObject({
        deleted: true,
        __typename: 'DeletedMovementData'
      })
    }))
})
