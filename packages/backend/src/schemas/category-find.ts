import { IsString } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'

/**
 * Constant with field descriptions.
 */
const DESCRIPTIONS = {
  id: 'ID',
  title: 'Titulo',
  content: 'Descrição',
  walletId: 'ID da carteira',
  createdAt: 'Data de criação',
  updatedAt: 'Data de atualização',
  categoryId: 'ID da categoria'
}

@ObjectType({ description: 'Todas as categorias do usuario' })
export class FindCategoriesData {
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
export class FindCategoryParameters {
  @Field(() => [String], {
    nullable: true,
    description: DESCRIPTIONS.categoryId
  })
  @IsString({ each: true })
  categoryId?: string[]

  @Field(() => [String], { nullable: true, description: DESCRIPTIONS.walletId })
  @IsString({ each: true })
  walletId?: string[]
}
