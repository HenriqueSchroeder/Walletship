import { Field, ObjectType, InputType } from 'type-graphql'

/**
 * Constant with field descriptions
 */
const DESCRIPTIONS = {
  id: 'ID',
  deleted: 'Se deletou'
}

@ObjectType({ description: 'Deleta a carteira' })
export class DeletedWalletData {
  @Field({ description: DESCRIPTIONS.deleted })
  deleted!: boolean
}

@InputType()
export class DeleteWalletParameters {
  @Field({ description: DESCRIPTIONS.id })
  id!: string
}
