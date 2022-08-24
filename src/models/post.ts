import myzod, { Infer, string } from "myzod"

const postSchema = myzod.object({
  id: myzod.string(),
  accountId: myzod.literals("IG", "FB"),
  accountIcon: myzod.string(),
  accountName: myzod.string(),
  accountImageInitial: myzod.string(),
  imageUrl: myzod.string(),
  caption: myzod.string(),
  timestamp: myzod.number().map(value => new Date(value)),
})

type Post = Infer<typeof postSchema>

export default Post

export const postsSchema = myzod.array(postSchema)
