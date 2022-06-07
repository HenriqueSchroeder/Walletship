export type createMovementParams = {
  dateMovement: string
  categoryId: string
  walletId: string
  content?: string
  userId: string
  value: number
}

export type updateMovementParams = {
  dateMovement?: string
  content?: string
  value?: number
  userId: string
  id: string
}

export type deleteMovementParams = {
  userId: string
  id: string
}

export type findMovementParams = {
  movementId?: string[]
  categoryId?: string[]
  walletId?: string[]
  userId: string
}
