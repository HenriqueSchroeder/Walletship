import { user_role } from '@prisma/client'
import { Field, ObjectType, InputType, registerEnumType } from 'type-graphql'

/**
 * Constant with field descriptions.
 */
const DESCRIPTIONS = {
  id: 'ID',
  name: 'Nome',
  role: 'Permissão',
  email: 'Email',
  isActive: 'Se a conta esta ativa',
  password: 'Senha'
}

/**
 * Register CollectionStatus enum.
 */
registerEnumType(user_role, { name: 'user_role' })

@ObjectType({ description: 'Dados atualizados do usuario' })
export class UpdatedUserData {
  @Field({ description: DESCRIPTIONS.id })
  id!: string

  @Field({ description: DESCRIPTIONS.name })
  name!: string

  @Field({ description: DESCRIPTIONS.email })
  email!: string

  @Field({ description: DESCRIPTIONS.isActive })
  isActive!: boolean

  @Field(() => user_role, { description: DESCRIPTIONS.role })
  role!: user_role
}

@InputType()
export class UpdateUserParameters {
  @Field({ description: DESCRIPTIONS.id })
  id!: string

  @Field({ nullable: true, description: DESCRIPTIONS.name })
  name?: string

  @Field({ nullable: true, description: DESCRIPTIONS.email })
  email?: string

  @Field({ nullable: true, description: DESCRIPTIONS.isActive })
  isActive?: boolean

  @Field({ nullable: true, description: DESCRIPTIONS.password })
  password?: string
}
