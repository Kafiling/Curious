import React from 'react'
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'


export function SuccessAlert() {
    const [open, setOpen] = React.useState(true);
    setTimeout(() => { setOpen(false);},3000)
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
          sx={{ mb: 2, backgroundColor: '#32C35B',}}
          variant="filled" severity="success"
        >
          That's correct! 
        </Alert>
      </Collapse>
        </div>
    )
}

export function ErrorAlert() {
  const [open, setOpen] = React.useState(true);
  setTimeout(() => { setOpen(false);},3000)
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
          sx={{ mb: 2 , backgroundColor: '#FF0035',}}
          variant="filled" severity="error"
        >
          That's incorrect
        </Alert>
      </Collapse>
        </div>
    )
        
  }


