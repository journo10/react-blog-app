import React from 'react'
import { useContext } from "react"
import { Context } from '../context/Context'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from './Navbar'
import Home from "../pages/Home"
import Register from "../pages/Register"
import Login from "../pages/Login"
import Write from "../pages/Write"
import Settings from "../pages/Settings"
import Single from "../pages/Single"

const Container = () => {
    const { user } = useContext(Context)
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={user ? <Home /> : <Register />} />
                <Route path='/login' element={user ? < Home /> : <Login />} />
                <Route path='/write' element={user ? <Write /> : <Login />} />
                <Route path='/settings' element={user ? <Settings /> : <Login />} />
                <Route path="/post/:id" element={<Single />} />
            </Routes>
        </Router>
    )
}

export default Container