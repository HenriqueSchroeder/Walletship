import db from '~/db/prisma'
import { logger } from '~/common/logger'
import { updateUserParams } from './types'

/**
 * Update the users.
 */
export const updateUser = async (params: updateUserParams) => {
  /**
   * Log.
   */
  logger.info('===== ATUALIZANDO DADOS DO USUARIO =====')

  /**
   * Extracts values.
   */
  const { id, name, email, isActive, password, role } = params

  /**
   * Updating the user data.
   */
  const newUser = await db.user.update({
    where: {
      id
    },
    data: {
      name,
      email,
      password,
      isActive,
      role
    },
    select: {
      id: true,
      role: true,
      name: true,
      email: true,
      isActive: true
    }
  })

  /**
   * Logs.
   */
  logger.info(`Usuario atualizado: ${newUser}`)
  logger.info('===== ATUALIZANDO DADOS DO USUARIO =====')

  return newUser
}
