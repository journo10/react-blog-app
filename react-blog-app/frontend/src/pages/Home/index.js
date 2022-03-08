import React, { useEffect, useState } from 'react'
import Header from "../../components/Header"
import Posts from "../../components/Posts"
import Sidebar from "../../components/Sidebar"
//import { useLocation } from "react-router";
import "./home.css"
import axios from "axios";
import { useLocation } from 'react-router-dom'

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation() //author ve cetogorileri bulması için.


  useEffect(() => {
    const getFecthPosts = async () => {
      const response = await axios.get("http://localhost:5000/api/posts" + search)
      setPosts(response.data)
    }
    getFecthPosts()
  }, [search])
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  )
}

export default Home

//NOT =>  const location = useLocation()
          //console.log(location); >>>>>>>AUTHOR VE CATEGORİ KISIMLAR PATH BULMAK İÇİN