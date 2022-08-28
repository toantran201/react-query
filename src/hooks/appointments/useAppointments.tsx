import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useQuery } from 'react-query'
//
import { Appointment, AppointmentDateMap, MonthYear } from '~/types'
import { getMonthYearDetails, getNewMonthYear } from '~/utils/month-year'
import { useCustomToast, useUser } from '~/hooks'
import { QUERY_KEYS } from '~/constants/query-keys'
import axiosClient from '~/api'
import { queryClient } from '~/react-query'

type UseAppointments = {
  appointments: AppointmentDateMap
  monthYear: MonthYear
  updateMonthYear: (monthIncrement: number) => void
  showAll: boolean
  setShowAll: Dispatch<SetStateAction<boolean>>
}

// for useQuery call
const getAppointments = async (year: string, month: string): Promise<AppointmentDateMap> => {
  const { data } = await axiosClient.get<AppointmentDateMap>(`/appointments/${year}/${month}`)
  return data
}

export const useAppointments = (): UseAppointments => {
  const currentMonthYear = getMonthYearDetails(dayjs())
  const { user } = useUser()
  const [monthYear, setMonthYear] = useState(currentMonthYear)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const newMonthYear = getNewMonthYear(monthYear, 1)
    queryClient.prefetchQuery(
      [QUERY_KEYS.APPOINTMENTS, newMonthYear.year, newMonthYear.month],
      () => getAppointments(newMonthYear.year, newMonthYear.month),
      {
        retry: 1,
      }
    )
  }, [queryClient, monthYear])

  // When user click previous or next month
  const updateMonthYear = (monthIncrement: number): void => {
    setMonthYear((prevData) => getNewMonthYear(prevData, monthIncrement))
  }

  const { data: appointments = {} } = useQuery<AppointmentDateMap>(
    [QUERY_KEYS.APPOINTMENTS, monthYear.year, monthYear.month],
    () => getAppointments(monthYear.year, monthYear.month),
    {
      refetchOnWindowFocus: false,
      retry: 1,
    }
  )

  return { appointments, monthYear, updateMonthYear, showAll, setShowAll }
}

type AppointmentMutationFunction = (appointment: Appointment) => void
export const useReserveAppointment = (): AppointmentMutationFunction => {
  const { user } = useUser()
  const toast = useCustomToast()

  // TODO: replace with mutate function
  return (appointment: Appointment) => {
    // nothing to see here
  }
}
