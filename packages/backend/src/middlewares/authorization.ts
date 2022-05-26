import { user_role } from '@prisma/client'
import { AuthChecker } from 'type-graphql'

import { decode } from '~/lib/token'
import { APIContext } from '~/@types/api-context'

import { isRoleUser } from '~/modules/users/service/is-role'
import { isActiveUser } from '~/modules/users/service/is-active-user'

/**
 * Authorization middleware.
 */
export const authChecker: AuthChecker<APIContext> = async (
  { context },
  roles
) => {
  /**
   * Extract token.
   */
  const { token = '' } = context.req.headers

  try {
    /**
     * Decode token.
     */
    const { uuid } = decode(token)

    /**
     * Checks if it is active.
     */
    const activeUser = await isActiveUser(uuid)

    if (!activeUser) return false

    /**
     * Checking if the role of the user is expected.
     */
    const isValidProfile =
      !roles.length || (await isRoleUser(uuid, roles as user_role[]))

    /**
     * Invalid role.
     */
    if (!isValidProfile) return false

    return true
  } catch {
    return false
  }
}
