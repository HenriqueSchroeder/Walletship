import { runInTenant } from 'test/helpers/tenant'
import { CategoryBuilder } from 'test/helpers/builders/category'
import { truncateAllTables } from 'test/helpers/db'

import { updateCategory } from '~/modules/category/service/update'

describe('[INTEGRAÇÃO] Atualizando as categorias', () => {
  beforeEach(truncateAllTables)
  afterAll(truncateAllTables)

  test('Atualizando os dados da categoria', () =>
    runInTenant(async () => {
      /**
       * Create category.
       */
      const createdCategory = await new CategoryBuilder().save()

      /**
       * Create params.
       */
      const params = {
        title: 'Category test',
        content: 'Category test',
        id: createdCategory.id
      }

      /**
       * Update category.
       */
      const category = await updateCategory(params)

      /**
       * Expect data.
       */
      expect(category).toMatchObject(params)
    }))

  test('Tentar atualizar os dados de uma categoria inexistente', () =>
    runInTenant(async () => {
      /**
       * Create params.
       */
      const params = {
        title: 'Category test',
        content: 'Category test',
        id: 'ID invalido'
      }

      /**
       * Update wallet.
       */
      const category = await updateCategory(params)

      /**
       * Expect data.
       */
      expect(category).toStrictEqual({})
    }))
})
