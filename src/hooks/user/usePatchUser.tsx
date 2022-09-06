import { User } from '~/types'
import { useUser } from '~/hooks'

export const usePatchUser = (): ((newData: User | null) => void) => {
  const { user, updateUser } = useUser()

  const patchUser = (newData: User | null) => {
    //
  }

  return patchUser
}
