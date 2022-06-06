import { runInTenant } from 'test/helpers/tenant'
import { truncateAllTables } from 'test/helpers/db'

import { CategoryBuilder } from 'test/helpers/builders/category'
import { isExistsCategory } from '~/modules/category/service/exists'

describe('[INTEGRAÇÃO] Verificando se existe categorias', () => {
  beforeEach(truncateAllTables)
  afterAll(truncateAllTables)

  test('Confirma que existe a categoria esperada', () =>
    runInTenant(async () => {
      /**
       * Create category.
       */
      const createdCategory = await new CategoryBuilder().save()

      /**
       * Create category.
       */
      const categoryExists = await isExistsCategory(createdCategory.id)

      /**
       * Expect data.
       */
      expect(categoryExists).toBe(true)
    }))

  test('Confirma que não existe a categoria esperada', () =>
    runInTenant(async () => {
      /**
       * Create id invalid.
       */
      const id = 'ID invalido'

      /**
       * Create category.
       */
      const categoryExists = await isExistsCategory(id)

      /**
       * Expect data.
       */
      expect(categoryExists).toBe(false)
    }))
})
