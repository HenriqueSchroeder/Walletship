import { user_role } from '@prisma/client'
import db from '~/db/prisma'

export class UserBuilder {
  private name = 'Henrique de Ferraz'
  private email = 'henriqueferraz@fw7.com.br'
  private password = 'H3nr/qu3@F3rr4z'
  private isActive = false
  private role: user_role = user_role.USER

  setName(name: string) {
    this.name = name
    return this
  }

  setEmail(email: string) {
    this.email = email
    return this
  }

  setPassword(password: string) {
    this.password = password
    return this
  }

  setRole(role: user_role) {
    this.role = role
    return this
  }

  setIsActive(isActive: boolean) {
    this.isActive = isActive
    return this
  }

  /**
   * Return an instance.
   */
  async build() {
    const data = {
      name: this.name,
      role: this.role,
      email: this.email,
      password: this.password,
      isActive: this.isActive
    }

    return data
  }

  /**
   * Persist on database.
   */
  async save() {
    const data = await this.build()
    return await db.user.create({ data })
  }
}
