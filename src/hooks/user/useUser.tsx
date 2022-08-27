import { User } from '~/types'

type UseUser = {
  user: User | null
  updateUser: (user: User) => void
  clearUser: () => void
}
export const useUser = (): UseUser => {
  const user = null

  const updateUser = (newUser: User) => {
    //
  }

  const clearUser = () => {
    //
  }

  return {
    user,
    updateUser,
    clearUser,
  }
}
