import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Giriş Yap</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Kullanıcı Adı</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Kullanıcı adınızı giriniz"
          ref={userRef}
        />
        <label>Şifre</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Şifrenizi girin"
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Giriş Yap
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Kayıt Ol
        </Link>
      </button>
    </div>
  );
};

export default Login;
