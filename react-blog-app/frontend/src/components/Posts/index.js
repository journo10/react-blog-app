import React from 'react'
import Post from '../Post'
import "./posts.css"
const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts.map((post, key) => (
        <Post key={key} post={post} />
      ))}
    </div>
  )
}

export default Posts