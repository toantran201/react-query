import { Treatment } from '~/types'
import axiosClient from '~/api'
//
import { useQuery } from 'react-query'
import { QUERY_KEYS } from '~/constants/query-keys'

const getTreatments = async (): Promise<Treatment[]> => {
  const { data } = await axiosClient.get<Treatment[]>('/treatments')
  return data
}

export const useTreatments = (): Treatment[] => {
  const { data = [] } = useQuery(QUERY_KEYS.TREATMENTS, getTreatments, {
    refetchOnWindowFocus: false,
    retry: 1,
  })

  return data
}
