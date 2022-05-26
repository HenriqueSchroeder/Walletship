import { Resolver, Query, Arg } from 'type-graphql'

import { LoginParameters, StatusAndTokenLogin } from '~/schemas/login'

import { authenticate } from './service/login'

@Resolver()
export class CreateUserQueryResolver {
  @Query(() => StatusAndTokenLogin, {
    description: 'Login'
  })
  async login(
    @Arg('params')
    params: LoginParameters
  ) {
    const auth = await authenticate(params)

    return { status: auth.token ? 'OK': 'ERROR',
     description: auth.token ? 'Access granted': 'Access denied',
      token: auth.token ?? ''}
  }
}
