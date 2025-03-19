import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

export const Connections = () => {
    const connections = useSelector((store) => store.connections)
    const dispatch = useDispatch()

    const fetchConnections = async () => {
        try {
            const res = await axios.get('http://localhost:8081/user/connections', { withCredentials: true })
            console.log(res)
            dispatch(addConnections(res.data.data))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchConnections()
    }, [])

    if (!connections || connections.length === 0) return <h1 className="text-center text-2xl text-white my-10">No Connections Found</h1>

    return (
        <div className="text-center my-10">
            <h1 className="font-bold text-white text-3xl mb-6">Connections</h1>
            <div className="flex flex-col items-center gap-6">
                {connections.map((connection, index) => {
                    const { firstName, lastName, photoUrl, age, gender, about } = connection
                    return (
                        <div key={index} className="flex items-center bg-base-300 border rounded-lg shadow-lg p-5 w-full max-w-2xl">
                            {/* Profile Picture */}
                            <img alt="profile" className="w-20 h-20 rounded-full object-cover" src={photoUrl} />
                            
                            {/* User Info */}
                            <div className="flex-col ml-5 text-left">
                                <h2 className="font-bold text-xl text-white">{firstName} {lastName}</h2>
                                <p className="text-gray-400">{age} | {gender}</p>
                                <p className="mt-2 text-gray-300">{about}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
