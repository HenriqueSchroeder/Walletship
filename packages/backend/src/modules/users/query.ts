import { user_role } from '@prisma/client'
import { Resolver, Query, Arg, Authorized } from 'type-graphql'

import { allUsers } from './service/all-users'
import { createUser } from './service/create-user'
import { updateUser } from './service/update-user'
import { AllUsersReturn } from '~/schemas/all-users'
import { UpdatedUserData, UpdateUserParameters } from '~/schemas/update-user'
import {
  CreateUserParameters,
  UserStatusAndIdentification
} from '~/schemas/create-user'

@Resolver()
export class CreateUserQueryResolver {
  @Query(() => UserStatusAndIdentification, {
    description: 'Cria usuario'
  })
  async createUser(
    @Arg('params')
    params: CreateUserParameters
  ) {
    return createUser(params)
  }

  @Query(() => UpdatedUserData, {
    description: 'Atualizadados dos usuario'
  })
  @Authorized()
  async updateUser(
    @Arg('params')
    params: UpdateUserParameters
  ) {
    return updateUser(params)
  }

  @Query(() => [AllUsersReturn], {
    description: 'Todos usuario'
  })
  @Authorized(user_role.ADMIN)
  async allUsers() {
    return await allUsers()
  }
}
