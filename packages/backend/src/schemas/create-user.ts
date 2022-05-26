import { Field, ObjectType, InputType } from 'type-graphql'

@ObjectType({ description: 'Identificação do usuario' })
export class UserStatusAndIdentification {
  @Field({
    description: 'Status da operação'
  })
  status!: string

  @Field({
    description: 'Descreve o status'
  })
  description!: string

  @Field({
    description: 'Id do usuario'
  })
  id!: string
}

@InputType()
export class CreateUserParameters {
  @Field({ description: 'Nome' })
  name!: string

  @Field({ description: 'Email' })
  email!: string

  @Field({ description: 'Senha' })
  password!: string
}
