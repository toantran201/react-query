import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useQuery } from 'react-query'
//
import { Staff } from '~/types'
import axiosClient from '~/api'
import { QUERY_KEYS } from '~/constants/query-keys'

const getStaffs = async (): Promise<Staff[]> => {
  const { data } = await axiosClient.get<Staff[]>('/staff')
  return data
}

type UseStaff = {
  staffs: Staff[]
  filter: string
  setFilter: Dispatch<SetStateAction<string>>
}

export const useStaff = (): UseStaff => {
  const [filter, setFilter] = useState('all')

  const selectFn = useCallback(
    (data: Staff[]) => {
      return data.filter((item) => item.treatmentNames.map((t) => t.toLowerCase()).includes(filter.toLowerCase()))
    },
    [filter]
  )

  const { data = [] } = useQuery<Staff[]>(QUERY_KEYS.STAFF, getStaffs, {
    refetchOnWindowFocus: false,
    retry: 1,
    select: filter === 'all' ? undefined : selectFn,
  })

  return { staffs: data, filter, setFilter }
}
