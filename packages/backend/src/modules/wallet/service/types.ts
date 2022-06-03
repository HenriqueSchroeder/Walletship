export type createWalletParams = {
  content?: string
  userId: string
  title: string
}

export type updateWalletParams = {
  content?: string
  title: string
  id: string
}

export type deleteWalletParams = {
  id: string
}

export type findWalletParams = {
  userId: string
  walletId?: string[]
}
