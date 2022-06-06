import db from '~/db/prisma'

/**
 * If the category exists.
 */
export const isExistsCategory = async (categoryId: string, userId?: string) => {
  /**
   * Consulting the category ID.
   */
  const categoryExists = await db.category.findFirst({
    where: {
      id: categoryId,
      userId
    }
  })

  return Boolean(categoryExists)
}
