import { createLogger, transports, format } from 'winston'

import { customFormat, consoleOptions } from '~/config/logger'

/**
 * Create logger.
 */
export const logger = createLogger({
  format: format.combine(customFormat, format.json()),
  transports: [new transports.Console(consoleOptions)]
})
