export type createCategoryParams = {
  walletId?: string
  content?: string
  userId: string
  title: string
}

export type updateCategoryParams = {
  content?: string
  title: string
  id: string
}

export type deleteCategoryParams = {
  id: string
}

export type findCategoryParams = {
  categoryId?: string[]
  walletId?: string[]
  userId: string
}
