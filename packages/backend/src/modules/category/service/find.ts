import { logger } from '~/common/logger'
import db from '~/db/prisma'

import { findCategoryParams } from './types'

/**
 * Displays all user's categories.
 */
export const findCategories = async (filter: findCategoryParams) => {
  /**
   * Log.
   */
  logger.info('==== TODAS AS CATEGORIAS DO USUARIO =====')

  /**
   * Extracts values.
   */
  const { userId, categoryId, walletId } = filter

  /**
   * Find categories.
   */
  const categories = await db.category.findMany({
    where: { userId, id: { in: categoryId }, walletId: { in: walletId } },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true
    }
  })

  /**
   * Logs.
   */
  logger.info(`Categorias do usuario: ${JSON.stringify(categories)}`)
  logger.info('==== TODAS AS CATEGORIAS DO USUARIO =====')

  return categories
}
