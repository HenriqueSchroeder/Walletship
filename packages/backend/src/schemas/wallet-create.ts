import { Field, ObjectType, InputType } from 'type-graphql'

/**
 * Constant with field descriptions.
 */
const DESCRIPTIONS = {
  id: 'ID',
  title: 'Titulo',
  status: 'Status da operação',
  content: 'Descrição',
  description: 'Descreve o status'
}

@ObjectType({ description: 'Identificação da carteira' })
export class WalletStatusAndIdentification {
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
export class CreateWalletParameters {
  @Field({ description: DESCRIPTIONS.title })
  title!: string

  @Field({ description: DESCRIPTIONS.content })
  content?: string
}
