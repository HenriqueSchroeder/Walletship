import { loginUser } from 'test/helpers/login-setup'
import { runInTenant } from 'test/helpers/tenant'
import { CategoryBuilder } from 'test/helpers/builders/category'
import { client, closeServer, startServer } from 'test/helpers/server'

import { updateCategoryQuery } from './queries'

describe('[E2E] Atualiza dados da carterira do usuario', () => {
  beforeAll(startServer)
  afterAll(closeServer)

  test('Atualizando os dados da carteira', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create user.
       */
      const { createdUser, generatedToken } = await loginUser()

      /**
       * Create category.
       */
      const createdCategory = await new CategoryBuilder()
        .setUser(createdUser)
        .save()

      /**
       * Create params.
       */
      const params = {
        id: createdCategory.id,
        title: 'Bom dua',
        content: 'AAAoaijojoaijsodjoajodjosjo'
      }

      /**
       * Update category.
       */
      const { data } = await client(generatedToken).query({
        query: updateCategoryQuery,
        variables: { params }
      })

      /**
       * Expect data.
       */
      expect(data.updateCategory).toMatchObject({
        id: params.id,
        title: params.title,
        content: params.content
      })
    }))
})
