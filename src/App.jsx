import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LeftAndRightLayout from './pages/layout/LeftAndRightLayout'
import Navbar from './components/Navbar'
import LoginLeft from './pages/login/LoginLeft'
import LoginRight from './pages/login/LoginRight'
import ProjectsRight from './pages/projects/ProjectsRight'
import SprintOne from './pages/sprintone/SprintOne'
import SprintTwo from './pages/sprinttwo/SprintTwo'
import SprintThree from './pages/sprintthree/SprintThree'
import SprintFour from './pages/sprintfour/SprintFour'
import SprintFive from './pages/sprintfive/SprintFive'
import SprintSix from './pages/sprintsix/SprintSix'
import RegisterRight from './pages/register/RegisterRight'
import PrivateRoutes from './components/PrivateRoutes'
import ProjectsLayout from './pages/projects/ProjectsLayout'
import Home from './pages/home/Home'
import ResourceLayout from './pages/resources/ResourceLayout'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
            <LeftAndRightLayout Center={true} CenterLeft={true} CenterRight={true} Navbar={()=> <Navbar/>} LeftLayout={() => <LoginLeft/>} RightLayout={() => <LoginRight/>}/>
        } />
        <Route path="/register" element={
            <LeftAndRightLayout Center={true} CenterLeft={true} CenterRight={true} Navbar={()=> <Navbar/>} LeftLayout={() => <LoginLeft/>} RightLayout={() => <RegisterRight/>}/>
        } />


        <Route element={<PrivateRoutes/>}>
          <Route path="/" element={
              <Home/>
              } />
          <Route path="/resources" element={
              <ResourceLayout HideMob={true} Center={false} Navbar={()=> <Navbar/>}/>
          } />
          <Route path="/projects" element={
              <ProjectsLayout HideMob={true} Center={true} CenterRight={false} Navbar={()=> <Navbar/>}/>
          } />
          <Route path="/projects/detail" element={
            <>
              <Navbar/>
              <ProjectsRight/>
            </>
          } />
          <Route path="/sprint-one" element={
            <>
              <Navbar/>
              <SprintOne/>
            </>
          } />
          <Route path="/sprint-two" element={
            <>
              <Navbar/>
              <SprintTwo/>
            </>
          } />
          <Route path="/sprint-three" element={
            <>
              <Navbar/>
              <SprintThree/>
            </>
          } />
          <Route path="/sprint-four" element={
            <>
              <Navbar/>
              <SprintFour/>
            </>
          } />
          <Route path="/sprint-five" element={
            <>
              <Navbar/>
              <SprintFive/>
            </>
          } />
          <Route path="/sprint-six" element={
            <>
              <Navbar/>
              <SprintSix/>
            </>
          } />
        </Route>
        
      </Routes>
    </Router>
  )
}

export default App
