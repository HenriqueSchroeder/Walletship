import db from '~/db/prisma'

/**
 * If the category exists.
 */
export const isExistsCategory = async (categoryId: string) => {
  /**
   * Consulting the category ID.
   */
  const categoryExists = await db.category.findUnique({
    where: {
      id: categoryId
    }
  })

  return Boolean(categoryExists)
}
