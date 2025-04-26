import { useState } from 'react'
//import {Button} from "../src/components/ui/button.jsx"
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '@/components/context/ProtectedRoute'

import './App.css'
import AuthPage from './pages/AuthPage.jsx'
import Home from './pages/students/Home'
import Navbar from './components/students/Navbar'
import CourseList from './pages/students/CourseList'
import CourseDetails from './pages/students/CourseDetails'
import MyEnrollments from './pages/students/MyEnrollments'
import Player from './pages/students/Player'
import Loading from './components/students/Loading'

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/auth' element={<AuthPage/>} />
       <Route path='/' element={<Home/>}/>
       <Route path='/course-list' element={<CourseList/>}/>
       <Route path='/course-list/:input' element={<CourseList/>}/> {/*Different courses based on different input or catagory*/}

       <Route path='/course/:id' element={<CourseDetails/>}/>
       <Route path='/my-enrollments' element={
          <ProtectedRoute>
            <MyEnrollments />
          </ProtectedRoute>
        } />

       <Route path='/player/:courseId' element={
          <ProtectedRoute>
            <Player />
          </ProtectedRoute>
        } /> {/*Player plays different courses based on course id*/}
       <Route path='/loading/:path' element={<Loading/>}/>
    </Routes>
    </>
  )
}

export default App
