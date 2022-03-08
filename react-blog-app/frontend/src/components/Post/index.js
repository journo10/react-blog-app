import React from 'react'
import { Link } from "react-router-dom";
import "./post.css";

const Post = ({ post }) => {
  const { _id, title, desc, photo, categories, createdAt } = post;
  const PF = "http://localhost:5000/images/";//blog yüklerken yönelndirilen path
  return (
    <div className="post">
      {photo && (
        <img
          className="postImg"
          src={PF + photo}
          alt=""
        />
      )}
      <div className="postInfo">
        <div className="postCats">
          {categories.map((c) => (
            <span className="postCat">
              <Link className="link" to="/posts?cat=Music">
                {c}
              </Link>
            </span>
          ))}
        </div>
        <span className="postTitle">
          <Link to={`/post/${_id}`} className="link">
            {title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date(createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {desc}
      </p>
    </div>
  )
}

export default Post