import { QueryClient } from 'react-query'
import { createStandaloneToast } from '@chakra-ui/react'
//
import { theme } from '~/theme'

const { toast } = createStandaloneToast({ theme })

const queryErrorHandler = (error: unknown) => {
  const id = 'react-query-error'
  const title = error instanceof Error ? error.message : 'Error connecting to server'
  toast.closeAll()
  toast({ id, title, status: 'error', variant: 'subtle', isClosable: true })
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
      staleTime: 600000, // 10 minutes
      cacheTime: 900000, // 15 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
    },
    mutations: {
      onError: queryErrorHandler,
    },
  },
})
