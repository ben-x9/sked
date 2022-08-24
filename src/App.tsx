import { useState } from "react"
import "./App.css"
import Checkbox from "./components/Checkbox"
import PostCard from "./components/PostCard"
import usePosts from "./hooks/usePosts"

export default function App() {
  const [filter, setFilter] = useState({ IG: false, FB: false })
  const { isLoading, error, data: posts } = usePosts()
  return (
    <div className="App">
      <div className="filter">
        <Checkbox
          label="Select All Accounts"
          id="all"
          checked={filter.IG && filter.FB}
          onChange={() =>
            setFilter(filter =>
              filter.FB && filter.IG
                ? { IG: false, FB: false }
                : { IG: true, FB: true }
            )
          }
        />
        <Checkbox
          label="FB"
          id="fb"
          checked={filter.FB}
          onChange={() => setFilter(filter => ({ ...filter, FB: !filter.FB }))}
        />
        <Checkbox
          label="IG"
          id="ig"
          checked={filter.IG}
          onChange={() => setFilter(filter => ({ ...filter, IG: !filter.IG }))}
        />
      </div>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error.message}</div>
      ) : (
        <ul className="posts">
          {posts
            ?.filter(post => filter[post.accountId])
            .map(post => (
              <PostCard {...post} key={post.id} />
            ))}
        </ul>
      )}
    </div>
  )
}
