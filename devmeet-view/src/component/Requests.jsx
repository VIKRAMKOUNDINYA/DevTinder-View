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
            <div className="card flex-col items-center gap-[25px] mx-24">
                {requests.map((request, index) => {
                    const { firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
                    return (
                        <div 
                            key={index} 
                            className="bg-base-300 flex flex-row gap-[50px]  justify-items-end items-center  mx-auto py-12 px-6 w-[500px] h-[200px] lg:w-[1000px] lg:h-[500px]"
                        >
                            {/* Profile Picture */}
                            <div className="flex-shrink-0">
                                <img 
                                    alt="avatar" 
                                    className=" rounded-full " 
                                    src={photoUrl} 
                                    style={{ width: "80px", height: "80px" }}
                                />
                            </div>
    
                            {/* User Info */}
                            <div className="flex-1 text-left">
                                <h2 className="font-bold text-xl text-white">{firstName} {lastName}</h2>
                                <p className="text-gray-400">{age} | {gender}</p>
                                <p className="mt-1 text-gray-300 text-sm">{about}</p>
                            </div>
    
                            {/* Buttons */}
                            <div className='grid justify-items-center'>
                            <div className="inline-flex flex-col gap-[25px] ">
                                <button className="btn btn-secondary btn-sm w-full my-10px" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                                <button className="btn btn-primary btn-sm w-full" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                            </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
    
}
