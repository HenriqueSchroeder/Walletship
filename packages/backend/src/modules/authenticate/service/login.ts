import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import db from '~/db/prisma'
import { SALT } from '~/config/env'
import { logger } from '~/common/logger'

import { objectToJSON } from '~/common/object'
import { authenticateType } from './types'

/**
 * Authentify the application.
 */
export const authenticate = async (params: authenticateType) => {
  /**
   * Log.
   */
  logger.info('===== Autenticação =====')

  /**
   * Extring values.
   */
  const { email, password } = params

  /**
   * Looking for active user.
   */
  const user = await db.user.findFirst({
    where: {
      email: email,
      isActive: true
    }
  })

  /**
   * Not found.
   */
  if (!user) {
    /**
     * Log.
     */
    logger.info('===== Autenticação =====')
    return {}
  }

  /**
   * Check the password is correct.
   */
  const isValidPassword = await bcrypt.compare(password, user.password)

  /**
   * Incorrect password.
   */
  if (!isValidPassword) {
    /**
     * Log.
     */
    logger.info('===== Autenticação =====')
    return {}
  }

  /**
   * Create data.
   */
  const data = { uuid: user.id, role: user.role, email: user.email }

  /**
   * Log.
   */
  logger.info(`Dados do token: ${objectToJSON(data)}`)

  /**
   * Create token.
   */
  const token = jwt.sign({ data }, SALT, { expiresIn: '1d' })

  /**
   * Log.
   */
  logger.info('===== Autenticação =====')
  return { token }
}
