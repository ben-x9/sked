import "./App.css"
import usePosts from "./hooks/usePosts"
import Post from "./models/post"

export default function App() {
  const { isLoading, error, data: posts } = usePosts()
  console.log("posts", posts)
  return (
    <div className="App">
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error.message}</div>
      ) : (
        <div>
          {posts?.map(post => (
            <PostView {...post} />
          ))}
        </div>
      )}
    </div>
  )
}

const PostView = (post: Post) => (
  <div>
    <div key={post.id}>{post.id}</div>
  </div>
)
