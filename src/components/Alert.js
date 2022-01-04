import React from 'react'
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'


export default function MessageAlert(props) {
    const [open, setOpen] = React.useState(true);

    if (props === 'Correct')
    return (
        <div className = "MessageAlert" > 
            <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
          variant="filled" severity="success"
        >
          This is a success alert — check it out!
        </Alert>
      </Collapse>
        </div>
    )
   else if (props === 'Incorrect')
    return (
        <div className = "MessageAlert" > 
        <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
          variant="filled" severity="error"
        >
          This is a success alert — check it out!
        </Alert>
      </Collapse>
        </div>
    )
    else{return(<div style={{visibility: "hidden" }}>
      
    </div>)}
}