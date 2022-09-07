import { useQuery } from 'react-query'
//
import { Appointment, User } from '~/types'
import axiosClient from '~/api'
import { useUser } from '~/hooks'
import { QUERY_KEYS } from '~/constants/query-keys'

const getUserAppointments = async (user: User | null): Promise<Appointment[] | null> => {
  if (!user) return null
  const { data } = await axiosClient.get(`/user/${user.id}/appointments`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token as string}`,
    },
  })
  return data.appointments as Appointment[]
}

export const useUserAppointments = (): Appointment[] => {
  const { user } = useUser()
  const fallback: Appointment[] = []

  const { data: userAppointments = fallback } = useQuery(
    [QUERY_KEYS.APPOINTMENTS, QUERY_KEYS.USER, user?.id],
    () => getUserAppointments(user),
    {
      enabled: !!user,
    }
  )

  return userAppointments as Appointment[]
}
