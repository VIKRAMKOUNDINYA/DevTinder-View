import { useState } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { Body } from './component/Body'
import { NavBar } from './component/NavBar'
import { Login } from './component/Login'
import { Profile } from './component/Profile'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import { Feed } from './component/Feed'
import { Connections } from './component/Connections'
import { Requests } from './component/Requests'
import Chat from './component/Chat'
function App() {

  return (
    <Provider store={appStore}>
    <BrowserRouter basename='/'>
    <Routes>
      <Route path='/' element={<Body/>}>
      <Route path='/' element={<Feed/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/connections' element={<Connections/>}/>
      <Route path='/requests' element={<Requests/>}/>
      <Route path="/chat/:targetUserId" element={<Chat />} />
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
