import React,{useState} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'

export const Login = () => {

    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [emailId,setEmailId]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState('')
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [isLoginForm,setIsLoginForm]=useState(false)

    const handleSignUP=async()=>{
      try{
        const res=await axios.post('http://localhost:8081/signup',{
          firstName,
          lastName,
          emailId,
          password
      },
      {withCredentials:true}
  );
  dispatch(addUser(res.data.data));
  return navigate('/profile');
      }
      catch(err){
        console.log(err)
      }
    }

    const handleLogin=async()=>{
        try{
        const res=await axios.post('http://localhost:8081/login',{
            emailId,
            password
        },
        {withCredentials:true}
    );
    dispatch(addUser(res.data));
    return navigate('/');
    }
    catch(err){
        setError(err.response.data || 'Something went wrong')
        console.error(err)
    }
     
    }

  return (
    <div className="card w-96 bg-base-300 shadow-sm my-12 mx-auto">
  <div className="card-body">
    
    <div className="flex justify-between">
      <h2 className="text-3xl font-bold mx-auto">{isLoginForm?"Login":"Sign Up"}</h2>
    </div>
    {!isLoginForm && (
      <>
    <label className="form-control w-full max-w-xs my-2">
        <div>
            <span>
                FirstName
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
                LastName
            </span>
        </div>
            <input
            type="text"
            value={lastName}
            onChange={(e)=>setLastName(e.target.value)}
            className="input input-bordered w-full max-w-xs"
            />
      </label>
      </>
    )
    }
      <label className="form-control w-full max-w-xs my-2">
        <div>
            <span>
                Email
            </span>
        </div>
            <input
            type="text"
            value={emailId}
            onChange={(e)=>setEmailId(e.target.value)}
            className="input input-bordered w-full max-w-xs"
            />
      </label>
      <label className="form-control w-full max-w-xs my-2">
        <div>
            <span>
                Password
            </span>
        </div>
            <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
      </label>
   
    <div className="mt-6">
      <h2 className='text-red-500'>{error}</h2>
      <button className="btn btn-primary btn-block" onClick={isLoginForm? handleLogin:handleSignUP}>{isLoginForm ? "Login":"Sign Up"}</button>
    </div>
    <p className='m-auto cursor-pointer py-2' onClick={()=>setIsLoginForm((val)=>!val)}>
      {
        isLoginForm ? "New User? SignUp Here":
        "Existing User ? Login Here"
      }
    </p>
  </div>
</div>
  )
}
