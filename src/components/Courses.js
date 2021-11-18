import React from 'react'
import {Link } from 'react-router-dom'
export default function Course() {
   
    return (
        <div>
            <h1>Course</h1>
            <li ><Link to = "/courses/work_energy/work1" className = "Course">Work1</Link></li>
            <li ><Link to = "/" className = "Course">Work2</Link></li>
            <li ><Link to = "/" className = "Course">Work3</Link></li>
            <li ><Link to = "/" className = "Course">Work4</Link></li>
        </div>
    )
}
