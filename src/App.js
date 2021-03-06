//Import React 
import react, { Component , useState , useEffect } from 'react';
import {Route , Switch, Link } from 'react-router-dom'

//Import Firebase-React Hook
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

//Import Firebase SDK
import { AuthProvider, firebaseApp, auth } from 'Firebase';

//Import Component
import Homepage from './components/Homepage';
import Analytics from './components/Analytics';
import Courses from './components/Courses'
import Dashboard from './components/Dashboard';
import AboutUs from './components/AboutUs';
import Header from './components/Header'
import MoblieError from './components/MoblieError'
import {SuccessAlert,ErrorAlert} from './components/Courses/Work&Energy/Alert'

//Import Courses Component
import Work1 from './components/Courses/Work&Energy/Work1'
import Work2 from './components/Courses/Work&Energy/Work2'
import Work3 from './components/Courses/Work&Energy/Work3'
import Work4 from './components/Courses/Work&Energy/Work4'
import Power1 from './components/Courses/Work&Energy/Power1'
import Power2 from './components/Courses/Work&Energy/Power2'
import KineticEnergy from './components/Courses/Work&Energy/KineticEnergy'
import PotentialEnergy1 from './components/Courses/Work&Energy/PotentialEnergy1'
import PotentialEnergy2 from './components/Courses/Work&Energy/PotentialEnergy2'
import Lawofconservationofenergy1 from './components/Courses/Work&Energy/Lawofconservationofenergy1'
import Lawofconservationofenergy2 from './components/Courses/Work&Energy/Lawofconservationofenergy2'
import ExamWork from './components/Courses/Work&Energy/ExamWork'
import FinalExam from './components/Courses/Work&Energy/FinalExam'

import PhysicEngTest from './components/Courses/Work&Energy/PhysicEngTest'

//Import CSS
import './components/Header.css'
import './components/Courses.css'
import './components/CoursesPage.css'

function App() {

    return (
      <AuthProvider>
      <div className = "Container">

     

        <div className = "Header"> 
        <Header/>
        </div>
        <div className = "Page">
          <Switch>
          {/* Main Page*/}
          <Route exact path="/"  ><Homepage/></Route>
          <Route exact path="/v1.0/dashboard"  ><Dashboard/></Route>
          <Route exact path="/v1.0/courses"  ><Dashboard/></Route>
          <Route exact path="/v1.0/analytics"  ><Analytics/></Route>
          <Route exact path="/v1.0/about_us"  ><AboutUs/></Route>
          <Route exact path="/v1.0/moblie_error"  ><MoblieError/></Route>
          {/* Courses*/}
          <Route exact path="/v1.0/courses/work_energy/work1"  ><Work1/></Route>
          <Route exact path="/v1.0/courses/work_energy/work2"  ><Work2/></Route>
          <Route exact path="/v1.0/courses/work_energy/work3"  ><Work3/></Route>
          <Route exact path="/v1.0/courses/work_energy/work4"  ><Work4/></Route>
          <Route exact path="/v1.0/courses/work_energy/power1"  ><Power1/></Route>
          <Route exact path="/v1.0/courses/work_energy/power2"  ><Power2/></Route>
          <Route exact path="/v1.0/courses/work_energy/kineticenergy"  ><KineticEnergy/></Route>
          <Route exact path="/v1.0/courses/work_energy/potentialenergy1"  ><PotentialEnergy1/></Route>
          <Route exact path="/v1.0/courses/work_energy/potentialenergy2"  ><PotentialEnergy2/></Route>
          <Route exact path="/v1.0/courses/work_energy/lawofconservationofenergy1"  ><Lawofconservationofenergy1/></Route>
          <Route exact path="/v1.0/courses/work_energy/lawofconservationofenergy2"  ><Lawofconservationofenergy2/></Route>
          <Route exact path="/v1.0/courses/work_energy/exam_work"  ><ExamWork/></Route>
          <Route exact path="/v1.0/courses/work_energy/final_exam"  ><FinalExam/></Route>
          <Route exact path="/v1.0/courses/work_energy/physic_eng"  ><PhysicEngTest/></Route>

          {/* Playgrounds*/}
  
          {/* About Us*/}
  
          <Route path = "/v1.0/:id"  ><h1>Error 404 Webpage not found</h1></Route>
          </Switch>
        </div>
        
      </div>
      </AuthProvider>
    )
  }
  
  export default App;