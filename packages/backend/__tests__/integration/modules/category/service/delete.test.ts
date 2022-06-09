import { runInTenant } from 'test/helpers/tenant'
import { UserBuilder } from 'test/helpers/builders/user'
import { CategoryBuilder } from 'test/helpers/builders/category'
import { truncateAllTables } from 'test/helpers/db'

import { deleteCategory } from '~/modules/category/service/delete'

describe('[INTEGRAÇÃO] Deletando as categorias', () => {
  beforeEach(truncateAllTables)
  afterAll(truncateAllTables)

  test('Daletando a categoria ', () =>
    runInTenant(async () => {
      /**
       * Create user.
       */
      const createdUser = await new UserBuilder().save()

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
        userId: createdUser.id
      }

      /**
       * Deleting the category.
       */
      const category = await deleteCategory(params)

      /**
       * Expect data.
       */
      expect(category).toBe(true)
    }))

  test('Tentar deletar uma categoria inexistente', () =>
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
       * Deleting the category.
       */
      const category = await deleteCategory(params)

      /**
       * Expect data.
       */
      expect(category).toBe(true)
    }))
})
