import InfiniteScroll from 'react-infinite-scroller'
import { useInfiniteQuery } from 'react-query'
//
import { Species } from '~/types'
import SpeciesCmp from '~/pages/Starwar/components/SpeciesCmp'

const INIT_URL = 'https://swapi.dev/api/species'
const fetchUrl = async (url: string) => {
  const response = await fetch(url)
  return response.json()
}

const InfiniteSpecies = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, isFetchingNextPage, isFetching } = useInfiniteQuery<{
    results: Species[]
    next: string
  }>('sw-species', ({ pageParam = INIT_URL }) => fetchUrl(pageParam as string), {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  })

  const loadMore = () => {
    if (isFetching) return
    fetchNextPage()
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Something went wrong</div>
  return (
    <>
      <InfiniteScroll loadMore={loadMore} hasMore={hasNextPage} threshold={10}>
        {data?.pages.map((pageData) => {
          return pageData.results.map((s, index) => <SpeciesCmp key={index} species={s} />)
        })}
      </InfiniteScroll>
      {isFetchingNextPage && <p>Fetching next pages.....</p>}
    </>
  )
}

export default InfiniteSpecies
