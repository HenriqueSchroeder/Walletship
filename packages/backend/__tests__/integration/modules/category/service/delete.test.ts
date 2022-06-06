import { runInTenant } from 'test/helpers/tenant'
import { CategoryBuilder } from 'test/helpers/builders/category'
import { truncateAllTables } from 'test/helpers/db'

import { deleteCategory } from '~/modules/category/service/delete'

describe('[INTEGRAÇÃO] Deletando as categorias', () => {
  beforeEach(truncateAllTables)
  afterAll(truncateAllTables)

  test('Daletando a categoria ', () =>
    runInTenant(async () => {
      /**
       * Create category.
       */
      const createdCategory = await new CategoryBuilder().save()

      /**
       * Create params.
       */
      const params = {
        id: createdCategory.id
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
       * Create params.
       */
      const params = {
        id: 'ID invalido'
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
