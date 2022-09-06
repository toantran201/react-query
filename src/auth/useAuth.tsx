import axios, { AxiosResponse } from 'axios'
//
import axiosClient from '~/api'
import { User } from '~/types'
import { useCustomToast, useUser } from '~/hooks'
import { clearStoredUser } from '~/utils/user-storage'

type UseAuth = {
  signin: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  signout: () => void
}

type UserResponse = { user: User }
type ErrorResponse = { message: string }
type AuthResponseType = UserResponse | ErrorResponse

export function useAuth(): UseAuth {
  const SERVER_ERROR = 'There was an error contacting the server'
  const toast = useCustomToast()
  const { updateUser, clearUser } = useUser()

  const authServerCall = async (urlEndpoint: string, email: string, password: string): Promise<void> => {
    try {
      const { data, status }: AxiosResponse<AuthResponseType> = await axiosClient({
        url: urlEndpoint,
        method: 'POST',
        data: { email, password },
      })

      if (status === 400) {
        toast({
          title: (data as ErrorResponse).message || 'Unauthorized',
          status: 'warning',
        })
        return
      }

      if ('user' in data && 'token' in data.user) {
        toast({
          title: `Logged in as ${data.user.email}`,
          status: 'info',
        })
        updateUser(data.user)
      }
    } catch (e) {
      toast({
        title:
          axios.isAxiosError(e) && (e?.response as any)?.data?.message
            ? (e?.response as any)?.data?.message
            : SERVER_ERROR,
        status: 'error',
      })
    }
  }

  const signin = (email: string, password: string): Promise<void> => authServerCall('/signin', email, password)
  const signup = (email: string, password: string): Promise<void> => authServerCall('/user', email, password)

  const signout = () => {
    clearUser()
    clearStoredUser()
    toast({
      title: `Logged out`,
      status: 'info',
    })
  }

  return {
    signin,
    signup,
    signout,
  }
}
