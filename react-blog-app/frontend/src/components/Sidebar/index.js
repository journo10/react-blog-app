import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import "./sidebar.css";
import axios from "axios"

const Sidebar = () => {
    const [cat, setCat] = useState([]);

    useEffect(()=>{
      const getCategori = async () =>{
        const {data} = await axios.get("http://localhost:5000/api/categories")
        setCat(data);
      }
      getCategori()
    },[])

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">Hakkımızda</span>
        <img
          src="https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">KATEGORİLER</span>
        <ul className="sidebarList">
          {cat.map((c) =>(
            <li key={c._id} className="sidebarListItem">
            <Link className="link" to={`/?cat=${c.name}`}>
              {c.name}
            </Link>
          </li>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">BİZİ TAKİP ET</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  )
}

export default Sidebar