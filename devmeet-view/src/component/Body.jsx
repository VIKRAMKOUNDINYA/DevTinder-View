import React, { useEffect } from 'react'
import { NavBar } from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import { Footer } from './Footer'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useDispatch } from 'react-redux'


export const Body = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const userData=useSelector((store)=>store.user)
    const fetchUser=async ()=>{
        if (userData) return
        try{
            const res=await axios.get('http://localhost:8081/profile',{withCredentials:true})
            dispatch(addUser(res.data))
        }
        catch(err){
          if(err.status===401){
            navigate("/login")
            console.log(err)
          }
        }
    }
    useEffect(()=>{
        fetchUser()
    },[]);
  return (
    <>
    <NavBar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
