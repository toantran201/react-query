import { useCallback } from 'react'
import { useQuery } from 'react-query'
//
import { Treatment } from '~/types'
import axiosClient from '~/api'
import { QUERY_KEYS } from '~/constants/query-keys'
import { queryClient } from '~/react-query'

const getTreatments = async (): Promise<Treatment[]> => {
  const { data } = await axiosClient.get<Treatment[]>('/treatments')
  return data
}

export const useTreatments = (): Treatment[] => {
  const { data = [] } = useQuery(QUERY_KEYS.TREATMENTS, getTreatments)

  return data
}

export const usePrefetchTreatments = () => {
  const prefetchTreatments = useCallback(() => {
    queryClient.prefetchQuery(QUERY_KEYS.TREATMENTS, getTreatments)
  }, [queryClient])

  return prefetchTreatments
}
