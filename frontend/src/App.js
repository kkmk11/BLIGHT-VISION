import React,{useEffect,useState} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Intro from './components/Intro'
import { auth } from './components/Firebase'


const App = () => {
  const [presentUser,setPresentUser]=useState(null);
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
      setPresentUser({
        uid:user.uid,
        email:user.email
      })
    }
    else{
        setPresentUser(null);
    }
  })
  },[])
  return (
    <div>
      <Router>
        <Routes>
        <Route path='/' element={<Intro/>}/>
        <Route  path='/signup' element={<Signup/>}/>
        <Route  path='/login' element={<Login/>}/>
        <Route path='/home' element={presentUser ? (<Home presentUser={presentUser}/>) : <Login/> }/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
