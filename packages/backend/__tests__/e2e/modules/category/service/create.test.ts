import { loginUser } from 'test/helpers/login-setup'
import { runInTenant } from 'test/helpers/tenant'
import { client, closeServer, startServer } from 'test/helpers/server'

import { createCategoryQuery } from './queries'

describe('[E2E] Criação das categorias do usuario', () => {
  beforeAll(startServer)
  afterAll(closeServer)

  test('Criar uma categoria', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * create user.
       */
      const { generatedToken } = await loginUser()

      /**
       * Create params.
       */
      const params = {
        title: 'Category 1',
        content: 'Category 1 content'
      }

      /**
       * Create category.
       */
      const { data } = await client(generatedToken).query({
        query: createCategoryQuery,
        variables: { params }
      })

      /**
       * Expect data.
       */
      expect(data.createCategory).toMatchObject({
        status: 'OK',
        description: 'Created category'
      })
    }))
})
