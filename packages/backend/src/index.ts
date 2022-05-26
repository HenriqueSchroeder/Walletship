import { PORT } from './config/env'
import { server } from '~/app'

const infoRunServer = () =>
  console.log(
    `🚀 Starting server in http://localhost:${PORT}/graphql`
  )

/**
 * Start the server.
 */
async function runServer() {
  const app = await server()

  /**
   * Running server.
   */
  app.listen(PORT, infoRunServer)
}

runServer()
