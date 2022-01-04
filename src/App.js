//Import React 
import react, { Component , useState , useEffect } from 'react';
import {Route , Switch, Link } from 'react-router-dom'

//Import Firebase-React Hook
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

//Import Firebase SDK
import { AuthProvider, firebaseApp } from 'Firebase';

//Import Component
import Homepage from './components/Homepage';
import Courses from './components/Courses'
import Dashboard from './components/Dashboard';
import AboutUs from './components/AboutUs';
import Header from './components/Header'
import MessageAlert from './components/Alert'

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
import ExamWork from './components/Courses/Work&Energy/ExamWork'

import PhysicEngTest from './components/Courses/Work&Energy/PhysicEngTest'

//Import CSS
import './components/Header.css'
import './components/Courses.css'
import './components/CoursesPage.css'

function App() {
    return (
      <AuthProvider>
      <div className = "Container">

      <div >
        <MessageAlert/>
        </div>

        <div className = "Header"> 
        <Header/>
        </div>
  
        <div className = "Page">
          <Switch>
          {/* Main Page*/}
          <Route exact path="/"  ><Homepage/></Route>
          <Route exact path="/dashboard"  ><Dashboard/></Route>
          <Route exact path="/courses"  ><Courses/></Route>
          <Route exact path="/about_us"  ><AboutUs/></Route>
          
          {/* Courses*/}
          <Route exact path="/courses/work_energy/work1"  ><Work1/></Route>
          <Route exact path="/courses/work_energy/work2"  ><Work2/></Route>
          <Route exact path="/courses/work_energy/work3"  ><Work3/></Route>
          <Route exact path="/courses/work_energy/work4"  ><Work4/></Route>
          <Route exact path="/courses/work_energy/power1"  ><Power1/></Route>
          <Route exact path="/courses/work_energy/power2"  ><Power2/></Route>
          <Route exact path="/courses/work_energy/kineticenergy"  ><KineticEnergy/></Route>
          <Route exact path="/courses/work_energy/potentialenergy1"  ><PotentialEnergy1/></Route>
          <Route exact path="/courses/work_energy/potentialenergy2"  ><PotentialEnergy2/></Route>
          <Route exact path="/courses/work_energy/exam_work"  ><ExamWork/></Route>
          <Route exact path="/courses/work_energy/physic_eng"  ><PhysicEngTest/></Route>

          {/* Playgrounds*/}
  
          {/* About Us*/}
  
          <Route path = "/:id"  ><h1>Error 404 Webpage not found</h1></Route>
          </Switch>
        </div>
        
      </div>
      </AuthProvider>
    )
  }
  
  export default App;