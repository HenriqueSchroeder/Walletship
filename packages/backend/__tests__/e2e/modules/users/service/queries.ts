import { gql } from '@apollo/client'

/**
 * Query to create user.
 */
export const createUserQuery = gql`
  query CreateUser($params: CreateUserParameters!) {
    createUser(params: $params) {
      id
      status
      description
    }
  }
`

/**
 * Query to update user.
 */
export const updateUserQuery = gql`
  query UpdateUser($params: UpdateUserParameters!) {
    updateUser(params: $params) {
      id
      role
      name
      email
      isActive
    }
  }
`

/**
 * Query to all users.
 */
export const allUsersQuery = gql`
  query AllUsers {
    allUsers {
      id
      role
      name
      email
      isActive
    }
  }
`
