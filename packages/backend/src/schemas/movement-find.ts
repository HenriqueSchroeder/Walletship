import { IsString } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'

/**
 * Constant with field descriptions.
 */
const DESCRIPTIONS = {
  id: 'ID',
  value: 'Valor',
  title: 'Titulo',
  content: 'Descrição',
  walletId: 'ID da carteira',
  createdAt: 'Data de criação',
  updatedAt: 'Data de atualização',
  movementId: 'ID da movimentação',
  categoryId: 'ID da categoria',
  dateMovement: 'Data da operação'
}

@ObjectType({ description: 'Todas as movimentações do usuario' })
export class FindMovementsData {
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
export class FindMovementParameters {
  @Field(() => [String], {
    nullable: true,
    description: DESCRIPTIONS.movementId
  })
  @IsString({ each: true })
  movementId?: string[]

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
