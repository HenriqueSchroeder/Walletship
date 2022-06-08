import { IsNumber, IsString } from 'class-validator'
import { Field, ObjectType, InputType } from 'type-graphql'

/**
 * Constant with field descriptions.
 */
const DESCRIPTIONS = {
  id: 'ID',
  value: 'Valor',
  title: 'Titulo',
  content: 'Descrição',
  createdAt: 'Data de criação',
  updatedAt: 'Data de atualização',
  dateMovement: 'Data da operação'
}

@ObjectType({ description: 'Dados atualizados da movimentação' })
export class UpdatedMovementData {
  @Field({ description: DESCRIPTIONS.id })
  id?: string

  @Field({ description: DESCRIPTIONS.value })
  value?: number

  @Field({ description: DESCRIPTIONS.content })
  content?: string

  @Field({ description: DESCRIPTIONS.createdAt })
  createdAt?: Date

  @Field({ description: DESCRIPTIONS.updatedAt })
  updatedAt?: Date

  @Field({ description: DESCRIPTIONS.dateMovement })
  dateMovement?: Date
}

@InputType()
export class UpdateMovementParameters {
  @Field({ description: DESCRIPTIONS.id })
  id!: string

  @Field({ nullable: true, description: DESCRIPTIONS.dateMovement })
  @IsString()
  dateMovement?: string

  @Field({ nullable: true, description: DESCRIPTIONS.content })
  @IsString()
  content?: string

  @Field({ nullable: true, description: DESCRIPTIONS.value })
  @IsNumber()
  value?: number
}
