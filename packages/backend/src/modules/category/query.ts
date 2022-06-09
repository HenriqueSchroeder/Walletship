import { Resolver, Query, Arg, Authorized, Ctx } from 'type-graphql'

import { APIContext } from '~/@types/api-context'

import { findCategories } from './service/find'
import { createCategory } from './service/create'
import { deleteCategory } from './service/delete'
import { updateCategory } from './service/update'

import {
  FindCategoriesData,
  FindCategoryParameters
} from '~/schemas/category-find'

import {
  UpdatedCategoryData,
  UpdateCategoryParameters
} from '~/schemas/category-update'
import {
  DeletedCategoryData,
  DeleteCategoryParameters
} from '~/schemas/category-delete'
import {
  CreateCategoryParameters,
  CategoryStatusAndIdentification
} from '~/schemas/category-create'

@Resolver()
export class CategoryQueryResolver {
  @Query(() => CategoryStatusAndIdentification, {
    description: 'Cria categoria'
  })
  @Authorized()
  async createCategory(
    @Ctx() context: APIContext,
    @Arg('params')
    params: CreateCategoryParameters
  ) {
    /**
     * Get user id.
     */
    const userId = context.uuid

    return await createCategory({ userId, ...params })
  }

  @Query(() => UpdatedCategoryData, {
    description: 'Atualizadados da categoria'
  })
  @Authorized()
  async updateCategory(
    @Ctx() context: APIContext,
    @Arg('params') params: UpdateCategoryParameters
  ) {
    /**
     * Get user id.
     */
    const userId = context.uuid

    return await updateCategory({ userId, ...params })
  }

  @Query(() => DeletedCategoryData, {
    description: 'Deletar a categoria'
  })
  @Authorized()
  async deleteCategory(
    @Ctx() context: APIContext,
    @Arg('params') params: DeleteCategoryParameters
  ) {
    /**
     * Get user id.
     */
    const userId = context.uuid

    return { deleted: await deleteCategory({ userId, ...params }) }
  }

  @Query(() => [FindCategoriesData], {
    description: 'Todas as categorias do usuario'
  })
  @Authorized()
  async findCategoryUser(
    @Ctx() context: APIContext,
    @Arg('filter', { nullable: true }) filter: FindCategoryParameters
  ) {
    /**
     * Get user id.
     */
    const userId = context.uuid

    return await findCategories({ userId, ...filter })
  }
}
