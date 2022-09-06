import { useMutation, useQueryClient } from 'react-query'
//
import { Appointment } from '~/types'
import axiosClient from '~/api'
import { QUERY_KEYS } from '~/constants/query-keys'
import { useCustomToast } from '~/hooks'

const removeAppointmentUser = async (appointment: Appointment): Promise<void> => {
  const patchData = [
    {
      op: 'remove',
      path: '/userId',
    },
  ]
  await axiosClient.patch(`appointment/${appointment.id}`, {
    data: patchData,
  })
}

export const useCancelAppointment = () => {
  const queryClient = useQueryClient()
  const toast = useCustomToast()

  const { mutate } = useMutation(removeAppointmentUser, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.APPOINTMENTS])
      toast({
        title: 'You have canceled the appointment!',
        status: 'warning',
      })
    },
  })
  return mutate
}
