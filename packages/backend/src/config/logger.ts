import { format } from 'winston'

import { objectToJSON } from '~/common/object'
import { isTestEnvironment } from '~/common/conditions'

/**
 * Logging level.
 */
const INFO_LOG = 'info'

export const customFormat = format.printf(info =>
  objectToJSON({ level: info.level, message: info.message })
)

/**
 * Console options to dev logs.
 */
export const consoleOptions = {
  level: INFO_LOG,
  format: customFormat,
  silent: isTestEnvironment
}
