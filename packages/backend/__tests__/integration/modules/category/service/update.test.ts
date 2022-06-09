import { runInTenant } from 'test/helpers/tenant'
import { UserBuilder } from 'test/helpers/builders/user'
import { CategoryBuilder } from 'test/helpers/builders/category'
import { truncateAllTables } from 'test/helpers/db'

import { updateCategory } from '~/modules/category/service/update'

describe('[INTEGRAÇÃO] Atualizando as categorias', () => {
  beforeEach(truncateAllTables)
  afterAll(truncateAllTables)

  test('Atualizando os dados da categoria', () =>
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
        title: 'Category test',
        content: 'Category test',
        userId: createdUser.id,
        id: createdCategory.id
      }

      /**
       * Update category.
       */
      const category = await updateCategory(params)

      /**
       * Expect data.
       */
      expect(category).toMatchObject({
        id: params.id,
        title: params.title,
        content: params.content
      })
    }))

  test('Tentar atualizar os dados de uma categoria inexistente', () =>
    runInTenant(async () => {
      /**
       * Create user.
       */
      const createdUser = await new UserBuilder().save()

      /**
       * Create params.
       */
      const params = {
        title: 'Category test',
        content: 'Category test',
        userId: createdUser.id,
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
