import { loginUser } from 'test/helpers/login-setup'
import { runInTenant } from 'test/helpers/tenant'
import { CategoryBuilder } from 'test/helpers/builders/category'
import { client, closeServer, startServer } from 'test/helpers/server'

import { deleteCategoryQuery } from './queries'

describe('[E2E] Deletar a carterira do usuario', () => {
  beforeAll(startServer)
  afterAll(closeServer)

  test('deletando a carteira do usuario', () =>
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
        id: createdCategory.id
      }

      /**
       * delete category.
       */
      const { data } = await client(generatedToken).query({
        query: deleteCategoryQuery,
        variables: { params }
      })

      /**
       * Expect data.
       */
      expect(data.deleteCategory).toMatchObject({
        __typename: 'DeletedCategoryData',
        deleted: true
      })
    }))
})
