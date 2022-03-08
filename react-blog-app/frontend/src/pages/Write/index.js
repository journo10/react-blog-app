import React, { useContext, useState } from 'react'
import "./write.css"
import { Context } from '../../context/Context';
import axios from "axios";

const Write = () => {
  const [form, setForm] = useState({ title: "", desc: "" });
  const [file, setFile] = useState(null);
  const { user } = useContext(Context)

  const handeleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title: form.title,
      desc: form.desc
    }
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename)
      data.append("file", file)
      newPost.photo = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (error) { }
    }
    try {
      const res = await axios.post("http://localhost:5000/api/posts", newPost)
      window.location.replace("/post/" + res.data._id)
    } catch (error) { }
  }

  return (
    <div className="write">
      {file && (
        <img
          className="writeImg"
          src={URL.createObjectURL(file)}
          alt=""
        />
      )}
      <form className="writeForm" onSubmit={onFormSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            name='file'
            id="fileInput"
            type="file"
            style={{ display: "none" }}
          />
          <input
            onChange={handeleOnChange}
            value={form.title}
            name='title'
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            onChange={handeleOnChange}
            value={form.desc}
            name='desc'
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Yayınla
        </button>
      </form>
    </div>
  )
}

export default Write