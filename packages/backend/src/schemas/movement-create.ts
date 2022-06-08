import { IsNumber, IsOptional, IsString } from 'class-validator'
import { Field, ObjectType, InputType } from 'type-graphql'

/**
 * Constant with field descriptions.
 */
const DESCRIPTIONS = {
  id: 'ID',
  value: 'Valor',
  title: 'Titulo',
  status: 'Status da operação',
  content: 'Descrição',
  walletId: 'ID da carteira',
  categoryId: 'ID da categoria',
  description: 'Descreve o status',
  dateMovement: 'Data da operação'
}

@ObjectType({ description: 'Identificação do movimento' })
export class MovementStatusAndIdentification {
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
export class CreateMovementParameters {
  @Field({ description: DESCRIPTIONS.walletId })
  @IsString()
  walletId!: string

  @Field({ description: DESCRIPTIONS.categoryId })
  @IsString()
  categoryId!: string

  @Field({ description: DESCRIPTIONS.dateMovement })
  @IsString()
  dateMovement!: string

  @Field({ description: DESCRIPTIONS.value })
  @IsNumber()
  value!: number

  @Field({ nullable: true, description: DESCRIPTIONS.content })
  @IsOptional()
  @IsString()
  content?: string
}
