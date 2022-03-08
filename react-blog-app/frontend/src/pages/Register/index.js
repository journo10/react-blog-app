import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import "./register.css";
import axios from "axios"

const initialValues = {
  username: "",
  email: "",
  password: ""
}
const Register = () => {
  const [registerForm, setRegisterForm] = useState(initialValues);
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value
    })
  }

  const onFormSubmit = async (e) => {
    e.preventDefault()
    setError(false)
    try {
      const newUser = {
        username: registerForm.username,
        email: registerForm.email,
        password: registerForm.password
      }
      const res = await axios.post("http://localhost:5000/api/auth/register", newUser);
      res.data && window.location.replace("/login")//istediğin route gitmsi için useNavigate ile de yapabilirdin.
    } catch (error) {
      setError(true);
    }
  }

  return (
    <div className="register">
      <span className="registerTitle">Kayıt Ol</span>
      <form className="registerForm" onSubmit={onFormSubmit}>
        <label>Kullanıcı Adı</label>
        <input
          onChange={handleChange}
          value={registerForm.username}
          name='username'
          className="registerInput"
          type="text"
          placeholder="Kullanıcı adınızı giriniz" />
        <label>E-posta</label>
        <input
          onChange={handleChange}
          value={registerForm.email}
          name='email'
          className="registerInput"
          type="text"
          placeholder="E-postanızı giriniz" />
        <label>Şifre</label>
        <input
          onChange={handleChange}
          value={registerForm.password}
          name='password'
          className="registerInput"
          type="password"
          placeholder="Şifrenizi girin" />
        <button className="registerButton">Kayıt Ol</button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Giriş Yap
        </Link>
      </button>
      {error && (
        <span style={{marginTop:"7px", color:"red"}}>*Eksik bilgi girdiniz!</span>
      )}
    </div>
  )
}

export default Register