import { Appointment } from '~/types'
import { useCustomToast, useUser } from '~/hooks'
import { UseMutateFunction, useMutation, useQueryClient } from 'react-query'
import axiosClient from '~/api'
import { QUERY_KEYS } from '~/constants/query-keys'

const setAppointmentUser = async (appointment: Appointment, userId: number | undefined): Promise<void> => {
  if (!userId) return
  const patchOp = appointment.userId ? 'replace' : 'add'
  const patchData = [{ op: patchOp, path: '/userId', value: userId }]
  await axiosClient.patch(`/appointment/${appointment.id}`, {
    data: patchData,
  })
}

export const useReserveAppointment = (): UseMutateFunction<void, Error, Appointment> => {
  const { user } = useUser()
  const toast = useCustomToast()
  const queryClient = useQueryClient()
  const { mutate } = useMutation<void, Error, Appointment>((appointment) => setAppointmentUser(appointment, user?.id), {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.APPOINTMENTS])
      toast({
        title: 'You have reserved the appointment !',
        status: 'success',
      })
    },
  })

  // TODO: replace with mutate function
  return mutate
}
