export interface Id {
  id: number
}

export interface NewUser {
  email: string
  name?: string
  address?: string
  phone?: string
  token?: string
}

export type User = Id & NewUser
