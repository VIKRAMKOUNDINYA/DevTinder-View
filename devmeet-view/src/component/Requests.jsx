import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
import { addRequests, removeRequest } from '../utils/requestSlice'
import { BASE_URL } from '../utils/constants'

export const Requests = () => {

    const requests = useSelector((store) => store.requests)
    const dispatch = useDispatch()

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL+'/user/requests/received',{ withCredentials: true })
            console.log(res)
            dispatch(addRequests(res.data.data))
        } catch (err) {
            console.log(err)
        }
    }

    console.log(requests)
    useEffect(() => {
        fetchRequests()
    }, [])

    const reviewRequest=async (status,_id)=>{
        try{
            const res = await axios.post(BASE_URL+'/request/review/'+status+"/"+_id,{},{ withCredentials: true})
            dispatch(removeRequest(_id))
        }
        catch(err){
            console.log(err)
        }
    }

    if (!requests || requests.length === 0) return <h1 className="text-center text-2xl text-white my-10">No Requests Found</h1>
    
  return (
    <div className="text-center my-10">
            <h1 className="font-bold text-white text-3xl mb-6">Requests</h1>
            <div className="flex flex-col items-center gap-6">
                {requests.map((request, index) => {
                    const { firstName, lastName, photoUrl, age, gender, about } = request.fromUserId
                    return (
                        <div key={index} className="flex justify-between items-center bg-base-300 border rounded-lg shadow-lg p-5 w-full max-w-2xl">
                            {/* Profile Picture */}
                            <img alt="profile" className="w-20 h-20 rounded-full object-cover" src={photoUrl} />
                            
                            {/* User Info */}
                            <div className="flex-col ml-5 text-left">
                                <h2 className="font-bold text-xl text-white">{firstName} {lastName}</h2>
                                <p className="text-gray-400">{age} | {gender}</p>
                                <p className="mt-2 text-gray-300">{about}</p>
                            </div>
                            <div className="card-actions  my-4 ">
                            <button className="btn btn-secondary" onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
                            <button className="btn btn-primary" onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
  )
}
