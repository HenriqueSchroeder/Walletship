import { authenticate } from '~/modules/authenticate/service/login'

import { UserBuilder } from 'test/helpers/builders/user'
import { truncateAllTables } from 'test/helpers/db'

describe('[INTEGRAÇÃO] Login dos usuarios', () => {
  beforeEach(truncateAllTables)
  afterAll(truncateAllTables)

  test('Fazendo login de um usuario ativo', async () => {
    /**
     * Create password.
     */
    const password = 'MinhaSenha123456'

    /**
     * Create user.
     */
    const createUser = await new UserBuilder()
      .setPassword(password)
      .setIsActive(true)
      .save()

    /**
     * Create params.
     */
    const params = {
      email: createUser.email,
      password
    }

    /**
     * Create user.
     */
    const { token } = await authenticate(params)

    /**
     * Expect data.
     */
    expect(token).not.toBeUndefined()
  })

  test('Tentando fazer login de um usuario que não esta ativo', async () => {
    /**
     * Create password.
     */
    const password = 'MinhaSenha_123456'

    /**
     * Create user.
     */
    const createUser = await new UserBuilder().setPassword(password).save()

    /**
     * Create params.
     */
    const params = {
      email: createUser.email,
      password
    }

    /**
     * Create user.
     */
    const { token } = await authenticate(params)

    /**
     * Expect data.
     */
    expect(token).toBeUndefined()
  })

  test('Tentando fazer login com uma senha errada', async () => {
    /**
     * Create password.
     */
    const password = 'Minha_Senha_123456'

    /**
     * Create user.
     */
    const createUser = await new UserBuilder().setIsActive(true).save()

    /**
     * Create params.
     */
    const params = {
      email: createUser.email,
      password
    }

    /**
     * Create user.
     */
    const { token } = await authenticate(params)

    /**
     * Expect data.
     */
    expect(createUser.isActive).toEqual(true)
    expect(token).toBeUndefined()
  })
})
