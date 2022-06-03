import { Resolver, Query, Arg, Authorized, Ctx } from 'type-graphql'

import { APIContext } from '~/@types/api-context'

import { findWallets } from './service/find'
import { createWallet } from './service/create'
import { deleteWallet } from './service/delete'
import { updateWallet } from './service/update'

import { FindWalletParameters, findWalletsData } from '~/schemas/wallet-find'
import {
  UpdatedWalletData,
  UpdateWalletParameters
} from '~/schemas/wallet-update'
import {
  DeletedWalletData,
  DeleteWalletParameters
} from '~/schemas/wallet-delete'
import {
  CreateWalletParameters,
  WalletStatusAndIdentification
} from '~/schemas/wallet-create'

@Resolver()
export class WalletQueryResolver {
  @Query(() => WalletStatusAndIdentification, {
    description: 'Cria carteira'
  })
  @Authorized()
  async createWallet(
    @Ctx() context: APIContext,
    @Arg('params')
    params: CreateWalletParameters
  ) {
    /**
     * Get user id.
     */
    const userId = context.uuid

    return await createWallet({ userId, ...params })
  }

  @Query(() => UpdatedWalletData, {
    description: 'Atualizadados da carteira'
  })
  @Authorized()
  async updateWallet(
    @Arg('params')
    params: UpdateWalletParameters
  ) {
    return await updateWallet(params)
  }

  @Query(() => DeletedWalletData, {
    description: 'Deletar a carteira'
  })
  @Authorized()
  async deleteWallet(
    @Arg('params')
    params: DeleteWalletParameters
  ) {
    return { deleted: await deleteWallet(params) }
  }

  @Query(() => [findWalletsData], {
    description: 'Todas as carteiras do usuario'
  })
  @Authorized()
  async findWalletsUser(
    @Ctx() context: APIContext,
    @Arg('filter', { nullable: true }) filter: FindWalletParameters
  ) {
    /**
     * Get user id.
     */
    const userId = context.uuid

    return await findWallets({ userId, ...filter })
  }
}
