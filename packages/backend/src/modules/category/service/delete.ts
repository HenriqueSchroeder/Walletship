import db from '~/db/prisma'
import { logger } from '~/common/logger'

import { deleteCategoryParams } from './types'
import { isExistsCategory } from './exists'

/**
 * Deleting the category.
 */
export const deleteCategory = async (params: deleteCategoryParams) => {
  /**
   * Log.
   */
  logger.info('==== DELETANDO A CATEGORIA =====')

  /**
   * Extracts values.
   */
  const { id } = params

  /**
   * There is a category.
   */
  const categoryExists = await isExistsCategory(id)

  /**
   * If there is no category.
   */
  if (!categoryExists) {
    /**
     * Logs.
     */
    logger.info('Categoria não existe')
    logger.info('==== DELETANDO A CATEGORIA =====')
    return true
  }

  /**
   * Deleting the category.
   */
  await db.category.delete({
    where: {
      id
    }
  })

  /**
   * Logs.
   */
  logger.info('Categoria deletada ')
  logger.info('==== DELETANDO A CATEGORIA =====')

  return true
}
