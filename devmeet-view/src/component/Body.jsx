import React, { useEffect } from 'react'
import { NavBar } from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import { Footer } from './Footer'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useDispatch } from 'react-redux'
import { BASE_URL } from '../utils/constants'


export const Body = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const userData=useSelector((store)=>store.user)
    const fetchUser=async ()=>{
        if (userData) return
        try{
            const res=await axios.get(BASE_URL+'/profile',{withCredentials:true})
            dispatch(addUser(res.data))
        }
        catch(err){
          if(err.status===400){
            navigate("/login")
            console.log(err)
          }
        }
    }
    useEffect(()=>{
        fetchUser()
    },[]);
  return (
    <div class="flex flex-col h-screen">
    <NavBar/>
    <div className="flex-grow">
        <Outlet />
      </div>
    <Footer/>
    </div>
  )
}
