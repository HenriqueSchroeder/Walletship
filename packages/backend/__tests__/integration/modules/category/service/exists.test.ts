import { runInTenant } from 'test/helpers/tenant'
import { UserBuilder } from 'test/helpers/builders/user'
import { CategoryBuilder } from 'test/helpers/builders/category'
import { truncateAllTables } from 'test/helpers/db'

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

  test('Confirma que existe a categoria esperada e que seja do usuário', () =>
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
       * Create category.
       */
      const categoryExists = await isExistsCategory(
        createdCategory.id,
        createdUser.id
      )

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

  test('Confirma que não existe a categoria do usuario esperado', () =>
    runInTenant(async () => {
      /**
       * Create id invalid.
       */
      const userId = 'ID invalido'

      /**
       * Create category.
       */
      const createdCategory = await new CategoryBuilder().save()

      /**
       * Create category.
       */
      const categoryExists = await isExistsCategory(createdCategory.id, userId)

      /**
       * Expect data.
       */
      expect(categoryExists).toBe(false)
    }))
})
