import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LeftAndRightLayout from './pages/layout/LeftAndRightLayout'
import Navbar from './pages/layout/Navbar'
import HomeLeft from './pages/home/HomeLeft'
import HomeRight from './pages/home/HomeRight'
import LoginLeft from './pages/login/LoginLeft'
import LoginRight from './pages/login/LoginRight'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <LeftAndRightLayout  Navbar={()=> <Navbar/>} LeftLayout={() => <HomeLeft/>} RightLayout={() => <HomeRight/>}/>
          </>
        } />
        <Route path="/login" element={
          <>
            <LeftAndRightLayout  Navbar={()=> <Navbar/>} LeftLayout={() => <LoginLeft/>} RightLayout={() => <LoginRight/>}/>
          </>
        } />
      </Routes>
    </Router>
  )
}

export default App
