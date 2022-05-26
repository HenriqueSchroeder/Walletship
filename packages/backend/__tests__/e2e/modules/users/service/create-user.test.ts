import { runInTenant } from 'test/helpers/tenant'
import { client, closeServer, startServer } from 'test/helpers/server'

import { createUserQuery } from './queries'
import { UserBuilder } from 'test/helpers/builders/user'

describe('[E2E] Criação de usuario/administrador', () => {
  beforeAll(startServer)
  afterAll(closeServer)

  test('Criar um usuario', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create params.
       */
      const params = {
        email: 'jubliscleudio@gmail.com',
        password: 'SenhaJub123',
        name: 'Jubliscleudio Martins'
      }

      /**
       * Create user.
       */
      const { data } = await client().query({
        query: createUserQuery,
        variables: { params }
      })

      /**
       * Expect data.
       */
      expect(data.createUser).toMatchObject({
        status: 'OK',
        description: 'Registered user'
      })
    }))

  test('Tentando criar um usuario com email invalido', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create params.
       */
      const params = {
        email: 'jubliscleudio@gmailcom',
        password: 'SenhaJub123',
        name: 'Jubliscleudio Martins'
      }

      /**
       * Create user.
       */
      const { data } = await client().query({
        query: createUserQuery,
        variables: { params }
      })

      /**
       * Expect data.
       */
      expect(data.createUser).toMatchObject({
        status: 'ERROR',
        description: 'Email is not valid'
      })
    }))

  test('Tentando criar um usuario já existente', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create user.
       */
      const createdUser = await new UserBuilder().save()

      /**
       * Create params.
       */
      const params = {
        email: createdUser.email,
        password: 'SenhaJub123',
        name: 'jubliscleudio'
      }

      /**
       * Create user.
       */
      const { data } = await client().query({
        query: createUserQuery,
        variables: { params }
      })

      /**
       * Expect data.
       */
      expect(createdUser.isActive).toEqual(false)
      expect(data.createUser).not.toMatchObject({
        id: '',
        status: 'Error',
        description: 'Already registered'
      })
    }))
})
