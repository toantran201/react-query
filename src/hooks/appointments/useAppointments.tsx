import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useQuery } from 'react-query'
//
import { AppointmentDateMap, MonthYear } from '~/types'
import { getMonthYearDetails, getNewMonthYear } from '~/utils/month-year'
import { useUser } from '~/hooks'
import { QUERY_KEYS } from '~/constants/query-keys'
import axiosClient from '~/api'
import { queryClient } from '~/react-query'
import { getAvailableAppointments } from '~/pages/appointments/helpers'

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
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    const newMonthYear = getNewMonthYear(monthYear, 1)
    queryClient.prefetchQuery(
      [QUERY_KEYS.APPOINTMENTS, newMonthYear.year, newMonthYear.month],
      () => getAppointments(newMonthYear.year, newMonthYear.month),
      {
        retry: 1,
        staleTime: 0,
        cacheTime: 300000,
      }
    )
  }, [queryClient, monthYear])

  // When user click previous or next month
  const updateMonthYear = (monthIncrement: number): void => {
    setMonthYear((prevData) => getNewMonthYear(prevData, monthIncrement))
  }

  const selectFn = useCallback((data: AppointmentDateMap) => getAvailableAppointments(data, user), [user])

  const { data: appointments = {} } = useQuery<AppointmentDateMap>(
    [QUERY_KEYS.APPOINTMENTS, monthYear.year, monthYear.month],
    () => getAppointments(monthYear.year, monthYear.month),
    {
      retry: 1,
      select: showAll ? undefined : selectFn,
      staleTime: 0,
      cacheTime: 300000,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      refetchInterval: 1000 * 60 * 5,
    }
  )

  return { appointments, monthYear, updateMonthYear, showAll, setShowAll }
}
