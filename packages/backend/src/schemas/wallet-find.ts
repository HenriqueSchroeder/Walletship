import { Field, ObjectType } from 'type-graphql'

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

@ObjectType({ description: 'Todas as carteiras do usuario' })
export class findWalletsData {
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
