import React, { useContext, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Context } from "../../context/Context";
import "./settings.css";
import axios from "axios";

const Settings = () => {
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handeleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username: form.username,
      email: form.email,
      password: form.password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/" + user._id,
        updatedUser
      );
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Hesabınızı Güncelleyin</span>
          <span className="settingsTitleDelete">Hesabı Sil</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profil Fotoğrafı</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt={user.username}
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              name="file"
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
            />
          </div>
          <label>Kullanıcı Adı</label>
          <input
            value={form.username}
            onChange={handeleOnChange}
            type="text"
            placeholder={user.username}
            name="username"
          />
          <label>E-posta</label>
          <input
            value={form.email}
            onChange={handeleOnChange}
            type="email"
            placeholder={user.email}
            name="email"
          />
          <label>Şifre</label>
          <input
            value={form.password}
            onChange={handeleOnChange}
            type="password"
            placeholder="Şifre"
            name="password"
          />
          <button className="settingsSubmitButton" type="submit">
            Güncelle
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profil güncellendi...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
