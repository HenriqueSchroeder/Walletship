import db from '~/db/prisma'
import { logger } from '~/common/logger'

import { isExistsCategory } from './exists'
import { updateCategoryParams } from './types'

/**
 * Updating the category.
 */
export const updateCategory = async (params: updateCategoryParams) => {
  /**
   * Log.
   */
  logger.info('==== ATUALIZANDO A CATEGORIA =====')

  /**
   * Extracts values.
   */
  const { id, title, content } = params

  /**
   * There is a wallet.
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
    logger.info('==== ATUALIZANDO A CATEGORIA =====')
    return {}
  }

  /**
   * Updating the category.
   */
  const category = await db.category.update({
    where: {
      id
    },
    data: {
      title,
      content
    },
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
  logger.info(`Categoria atualizada: ${category}`)
  logger.info('==== ATUALIZANDO A CATEGORIA =====')

  return category
}
