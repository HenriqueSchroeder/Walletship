import { Field, ObjectType, InputType } from 'type-graphql'

/**
 * Constant with field descriptions
 */
const DESCRIPTIONS = {
  id: 'ID',
  deleted: 'Se deletou'
}

@ObjectType({ description: 'Deleta a movimentação' })
export class DeletedMovementData {
  @Field({ description: DESCRIPTIONS.deleted })
  deleted!: boolean
}

@InputType()
export class DeleteMovementParameters {
  @Field({ description: DESCRIPTIONS.id })
  id!: string
}
