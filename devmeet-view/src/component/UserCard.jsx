import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';
import axios from 'axios';
export const UserCard = ({data}) => {
    // const {data}=feed
    console.log(data);
    const requests = useSelector((store) => store.requests)
    const dispatch = useDispatch()

    const handleSendRequest = async (status,userId) => {
        try {
            const res = await axios.post('http://localhost:8081/request/send/'+status+"/"+userId,{},{ withCredentials: true })
            console.log(res)
            dispatch(removeFeed(userId))
        } catch (err) {
            console.log(err)
        }
    }

    console.log(requests)
    useEffect(() => {
      handleSendRequest()
    }, [])
    const {_id,firstName,lastName,photoUrl,about,age,gender}=data
  return (
    <div className="card w-96 bg-base-300 shadow-sm my-12">
  <figure>
    <img
      src={photoUrl}
      alt="User" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName} {lastName}</h2>
    <h2>{age} {gender}</h2>
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-secondary" onClick={()=>handleSendRequest('ignored',_id)}>Ignore</button>
      <button className="btn btn-primary" onClick={()=>handleSendRequest('interested',_id)}>Interested</button>
    </div>
  </div>
</div>
  )
}
