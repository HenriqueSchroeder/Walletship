import { gql } from '@apollo/client'

/**
 * Query to create wallet.
 */
export const createWalletQuery = gql`
  query CreateWallet($params: CreateWalletParameters!) {
    createWallet(params: $params) {
      id
      status
      description
    }
  }
`

/**
 * Query to update wallet.
 */
export const updateWalletQuery = gql`
  query UpdateWallet($params: UpdateWalletParameters!) {
    updateWallet(params: $params) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`

/**
 * Query to delete wallet.
 */
export const deleteWalletQuery = gql`
  query DeleteWallet($params: DeleteWalletParameters!) {
    deleteWallet(params: $params) {
      deleted
    }
  }
`

/**
 * Query to find wallet.
 */
export const findWalletsUserQuery = gql`
  query FindWalletsUser($filter: FindWalletParameters) {
    findWalletsUser(filter: $filter) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`
