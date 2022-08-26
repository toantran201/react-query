import React from 'react'
import Posts from '~/pages/Posts/Posts'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: '20px' }}>
        <h1>Post</h1>
        <Posts />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
