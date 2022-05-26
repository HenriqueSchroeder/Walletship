import 'cross-fetch/polyfill'
import WebSocket from 'ws'
import { Server } from 'http'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { DefaultOptions, split } from '@apollo/client'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

import { PORT } from '~/config/env'
import { truncateAllTables } from './db'
import { server as httpServer } from '~/app'
import { Client, createClient } from 'graphql-ws'

/**
 * Query definition interface.
 */
interface IQueryDefinintion {
  kind: string
  operation?: string
}

/**
 * Server.
 */
let server: Server

/**
 * Web socket client.
 */
let wsClient: Client

/**
 * Server url.
 */
const uri = `http://localhost:${PORT}/graphql`
const wsUri = `ws://localhost:${PORT}/graphql`

/**
 * Http link.
 */
const httpLink = new HttpLink({ uri })

/**
 * Start the server.
 */
export const startServer = () => {
  return new Promise<void>(async resolve => {
    /**
     * Truncate all tables.
     */
    await truncateAllTables()

    const app = await httpServer()

    /**
     * Running server.
     */
    server = app.listen(PORT)

    resolve()
  })
}

/**
 * Close the server.
 */
export const closeServer = () => {
  /**
   * Closing server.
   */
  return new Promise<void>(async resolve => {
    /**
     * Truncate all tables.
     */
    await truncateAllTables()

    /**
     * Close web socket connection.
     */
    wsClient.terminate()

    /**
     * Close server.
     */
    server.close()

    resolve()
  })
}

export const client = (alternativeToken?: string) => {
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      token: alternativeToken ?? ''
    }
  }))

  /**
   * Create websocket client with not exists.
   */
  if (!wsClient) {
    /**
     * Create web socket client.
     */
    wsClient = createClient({
      url: wsUri,
      connectionParams: {
        token: alternativeToken ?? ''
      },
      webSocketImpl: WebSocket,
      on: {
        closed: e => console.log('closed', e),
        connected: e => console.log('connected', e),
        error: e => console.log('error', e),
        message: e => console.log('message', e),
        opened: e => console.log('opened', e),
        ping: e => console.log('ping', e),
        pong: e => console.log('pong', e)
      }
    })
  }

  /**
   * Web socket link.
   */
  const wsLink = new GraphQLWsLink(wsClient)

  const link = split(
    ({ query }) => {
      const { kind, operation }: IQueryDefinintion = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    authLink.concat(httpLink)
  )

  const defaultOptions: DefaultOptions = { query: { fetchPolicy: 'no-cache' } }

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    defaultOptions
  })
}
