import "./App.css"
import PostView from "./components/PostView"
import usePosts from "./hooks/usePosts"


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


