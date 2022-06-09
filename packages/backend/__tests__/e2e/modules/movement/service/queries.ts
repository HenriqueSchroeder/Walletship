import { gql } from '@apollo/client'

/**
 * Query to create movement.
 */
export const createMovementQuery = gql`
  query CreateMovement($params: CreateMovementParameters!) {
    createMovement(params: $params) {
      id
      status
      description
    }
  }
`

/**
 * Query to update movement.
 */
export const updateMovementQuery = gql`
  query UpdateMovement($params: UpdateMovementParameters!) {
    updateMovement(params: $params) {
      id
      value
      content
      createdAt
      updatedAt
      dateMovement
    }
  }
`

/**
 * Query to delete movement.
 */
export const deleteMovementQuery = gql`
  query DeleteMovement($params: DeleteMovementParameters!) {
    deleteMovement(params: $params) {
      deleted
    }
  }
`

/**
 * Query to find movement.
 */
export const findMovementsUserQuery = gql`
  query FindMovementUser($filter: FindMovementParameters) {
    findMovementUser(filter: $filter) {
      id
      value
      content
      createdAt
      updatedAt
      dateMovement
    }
  }
`
