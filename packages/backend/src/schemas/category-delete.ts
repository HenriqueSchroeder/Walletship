import { Field, ObjectType, InputType } from 'type-graphql'

/**
 * Constant with field descriptions
 */
const DESCRIPTIONS = {
  id: 'ID',
  deleted: 'Se deletou'
}

@ObjectType({ description: 'Deleta a categoria' })
export class DeletedCategoryData {
  @Field({ description: DESCRIPTIONS.deleted })
  deleted!: boolean
}

@InputType()
export class DeleteCategoryParameters {
  @Field({ description: DESCRIPTIONS.id })
  id!: string
}
