import { useInfiniteQuery } from 'react-query'
import InfiniteScroll from 'react-infinite-scroller'
//
import PersonItem from '~/pages/Starwar/components/PersonItem'
import { Person } from '~/types'

const INIT_URL = 'https://swapi.dev/api/people'
const fetchUrl = async (url: string) => {
  const response = await fetch(url)
  return response.json()
}

const InfinitePeople = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, isFetchingNextPage } = useInfiniteQuery<{
    results: Person[]
    next: string
  }>('sw-people', ({ pageParam = INIT_URL }) => fetchUrl(pageParam as string), {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  })

  const loadMore = () => {
    fetchNextPage()
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Something went wrong</div>

  return (
    <>
      <InfiniteScroll loadMore={loadMore} hasMore={hasNextPage}>
        {data?.pages.map((pageData) => {
          return pageData.results.map((p, index) => <PersonItem key={index} person={p} />)
        })}
      </InfiniteScroll>
      {isFetchingNextPage && <p>Fetching next pages.....</p>}
    </>
  )
}

export default InfinitePeople
