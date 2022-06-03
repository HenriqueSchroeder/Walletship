import { config } from 'dotenv'
import { resolve } from 'path'

import { EnvironmentType } from '~/common/enums'

/**
 * Test environment.
 */
const isTestEnvironment = process.env.NODE_ENV === EnvironmentType.TEST
const fileName = isTestEnvironment ? '.env.test' : '.env'

config({ path: resolve(__dirname, '..', '..', fileName) })

export const {
  PORT = 7000,
  DB_PORT = 3306,
  NODE_ENV = EnvironmentType.DEV,

  SALT = 'the_bomb_has_been_planted',

  // Prisma
  DATABASE_URL = ''
} = process.env
