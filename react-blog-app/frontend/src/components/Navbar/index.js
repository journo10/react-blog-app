import React from 'react'
import { Link, Outlet } from "react-router-dom";
import "./navbar.css";
import { useContext } from 'react';
import { Context } from '../../context/Context';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const { user, dispatch } = useContext(Context)
  const PF = "http://localhost:5000/images/";
  const { theme, setTheme } = useTheme()//tema

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              ANASAYFA
            </Link>
          </li>
          {/* <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li> */}
          <li className="topListItem">
            <Link className="link" to="/write">
              BLOG YÜKLE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "Çıkış"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src={PF + user.profilePic}
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                Giriş
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                Kayıt Ol
              </Link>
            </li>
          </ul>
        )}
        <div>
          <button
            className='theme-btn'
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >TEMA DEĞİŞTİR</button>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Navbar

//NOT => TEMA KISMI OLMADI SIKINTILI ÇALIŞIYOR,SONRA TEKRAR BAK