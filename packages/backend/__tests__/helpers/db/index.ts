import db from '~/db/prisma'

export const closeDB = async () => {
  await db.$disconnect()
}

/**
 * Truncate all tables.
 */
export const truncateAllTables = async () => {
  await db.moviment.deleteMany()
  await db.category.deleteMany()
  await db.wallet.deleteMany()
  await db.user.deleteMany()
  await closeDB()
}

jest.setTimeout(30000)
