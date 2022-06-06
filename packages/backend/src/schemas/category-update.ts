import { Field, ObjectType, InputType } from 'type-graphql'

/**
 * Constant with field descriptions.
 */
const DESCRIPTIONS = {
  id: 'ID',
  title: 'Titulo',
  content: 'Descrição',
  createdAt: 'Data de criação',
  updatedAt: 'Data de atualização'
}

@ObjectType({ description: 'Dados atualizados da categoria' })
export class UpdatedCategoryData {
  @Field({ description: DESCRIPTIONS.id })
  id?: string

  @Field({ description: DESCRIPTIONS.title })
  title?: string

  @Field({ description: DESCRIPTIONS.content })
  content?: string

  @Field({ description: DESCRIPTIONS.createdAt })
  createdAt?: Date

  @Field({ description: DESCRIPTIONS.updatedAt })
  updatedAt?: Date
}

@InputType()
export class UpdateCategoryParameters {
  @Field({ description: DESCRIPTIONS.id })
  id!: string

  @Field({ nullable: true, description: DESCRIPTIONS.title })
  title!: string

  @Field({ nullable: true, description: DESCRIPTIONS.content })
  content?: string
}
