import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';
import axios from 'axios';
import { addConnections } from '../utils/connectionSlice';
import { BASE_URL } from '../utils/constants';

export const NavBar = () => {
    const user=useSelector((store)=>store.user);
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleLogOut=async ()=>{
      try{
      await axios.post(BASE_URL+'/logout',{},{withCredentials:true})
      dispatch(removeUser())
      return navigate('/login')
      }
      catch(err){
        console.log(err)
      }

    }
  return (
    <div className="navbar bg-base-300">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">🤝DevMeet</Link>
  </div>
  {user && <div className="flex-none gap-2">
    <div className='form-control' >Welcome,{user.firstName}</div>
    <div className="dropdown dropdown-end mx-5 flex">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user photo"
            src={user.photoUrl}/>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li>
          <Link to="/connections" className="justify-between">
            Connections
          </Link>
        </li>
        <li>
          <Link to="/requests" className="justify-between">
            Requests
          </Link>
        </li>
        <li><a onClick={handleLogOut}>Logout</a></li>
      </ul>
    </div>
  </div>}
</div>
  )
}
