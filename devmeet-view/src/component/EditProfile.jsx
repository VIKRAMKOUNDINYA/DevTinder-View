import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
import { addUser } from '../utils/userSlice'
import { UserCard } from './UserCard'

export const EditProfile = () => {
    // const user=useSelector((store)=>store.user)
    const user=useSelector((store)=>store.user)
    console.log(user.firstName)
    const [firstName,setFirstName]=useState(user.firstName)
    const [about,setAbout]=useState(user.about)
    const [gender,setGender]=useState(user.gender)
    const [age,setAge]=useState(user.age)
    const [skills,setSkills]=useState(user.skills)
    const [photoUrl,setPhotoUrl]=useState(user.photoUrl)
    const dispatch=useDispatch()
    const [showToast,setShowToast]=useState(false)
    const [error,setError]=useState("")

    const handleSubmit=async ()=>{
        setError("")
        try{
        const res=await axios.post('http://localhost:8081/profile/edit',{
            firstName,about,gender,age,skills,photoUrl
        },{withCredentials:true})
        console.log(res.data.data)
        dispatch(addUser(res.data.data))
        setShowToast(true)
        setTimeout(()=>{
            setShowToast(false)
        },[2000])
    }
    catch(err){
        setError(err.response.data)
        setShowToast(true)
        setTimeout(()=>{
            setShowToast(false)
        },[2000])
        console.error(err)
    }
    }
  return (
    <div className='flex justify-center my-2 '>
<div className='flex justify-center mx-10'>
<div className="card w-96 bg-base-300 shadow-sm my-12 mx-auto">
  <div className="card-body">
    
    <div className="flex justify-between">
      <h2 className="text-3xl font-bold mx-auto">Login</h2>
    </div>
   
      <label className="form-control w-full max-w-xs my-2">
        <div>
            <span>
                First Name
            </span>
        </div>
            <input
            type="text"
            value={firstName}
            onChange={(e)=>setFirstName(e.target.value)}
            className="input input-bordered w-full max-w-xs"
            />
      </label>
      <label className="form-control w-full max-w-xs my-2">
        <div>
            <span>
                About
            </span> 
        </div>
            {/* <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={about}
            onChange={(e)=>setAbout(e.target.value)}
            /> */}
            <fieldset className="fieldset">
            <textarea className="textarea h-10" placeholder="Bio"  type="text" value={about}
            onChange={(e)=>setAbout(e.target.value)} ></textarea>
            <div className="fieldset-label">Optional</div>
            </fieldset>
      </label>

      <label className="form-control w-full max-w-xs my-2">
        <div>
            <span>
                Gender
            </span>
        </div>
            <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={gender}
            onChange={(e)=>setGender(e.target.value)}
            />
      </label>

      <label className="form-control w-full max-w-xs my-2">
        <div>
            <span>
                Age
            </span>
        </div>
            <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={age}
            onChange={(e)=>setAge(e.target.value)}
            />
      </label>

      <label className="form-control w-full max-w-xs my-2">
        <div>
            <span>
                Skills
            </span>
        </div>
            <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={skills}
            onChange={(e)=>setSkills(e.target.value)}
            />
      </label>

      <label className="form-control w-full max-w-xs my-2">
        <div>
            <span>
                Photo Url
            </span>
        </div>
            <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={photoUrl}
            onChange={(e)=>setPhotoUrl(e.target.value)}
            />
      </label>


   
    <div className="mt-6">

      <button className="btn btn-primary btn-block" onClick={handleSubmit}>Save Profile</button>
    </div>
  </div>
</div>
</div>
<UserCard data={{firstName,about,gender,age,skills,photoUrl}}/>
{showToast && (<div className="toast toast-top toast-center">
<div className={`alert ${error ? "alert-error" : "alert-success"}`}>
    <span>{error || "Profile Saved Successfully"}</span>
  </div>
  </div>) }
    </div>
  )
}
