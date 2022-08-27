import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { InfinitePeople } from '~/pages/Starwar'
import InfiniteSpecies from '~/pages/Starwar/InfiniteSpecies'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: '20px' }}>
        {/*<h1>Post</h1>*/}
        {/*<Posts />*/}

        <h1>Infinite SWAPI</h1>
        {/*<InfinitePeople />*/}

        <InfiniteSpecies />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
