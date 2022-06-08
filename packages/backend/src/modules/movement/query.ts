import { Resolver, Query, Arg, Authorized, Ctx } from 'type-graphql'

import { APIContext } from '~/@types/api-context'

import { findMovements } from './service/find'
import { createMovement } from './service/create'
import { deleteMovement } from './service/delete'
import { updateMovement } from './service/update'

import {
  FindMovementsData,
  FindMovementParameters
} from '~/schemas/movement-find'
import {
  UpdatedMovementData,
  UpdateMovementParameters
} from '~/schemas/movement-update'
import {
  DeletedMovementData,
  DeleteMovementParameters
} from '~/schemas/movement-delete'
import {
  CreateMovementParameters,
  MovementStatusAndIdentification
} from '~/schemas/movement-create'

@Resolver()
export class MovementQueryResolver {
  @Query(() => MovementStatusAndIdentification, {
    description: 'Cria movimentação'
  })
  @Authorized()
  async createMovement(
    @Ctx() context: APIContext,
    @Arg('params')
    params: CreateMovementParameters
  ) {
    /**
     * Get user id.
     */
    const userId = context.uuid

    return await createMovement({ userId, ...params })
  }

  @Query(() => UpdatedMovementData, {
    description: 'Atualizadados da movimentação'
  })
  @Authorized()
  async updateMovement(
    @Ctx() context: APIContext,
    @Arg('params') params: UpdateMovementParameters
  ) {
    /**
     * Get user id.
     */
    const userId = context.uuid

    return await updateMovement({ ...params, userId })
  }

  @Query(() => DeletedMovementData, {
    description: 'Deletar a movimentação'
  })
  @Authorized()
  async deleteMovement(
    @Ctx() context: APIContext,
    @Arg('params') params: DeleteMovementParameters
  ) {
    /**
     * Get user id.
     */
    const userId = context.uuid

    return { deleted: await deleteMovement({ ...params, userId }) }
  }

  @Query(() => [FindMovementsData], {
    description: 'Todas as movimentações do usuario'
  })
  @Authorized()
  async findMovementUser(
    @Ctx() context: APIContext,
    @Arg('filter', { nullable: true }) filter: FindMovementParameters
  ) {
    /**
     * Get user id.
     */
    const userId = context.uuid

    return await findMovements({ userId, ...filter })
  }
}
