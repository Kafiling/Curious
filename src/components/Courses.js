import React from 'react'
import {Link } from 'react-router-dom'
export default function Course() {
   
    return (
        <div>
            <h1>Course</h1>
            <li ><Link to = "/courses/work_energy/work1" className = "Course">Work1</Link></li>
            <li ><Link to = "/courses/work_energy/work2" className = "Course">Work2</Link></li>
            <li ><Link to = "/courses/work_energy/work3" className = "Course">Work3</Link></li>
            <li ><Link to = "/courses/work_energy/work4" className = "Course">Work4</Link></li>
            <li ><Link to = "/courses/work_energy/power1" className = "Course">Power1</Link></li>
            <li ><Link to = "/courses/work_energy/power2" className = "Course">Power2</Link></li>
            <li ><Link to = "/courses/work_energy/kineticenergy" className = "Course">Kinetic Energy</Link></li>
            <li ><Link to = "/courses/work_energy/potentialenergy1" className = "Course">Potential Energy 1</Link></li>
            <li ><Link to = "/courses/work_energy/potentialenergy2" className = "Course">Potential Energy 2</Link></li>
            <li ><Link to = "/courses/work_energy/lawofconservationofenergy1" className = "Course">Law of conservation of energy 1</Link></li>
            <li ><Link to = "/courses/work_energy/lawofconservationofenergy2" className = "Course">Law of conservation of energy 2</Link></li>
            <li ><Link to = "/" className = "Course">Activties : Work</Link></li>
            <li ><Link to = "/courses/work_energy/exam_work" className = "Course">Exam : Work</Link></li>
            <li ><Link to = "/courses/work_energy/physic_eng" className = "Course">Test: PhysicEngTest</Link></li>
        </div>
    )
}
