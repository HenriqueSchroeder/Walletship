import { Field, ObjectType, InputType } from 'type-graphql'

@ObjectType({ description: 'Login de usuario/administrador' })
export class StatusAndTokenLogin {
  @Field({
    description: 'Status da operação'
  })
  status!: string

  @Field({
    description: 'Descreve o status'
  })
  description!: string

  @Field({
    description: 'token de atutenticação'
  })
  token!: string
}

@InputType()
export class LoginParameters {
  @Field({ description: 'Email' })
  email!: string

  @Field({ description: 'Senha' })
  password!: string
}
