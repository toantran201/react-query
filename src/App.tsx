import React from 'react'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ChakraProvider } from '@chakra-ui/react'
//
import { queryClient } from '~/react-query'
import { theme } from '~/theme'
import { Loading, NavBar } from '~/components'
import { RoutesApp } from '~/routes'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <div style={{ padding: '20px' }}>
          <NavBar />
          <Loading />
          <RoutesApp />
        </div>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
