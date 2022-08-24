import dayjs from "dayjs"
import Post from "../models/post"
import css from "./PostCard.module.css"

export default function PostView(post: Post) {
  return (
    <li className={css.postView}>
      <div key={post.id}>{post.id}</div>
      <div className={css.date}>
        {dayjs(post.timestamp).format("ddd D  MMM, h:mm A")}
      </div>
      <div>{post.accountName}</div>
      <img src={post.imageUrl.slice(1)} />
      <div>{post.caption}</div>
    </li>
  )
}
