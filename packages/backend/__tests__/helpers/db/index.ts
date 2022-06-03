import db from '~/db/prisma'

export const closeDB = async () => {
  await db.$disconnect()
}

/**
 * Truncate all tables.
 */
export const truncateAllTables = async () => {
  await db.movement.deleteMany()
  await db.categories.deleteMany()
  await db.wallet.deleteMany()
  await db.user.deleteMany()
  await closeDB()
}
