import React,{useEffect} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import { UserCard } from './UserCard'
import { BASE_URL } from '../utils/constants'


export const Feed = () => {
    const dispatch=useDispatch()
    const feed=useSelector((store)=>store.feed)
    console.log(feed)
    const getFeed=async ()=>{
        const res=await axios.get(BASE_URL+'/feed',{withCredentials:true})
        console.log(res.data)
        dispatch(addFeed(res.data))
    }
    
    useEffect(()=>{
       getFeed()
    },[])
    if(!feed) return;
    if(feed.length <=0){
      return <h1 className='flex justify-center my-10'>No new Users in the feed!</h1>
    }
  return (
    <div className='flex justify-center item my-10'>
      {feed.length > 0 && <UserCard data={feed[0]} />}
    </div>

  )
}
