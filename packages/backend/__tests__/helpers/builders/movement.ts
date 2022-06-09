import { category, user, wallet } from '@prisma/client'

import db from '~/db/prisma'
import { CategoryBuilder } from './category'
import { UserBuilder } from './user'
import { WalletBuilder } from './wallet'

export class MovementBuilder {
  private value = 101.5
  private content = 'Movement description'
  private dateMovement = new Date().toISOString()

  private user!: user
  private wallet!: wallet
  private category!: category

  setValue(value: number) {
    this.value = value
    return this
  }

  setDateMovement(dateMovement: string) {
    this.dateMovement = dateMovement
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

  setCategory(category: category) {
    this.category = category
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
     * Creating the category.
     */
    const { id: categoryId, walletId } =
      this.category ||
      (await new CategoryBuilder()
        .setWallet(this.wallet)
        .setUser(createdUser)
        .save())

    /**
     * Creating the wallet.
     */
    const createdWallet = walletId
      ? { id: walletId }
      : await new WalletBuilder().setUser(createdUser).save()

    const data = {
      value: this.value,
      content: this.content,
      walletId: createdWallet.id,
      categoryId: categoryId,
      dateMovement: this.dateMovement
    }

    return data
  }

  /**
   * Persist on database.
   */
  async save() {
    const data = await this.build()
    return await db.movement.create({ data })
  }
}
