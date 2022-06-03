import { isEmail } from 'class-validator'
import { logger } from '~/common/logger'

import db from '~/db/prisma'
import { createUserParams } from './types'

/**
 * Creates the users.
 */
export const createUser = async (params: createUserParams) => {
  /**
   * Log.
   */
  logger.info('==== CRIA USUARIO =====')

  /**
   * Extracts values.
   */
  const { name, email, password } = params

  /**
   * Invalid email.
   */
  if (!isEmail(email)) {
    /**
     * Logs.
     */
    logger.info('Email invalido')
    logger.info('==== CRIA USUARIO =====')
    return { status: 'ERROR', description: 'Email is not valid', id: '' }
  }

  /**
   * Consultation if it is already registered.
   */
  const userExists = await db.user.findUnique({
    where: {
      email
    }
  })

  /**
   * If you are already registered.
   */
  if (userExists) {
    /**
     * Logs.
     */
    logger.info('Usuario já registrado')
    logger.info('==== CRIA USUARIO =====')
    return { status: 'ERROR', description: 'Already registered', id: '' }
  }

  /**
   * Record user.
   */
  const user = await db.user.create({
    data: {
      name,
      email,
      password
    }
  })

  /**
   * Logs.
   */
  logger.info('Usuario criado')
  logger.info('==== CRIA USUARIO =====')

  return { status: 'OK', description: 'Registered user', id: user.id }
}
