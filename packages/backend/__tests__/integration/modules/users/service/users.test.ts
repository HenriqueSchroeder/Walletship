import { user_role } from '@prisma/client'
import { createUser } from '~/modules/users/service/create-user'
import { updateUser } from '~/modules/users/service/update-user'
import { isRoleUser } from '~/modules/users/service/is-role'
import { isActiveUser } from '~/modules/users/service/is-active-user'

import { UserBuilder } from 'test/helpers/builders/user'
import { truncateAllTables } from 'test/helpers/db'

describe('[INTEGRAÇÃO] Criando e modificando usuarios', () => {
  beforeEach(truncateAllTables)
  afterAll(truncateAllTables)

  test('Criar um usuario', async () => {
    /**
     * Create params.
     */
    const params = {
      email: 'jubliscleudio@gmail.com',
      password: 'SenhaJub123',
      name: 'jubliscleudio'
    }

    /**
     * Create user.
     */
    const user = await createUser(params)

    /**
     * Expect data.
     */
    expect(user).toMatchObject({
      status: 'OK',
      description: 'Registered user'
    })
  })

  test('Tentando criar um usuario já existente', async () => {
    /**
     * Create user.
     */
    const createFirstUser = await new UserBuilder().save()

    /**
     * Create params.
     */
    const params = {
      email: createFirstUser.email,
      password: 'SenhaJub123',
      name: 'jubliscleudio'
    }

    /**
     * Create user.
     */
    const user = await createUser(params)

    /**
     * Expect data.
     */
    expect(createFirstUser.isActive).toEqual(false)
    expect(user).not.toMatchObject({
      id: '',
      status: 'Error',
      description: 'Already registered'
    })
  })

  test('Atualizando os dados do usuario', async () => {
    /**
     * Create user.
     */
    const createUser = await new UserBuilder().save()

    /**
     * Create params.
     */
    const params = {
      id: createUser.id,
      name: 'jubliscleudio',
      role: user_role.ADMIN,
      email: 'jubliscleudio@gmail.com',
      password: 'SenhaJub123',
      isActive: true
    }

    /**
     * Updating the user.
     */
    const user = await updateUser(params)

    /**
     * Expect data.
     */
    expect(user).toMatchObject({
      id: params.id,
      name: params.name,
      role: params.role,
      email: params.email,
      isActive: params.isActive
    })
  })

  test('Definindo e verificando o usuario como ativo', async () => {
    /**
     * Create user.
     */
    const createUser = await new UserBuilder().save()

    /**
     * Create params.
     */
    const params = {
      id: createUser.id,
      isActive: true
    }

    /**
     * Updating the user.
     */
    const user = await updateUser(params)

    /**
     * Checking if the user is active.
     */
    const isActive = await isActiveUser(createUser.id)

    /**
     * Expect data.
     */
    expect(user.isActive).toBe(true)
    expect(isActive).toBe(true)
  })

  test('Verificando se o usuario é administrador', async () => {
    /**
     * Create user.
     */
    const createUser = await new UserBuilder().save()

    /**
     * Create admin.
     */
    const createAdmin = await new UserBuilder()
      .setEmail('admin@fw7.com.br')
      .setRole(user_role.ADMIN)
      .save()

    /**
     * Checking.
     */
    const userIsAdmin = await isRoleUser(createUser.id, [user_role.ADMIN])
    const adminIsAdmin = await isRoleUser(createAdmin.id, [user_role.ADMIN])

    /**
     * Expect data.
     */
    expect(userIsAdmin).toBe(false)
    expect(adminIsAdmin).toBe(true)
  })
})
