import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import { Context } from "../../context/Context";


const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const [form, setForm] = useState({ title: "", desc: "" })
  const [updateMode, setUpdateMode] = useState(false);
  const { user } = useContext(Context);


  useEffect(() => {
    const getPost = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/posts/${path}`)
      setPost(data)
      setForm(data)
      setForm(data)
    }
    getPost()
  }, [path])

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) { }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${post._id}`, {
        username: user.username,
        title: form.title,
        desc: form.desc
      });
      setUpdateMode(false)
    } catch (err) { }
  };

  const handlOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img
            className="singlePostImg"
            src={PF + post.photo}
            alt={post.title}
          />
        )}

        {updateMode ? (
          <input
            type="text"
            name='title'
            value={form.title}
            className="singlePostTitleInput"
            autoFocus
            onChange={handlOnChange}
          />
        ) : (
          <h1 className="singlePostTitle">
            {form.title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>

            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span>
            Yazar:
            <b className="singlePostAuthor">
              <Link className="link" to={`/?user=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            name='desc'
            value={form.desc}
            onChange={handlOnChange}
          />
        ) : (
          <p className="singlePostDesc">
            {form.desc}
          </p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Güncelle
          </button>
        )}
      </div>
    </div>
  )
}

export default SinglePost

//NOT => useLocatin ile yapıtığım işlemi useParams ile de yapabilirdim.