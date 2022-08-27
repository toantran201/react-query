import { useMutation, useQuery } from 'react-query'
import { Comment, Post } from '~/types'

type PostDetailProps = {
  post: Post
}

async function fetchComments(postId: number) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
  return response.json()
}

async function deletePost(postId: number) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, { method: 'DELETE' })
  return response.json()
}

async function updatePost(postId: number) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {
    method: 'PATCH',
    body: JSON.stringify({ title: 'REACT QUERY FOREVER!!!!' }),
  })
  return response.json()
}

const PostDetail = ({ post }: PostDetailProps) => {
  const { data } = useQuery<Comment[]>(['comments', post.id], () => fetchComments(post.id))
  const deleteMutation = useMutation((postId: number) => deletePost(postId))
  const updateMutation = useMutation((postId: number) => updatePost(postId))

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
      {deleteMutation.isError && <p style={{ color: 'red' }}>Error deleting the post</p>}
      {deleteMutation.isLoading && <p style={{ color: 'orange' }}>Deleting the post</p>}
      {deleteMutation.isSuccess && <p style={{ color: 'green' }}>Post has been deleted</p>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      <ul>
        {data?.map((comment) => (
          <li key={comment.id}>
            {comment.email}: {comment.body}
          </li>
        ))}
      </ul>
    </>
  )
}

export default PostDetail
