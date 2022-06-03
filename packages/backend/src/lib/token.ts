import { verify } from 'jsonwebtoken'
import { user_role } from '@prisma/client'

import { SALT } from '~/config/env'

export interface Token {
  email: string
  uuid: string
  role: user_role
}
/**
 * Return of JWT decode.
 */
interface JWTToken {
  data: Token
  iat: number
  exp: number
}

/**
 * Decode token using a salt.
 */
export const decode = (token: string): Token => {
  try {
    /**
     * Decode token.
     */
    const decodedToken = verify(token, SALT) as JWTToken

    /**
     * Return token data.
     */
    return decodedToken.data as Token
  } catch {
    throw new Error('Token inválido')
  }
}
