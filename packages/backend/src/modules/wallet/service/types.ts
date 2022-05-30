export type createWalletParams = {
  userId: string
  title: string
  content: string
}

export type updateWalletParams = {
  id: string
  title: string
  content: string
}

export type deleteWalletParams = {
  id: string
}

export type findWalletParams = {
  userId: string
}
