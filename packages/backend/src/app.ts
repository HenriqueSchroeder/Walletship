import 'reflect-metadata'
import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
import compression from 'compression'
import { buildSchema } from 'type-graphql'
import { createServer } from 'http'
import { ApolloServer } from 'apollo-server-express'

import { authChecker } from './middlewares/authorization'

/**
 * Create the server.
 */
export const server = async () => {
  /**
   * Resolvers and schemas.
   */
  const schemasPath = path.resolve(__dirname, 'schemas', '**', '*.{ts,js}')
  const resolversPath = path.resolve(__dirname, 'modules', '**', '*.{ts,js}')

  /**
   * Define schema.
   */
  const schema = await buildSchema({
    resolvers: [schemasPath, resolversPath],
    authChecker,
    dateScalarMode: 'isoDate'
  })

  /**
   * Set apollo server.
   */
  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    context: ({ req }) => {
      /**
       * Is a default request.
       */
      return { req, token: req.headers.token }
    },
    csrfPrevention: true
  })

  /**
   * Create express server.
   */
  const app = express()

  /**
   * Enable another origin.
   */
  app.use(cors())

  /**
   * Increase response size.
   */
  app.use(express.json({ limit: '50mb' }))

  /**
   * Enable security connection.
   */
  app.use(helmet({ contentSecurityPolicy: false }))

  /**
   * Health check route.
   */
  app.use('/health-check', (_, res) => res.sendStatus(200))

  /**
   * Enable response compression.
   */
  app.use(compression())

  /**
   * Apply express.
   */
  await apolloServer.start()
  apolloServer.applyMiddleware({ app })

  /**
   * Enable subscriptions.
   */
  const httpServer = createServer(app)

  /**
   * Use bull board with authentication.
   */

  return httpServer
}
