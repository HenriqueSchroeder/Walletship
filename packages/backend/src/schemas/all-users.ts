import { Field, ObjectType } from 'type-graphql'

@ObjectType({ description: 'Todos os usuario' })
export class AllUsersReturn {
  @Field()
  id!: string

  @Field()
  email!: string

  @Field()
  name!: string

  @Field()
  role!: string

  @Field()
  isActive!: boolean
}
