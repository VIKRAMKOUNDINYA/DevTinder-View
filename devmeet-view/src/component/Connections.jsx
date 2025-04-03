import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
import { BASE_URL } from '../utils/constants'
import { Link } from 'react-router-dom'

export const Connections = () => {
    const connections = useSelector((store) => store.connections)
    const dispatch = useDispatch()

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL+'/user/connections', { withCredentials: true })
            console.log(res)
            dispatch(addConnections(res.data.data))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchConnections()
    }, [])

    console.log(connections)

    if (!connections || connections.length === 0) return <h1 className="text-center text-2xl text-white my-10">No Connections Found</h1>

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-white text-3xl">Connections</h1>
            <div className="card flex-col items-center gap-[25px] mx-24">
                {connections.map((connection) => {
                    const {_id, firstName, lastName, photoUrl, age, gender, about } = connection
                    return (
                        <div key={_id} className="bg-base-300 flex flex-row gap-[50px]  justify-items-end items-center  mx-auto py-12 px-6 w-[500px] h-[200px] lg:w-[1000px] lg:h-[500px]">
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
                                {age && gender && <p className="text-gray-400">{age} | {gender}</p>}
                                <p className="mt-1 text-gray-300 text-sm">{about}</p>

                            </div>
                            <Link to={"/chat/"+_id}> <button className='btn btn-primary'>Chat</button></Link>
                        </div>
                    )
                })}
            </div>  
        </div>
    )
}
