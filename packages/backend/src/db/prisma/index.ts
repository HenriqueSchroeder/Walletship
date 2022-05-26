import { PrismaClient } from '.prisma/client'
import { cryptoPassword } from './middleware/cryptoPassword'
import { emailVerification } from './middleware/email'

/**
 * Client database prisma.
 */
const db = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query'
    },
    {
      emit: 'stdout',
      level: 'error'
    },
    {
      emit: 'event',
      level: 'info'
    },
    {
      emit: 'stdout',
      level: 'warn'
    }
  ]
})

/**
 * Middlewares.
 */
db.$use(emailVerification)
db.$use(cryptoPassword)

export default db
