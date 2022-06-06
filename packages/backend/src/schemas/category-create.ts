import { IsString } from 'class-validator'
import { Field, ObjectType, InputType } from 'type-graphql'

/**
 * Constant with field descriptions.
 */
const DESCRIPTIONS = {
  id: 'ID',
  title: 'Titulo',
  status: 'Status da operação',
  content: 'Descrição',
  walletId: 'ID da carteira',
  description: 'Descreve o status'
}

@ObjectType({ description: 'Identificação da categoria' })
export class CategoryStatusAndIdentification {
  @Field({
    description: DESCRIPTIONS.status
  })
  status!: string

  @Field({
    description: DESCRIPTIONS.description
  })
  description!: string

  @Field({
    description: DESCRIPTIONS.id
  })
  id!: string
}

@InputType()
export class CreateCategoryParameters {
  @Field({ description: DESCRIPTIONS.title })
  title!: string

  @Field({ description: DESCRIPTIONS.content })
  content?: string

  @Field(() => [String], { nullable: true, description: DESCRIPTIONS.walletId })
  @IsString()
  walletId?: string
}
