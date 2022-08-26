import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
//
import { Post } from '~/types/Post'
import { PostDetail } from '~/components'

const fetchPosts = async (pageNumber = 0) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`)
  return response.json()
}

const MAX_POST_PAGE = 10

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const { data, isLoading, isError } = useQuery<Post[]>(['posts', currentPage], () => fetchPosts(currentPage), {
    // keepPreviousData: true,
    staleTime: 2000,
  })
  const queryClient = useQueryClient()

  useEffect(() => {
    if (currentPage < MAX_POST_PAGE) {
      queryClient.prefetchQuery(['posts', currentPage + 1], () => fetchPosts(currentPage + 1))
    }
  }, [currentPage, queryClient])

  if (isLoading) return <div>Loading</div>
  if (isError)
    return (
      <div>
        <h3>Oops, something went wrong</h3>
      </div>
    )

  return (
    <>
      <div>
        {data?.map((post) => (
          <div key={post.id}>
            <button className="post-title" onClick={() => setSelectedPost(post)}>
              {post.title}
            </button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <button disabled={currentPage <= 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
          Previous page
        </button>
        <span>
          &nbsp;Page {currentPage} / {MAX_POST_PAGE}&nbsp;
        </span>
        <button disabled={currentPage >= MAX_POST_PAGE} onClick={() => setCurrentPage((prev) => prev + 1)}>
          Next page
        </button>
      </div>
      <div style={{ marginTop: '20px' }}></div>
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  )
}

export default Posts
