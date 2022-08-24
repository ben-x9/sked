import { useState } from "react"
import "./App.css"
import PostView from "./components/PostView"
import usePosts from "./hooks/usePosts"

export default function App() {
  const [filter, setFilter] = useState({ IG: false, FB: false })
  const { isLoading, error, data: posts } = usePosts()
  return (
    <div className="App">
      <div className="filter">
        <Checkbox
          label="Select All Accounts"
          name="all"
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
          name="fb"
          checked={filter.FB}
          onChange={() => setFilter(filter => ({ ...filter, FB: !filter.FB }))}
        />
        <Checkbox
          label="IG"
          name="ig"
          checked={filter.IG}
          onChange={() => setFilter(filter => ({ ...filter, IG: !filter.IG }))}
        />
      </div>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error.message}</div>
      ) : (
        <div className="posts">
          {posts
            ?.filter(post => filter[post.accountId])
            .map(post => (
              <PostView {...post} key={post.id} />
            ))}
        </div>
      )}
    </div>
  )
}

const Checkbox = ({
  name,
  label,
  onChange,
  checked,
}: {
  name: string
  label: string
  onChange: () => void
  checked: boolean
}) => (
  <div className="checkbox" onClick={onChange}>
    <input type="checkbox" name={name} checked={checked} />
    <label htmlFor={name}>{label}</label>
  </div>
)
