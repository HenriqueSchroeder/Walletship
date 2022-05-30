import db from '~/db/prisma'
import { UserBuilder } from './user'

export class WalletBuilder {
  private title = 'Wallet'
  private content = 'Wallet description'
  private user = null

  /**
   * Return an instance.
   */
  async build() {
    const { id: userId } = this.user || (await new UserBuilder().save())

    const data = {
      title: this.title,
      content: this.content,
      userId: userId
    }

    return data
  }

  /**
   * Persist on database.
   */
  async save() {
    const data = await this.build()
    return await db.wallet.create({ data })
  }
}
