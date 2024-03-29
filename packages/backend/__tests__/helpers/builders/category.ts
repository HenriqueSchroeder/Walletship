import { user, wallet } from '@prisma/client'

import db from '~/db/prisma'
import { UserBuilder } from './user'

export class CategoryBuilder {
  private title = 'Category'
  private content = 'Category description'
  private user!: user
  private wallet!: wallet | undefined

  setTitle(title: string) {
    this.title = title
    return this
  }

  setContent(content: string) {
    this.content = content
    return this
  }

  setUser(user: user) {
    this.user = user
    return this
  }

  setWallet(wallet: wallet) {
    this.wallet = wallet
    return this
  }

  /**
   * Return an instance.
   */
  async build() {
    /**
     * Creating the user.
     */
    const createdUser = this.user || (await new UserBuilder().save())

    /**
     * Creating the wallet.
     */
    const { id: walletId } = this.wallet || { id: undefined }

    const data = {
      title: this.title,
      userId: createdUser.id,
      content: this.content,
      walletId: walletId
    }

    return data
  }

  /**
   * Persist on database.
   */
  async save() {
    const data = await this.build()
    return await db.category.create({ data })
  }
}
