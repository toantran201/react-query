import jsonpatch from 'fast-json-patch'
import { useMutation, useQueryClient } from 'react-query'
//
import { User } from '~/types'
import { useCustomToast, useUser } from '~/hooks'
import axiosClient from '~/api'
import { QUERY_KEYS } from '~/constants/query-keys'

const patchUserOnServer = async (newData: User | null, originalData: User | null): Promise<User | null> => {
  if (!newData || !originalData) return null
  const patch = jsonpatch.compare(originalData, newData)

  const { data } = await axiosClient.patch<{ user: User }>(
    `/user/${originalData.id}`,
    { patch },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${originalData.token as string}`,
      },
    }
  )

  return data.user
}

export const usePatchUser = (): ((newData: User | null) => void) => {
  const { user, updateUser } = useUser()
  const toast = useCustomToast()
  const queryClient = useQueryClient()

  const { mutate: patchUser } = useMutation((newUserData: User | null) => patchUserOnServer(newUserData, user), {
    onMutate: async (newData: User | null) => {
      // cancel out going data for user data, so old server data doesn't overwrite out optimistic update
      await queryClient.cancelQueries(QUERY_KEYS.USER)

      // snapshot of previous user value
      const previousUserData: User | undefined = queryClient.getQueryData(QUERY_KEYS.USER)

      // optimistic update the cache with new user value
      if (newData) {
        updateUser(newData)
      }

      // return the context object with snapshotted value
      return { previousUserData }
    },
    onError: (error, newData, context) => {
      // roll back the cache to saved value
      if (context?.previousUserData) {
        updateUser(context.previousUserData)
        toast({
          title: 'Update failed, restoring to previous data',
          status: 'error',
        })
      }
    },
    onSettled: () => {
      // Invalidate user query to make sure we're in sync with server
      queryClient.invalidateQueries(QUERY_KEYS.USER)
    },
    onSuccess: (newUserData) => {
      if (newUserData) {
        toast({
          title: 'User updated!',
          status: 'success',
        })
      }
    },
  })

  return patchUser
}
