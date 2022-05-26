import { decode } from '~/lib/token'
import { loginQuery } from './queries'

import { runInTenant } from 'test/helpers/tenant'
import { UserBuilder } from 'test/helpers/builders/user'
import { truncateAllTables } from 'test/helpers/db'
import { client, closeServer, startServer } from 'test/helpers/server'
import { user_role } from '@prisma/client'

describe('[E2E] Autenticação', () => {
  beforeEach(truncateAllTables)
  beforeAll(startServer)
  afterAll(closeServer)

  test('Login de usuario', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create password.
       */
      const password = 'B0m$/d1a/;g@l4r1nha.'

      /**
       * Create user.
       */
      const createdUser = await new UserBuilder()
        .setPassword(password)
        .setIsActive(true)
        .setRole(user_role.USER)
        .save()

      /**
       * Create params.
       */
      const params = {
        email: createdUser.email,
        password: password
      }

      /**
       * Login user.
       */
      const { data } = await client().query({
        query: loginQuery,
        variables: { params }
      })

      /**
       * Decode token.
       */
      const token = decode(data.login.token)

      /**
       * Expect data.
       */
      expect(createdUser.isActive).toBe(true)
      expect(token).toMatchObject({
        uuid: createdUser.id,
        role: createdUser.role,
        email: createdUser.email
      })
      expect(data.login).toMatchObject({
        status: 'OK',
        description: 'Access granted'
      })
    }))

  test('Login de administrador', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create password.
       */
      const password = 'B0m$/d1a/;g@l4r1nha.dm'

      /**
       * Create user.
       */
      const createdUser = await new UserBuilder()
        .setPassword(password)
        .setIsActive(true)
        .setRole(user_role.ADMIN)
        .save()

      /**
       * Create params.
       */
      const params = {
        email: createdUser.email,
        password: password
      }

      /**
       * Login admin.
       */
      const { data } = await client().query({
        query: loginQuery,
        variables: { params }
      })

      /**
       * Decode token.
       */
      const token = decode(data.login.token)

      /**
       * Expect data.
       */
      expect(createdUser.isActive).toBe(true)
      expect(token).toMatchObject({
        uuid: createdUser.id,
        role: createdUser.role,
        email: createdUser.email
      })
      expect(data.login).toMatchObject({
        status: 'OK',
        description: 'Access granted'
      })
    }))

  test('Tentativa de login de usuario desativado', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create password.
       */
      const password = '.af;a@jg#ugg/?!idh'

      /**
       * Create user.
       */
      const createdUser = await new UserBuilder()
        .setPassword(password)
        .setIsActive(false)
        .setRole(user_role.USER)
        .save()

      /**
       * Create params.
       */
      const params = {
        email: createdUser.email,
        password: password
      }

      /**
       * Login user.
       */
      const { data } = await client().query({
        query: loginQuery,
        variables: { params }
      })

      /**
       * Expect data.
       */
      expect(createdUser.isActive).toBe(false)
      expect(data.login).toMatchObject({
        status: 'ERROR',
        description: 'Access denied'
      })
    }))

  test('Tentativa de login de administrador desativado', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create password.
       */
      const password = '.af;a@jg#ugg/?!idh'

      /**
       * Create params.
       */
      const createdUser = await new UserBuilder()
        .setPassword(password)
        .setIsActive(false)
        .setRole(user_role.ADMIN)
        .save()

      /**
       * Create params.
       */
      const params = {
        email: createdUser.email,
        password: password
      }

      /**
       * Create user.
       */
      const { data } = await client().query({
        query: loginQuery,
        variables: { params }
      })

      /**
       * Expect data.
       */
      expect(createdUser.isActive).toBe(false)
      expect(data.login).toMatchObject({
        status: 'ERROR',
        description: 'Access denied'
      })
    }))

  test('Tentativa de login de usuario com senha incorreta', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create password.
       */
      const password = 'klfd.>ojfa/15$6lkans'
      const originalPassword = 'B0m$/d1a/;g@l4r1nha.'

      /**
       * Create params.
       */
      const createdUser = await new UserBuilder()
        .setPassword(originalPassword)
        .setIsActive(true)
        .setRole(user_role.USER)
        .save()

      /**
       * Create params.
       */
      const params = {
        email: createdUser.email,
        password: password
      }

      /**
       * Create user.
       */
      const { data } = await client().query({
        query: loginQuery,
        variables: { params }
      })

      /**
       * Expect data.
       */
      expect(createdUser.isActive).toBe(true)
      expect(data.login).toMatchObject({
        token: '',
        status: 'ERROR',
        description: 'Access denied'
      })
    }))

  test('Tentativa de login de administrador com senha incorreta', () =>
    /**
     * Create tenant context.
     */
    runInTenant(async () => {
      /**
       * Create password.
       */
      const password = 'klfd.>ojfa/15$6lkans.dms'
      const originalPassword = 'B0m$/d1a/;g@l4r1nha.asd'

      /**
       * Create params.
       */
      const createdUser = await new UserBuilder()
        .setPassword(originalPassword)
        .setIsActive(true)
        .setRole(user_role.ADMIN)
        .save()

      /**
       * Create params.
       */
      const params = {
        email: createdUser.email,
        password: password
      }

      /**
       * Create user.
       */
      const { data } = await client().query({
        query: loginQuery,
        variables: { params }
      })

      /**
       * Expect data.
       */
      expect(createdUser.isActive).toBe(true)
      expect(data.login).toMatchObject({
        token: '',
        status: 'ERROR',
        description: 'Access denied'
      })
    }))
})
