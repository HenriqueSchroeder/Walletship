import { gql } from '@apollo/client'

/**
 * Query to create user.
 */
export const loginQuery = gql`
  query Login($params: LoginParameters!) {
    login(params: $params) {
      description
      status
      token
    }
  }
`
