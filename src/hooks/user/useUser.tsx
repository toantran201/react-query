import { AxiosResponse } from 'axios'
import { useQuery, useQueryClient } from 'react-query'
//
import { User } from '~/types'
import axiosClient from '~/api'
import { QUERY_KEYS } from '~/constants/query-keys'
import { clearStoredUser, getStoredUser, setStoredUser } from '~/utils/user-storage'

type UseUser = {
  user: User | null
  updateUser: (user: User) => void
  clearUser: () => void
}

const getUser = async (user: User | null | undefined): Promise<User | null> => {
  if (!user) return null
  const { data }: AxiosResponse<{ user: User }> = await axiosClient.get<{ user: User }>(`/user/${user.id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token as string}`,
    },
  })
  return data.user
}

export const useUser = (): UseUser => {
  const queryClient = useQueryClient()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { data } = useQuery<User | null>(QUERY_KEYS.USER, () => getUser(data), {
    initialData: getStoredUser,
    onSuccess: (received: null | User) => {
      if (!received) {
        clearStoredUser()
        return
      }
      setStoredUser(received)
    },
  })

  const updateUser = (newUser: User) => {
    //
    queryClient.setQueryData(QUERY_KEYS.USER, newUser)
  }

  const clearUser = () => {
    //
    queryClient.setQueryData(QUERY_KEYS.USER, null)
    queryClient.removeQueries('user-appointment')
  }

  return {
    user: data,
    updateUser,
    clearUser,
  }
}
