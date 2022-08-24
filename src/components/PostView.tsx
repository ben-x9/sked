import Post from "../models/post"

export default function PostView(post: Post) {
  return (
    <div>
      <div key={post.id}>{post.id}</div>
    </div>
  )
}
