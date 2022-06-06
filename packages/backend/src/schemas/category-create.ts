import { IsOptional, IsString } from 'class-validator'
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

  @Field({ nullable: true, description: DESCRIPTIONS.content })
  @IsOptional()
  @IsString()
  content?: string

  @Field({ nullable: true, description: DESCRIPTIONS.walletId })
  @IsOptional()
  @IsString()
  walletId?: string
}
