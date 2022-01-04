import React from 'react'
import Alert from '@mui/material/Alert';

export default function Dashboard() {
    
    return (
        <div>
            <div className='Dashboard'><h1>Dashboard</h1></div>
            <div className='Fragment-Container'>
                <div className='Fragment-name'>Work</div>
                <Alert variant="filled" severity="error">This is an error alert — check it out!</Alert>
            </div>
        </div>
    )
}
