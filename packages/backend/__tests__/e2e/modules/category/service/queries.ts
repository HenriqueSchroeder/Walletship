import { gql } from '@apollo/client'

/**
 * Query to create category.
 */
export const createCategoryQuery = gql`
  query CreateCategory($params: CreateCategoryParameters!) {
    createCategory(params: $params) {
      id
      status
      description
    }
  }
`

/**
 * Query to update category.
 */
export const updateCategoryQuery = gql`
  query UpdateCategory($params: UpdateCategoryParameters!) {
    updateCategory(params: $params) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`

/**
 * Query to delete category.
 */
export const deleteCategoryQuery = gql`
  query DeleteCategory($params: DeleteCategoryParameters!) {
    deleteCategory(params: $params) {
      deleted
    }
  }
`

/**
 * Query to find category.
 */
export const findCategoriesUserQuery = gql`
  query FindCategoryUser($filter: FindCategoryParameters) {
    findCategoryUser(filter: $filter) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`
