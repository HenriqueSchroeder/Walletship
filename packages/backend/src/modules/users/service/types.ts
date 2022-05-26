import { user_role } from "@prisma/client"

export type createUserParams = {
  password: string
  email: string
  name: string
}

export type updateUserParams = {
  password?: string
  isActive?: boolean
  email?: string
  name?: string
  role?: user_role
  id: string
}
