import { useQuery } from "react-query"
import Post, { postsSchema } from "../models/post"

export default function usePosts() {
  return useQuery<Post[], Error>(["posts"], fetchPosts)
}

const fetchPosts = async () => {
  const response = await fetch("data/posts.json")
  if (!response.ok) throw new Error(failedToFetchPostsMessage)
  const json = await response.json()
  return postsSchema.parse(json)
}

export const failedToFetchPostsMessage = "Failed to fetch posts!"
