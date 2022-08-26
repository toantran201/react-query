import { useQuery } from 'react-query'
import { Comment, Post } from '~/types'

type PostDetailProps = {
  post: Post
}

async function fetchComments(postId: number) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
  return response.json()
}

const PostDetail = ({ post }: PostDetailProps) => {
  const { data } = useQuery<Comment[]>(['comments', post.id], () => fetchComments(post.id))

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button>Delete</button>
      <button>Update title</button>
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
