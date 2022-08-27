import { Dispatch, SetStateAction, useState } from 'react'
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
  const { data = [] } = useQuery<Staff[]>([QUERY_KEYS.STAFF, filter], getStaffs, {
    refetchOnWindowFocus: false,
    retry: 1,
  })

  return { staffs: data, filter, setFilter }
}
