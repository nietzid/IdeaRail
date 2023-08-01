import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LeftAndRightLayout from './pages/layout/LeftAndRightLayout'
import Navbar from './pages/layout/Navbar'
import HomeLeft from './pages/home/HomeLeft'
import HomeRight from './pages/home/HomeRight'
import LoginLeft from './pages/login/LoginLeft'
import LoginRight from './pages/login/LoginRight'
import ResourceLeft from './pages/resources/ResourceLeft'
import ResourceRight from './pages/resources/ResourceRight'
import ProjectsLeft from './pages/projects/ProjectsLeft'
import ProjectsRight from './pages/projects/ProjectsRight'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
            <LeftAndRightLayout Navbar={()=> <Navbar/>} LeftLayout={() => <HomeLeft/>} RightLayout={() => <HomeRight/>}/>
        } />
        <Route path="/login" element={
            <LeftAndRightLayout Center={true} CenterLeft={true} CenterRight={true} Navbar={()=> <Navbar/>} LeftLayout={() => <LoginLeft/>} RightLayout={() => <LoginRight/>}/>
        } />
        <Route path="/resources" element={
            <LeftAndRightLayout HideMob={true} Center={false} Navbar={()=> <Navbar/>} LeftLayout={() => <ResourceLeft/>} RightLayout={() => <ResourceRight/>}/>
        } />
        <Route path="/projects" element={
            <LeftAndRightLayout HideMob={true} Center={true} CenterRight={true} Navbar={()=> <Navbar/>} LeftLayout={() => <ProjectsLeft/>} RightLayout={() => <ProjectsRight/>}/>
        } />
        <Route path="/projects/detail" element={
          <>
            <Navbar/>
            <ProjectsRight/>
          </>
        } />
      </Routes>
    </Router>
  )
}

export default App