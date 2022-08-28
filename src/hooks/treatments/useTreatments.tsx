import { Treatment } from '~/types'
import axiosClient from '~/api'
//
import { useQuery, useQueryClient } from 'react-query'
import { QUERY_KEYS } from '~/constants/query-keys'
import { useCallback } from 'react'

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

export const usePrefetchTreatments = () => {
  const queryClient = useQueryClient()

  const prefetchTreatments = useCallback(() => {
    queryClient.prefetchQuery(QUERY_KEYS.TREATMENTS, getTreatments, {
      staleTime: 5 * 60 * 1000,
    })
  }, [queryClient])

  return prefetchTreatments
}
