import React from 'react'
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Sound from 'react-sound';


export function CorrectAlert() {
    const [open, setOpen] = React.useState(true);
    setTimeout(() => { setOpen(false);},3000)
    return (
        <div className = "MessageAlert" > 
      {open? <Sound
      url="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Correct.mp3?alt=media&token=f00a3ca4-2cb7-4892-a802-2b0e0ba46b1c"
      playStatus={Sound.status.PLAYING}
    /> : null}
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

export function IncorrectAlert() {
  const [open, setOpen] = React.useState(true);
  setTimeout(() => { setOpen(false);},3000)
  return (
    
        <div className = "MessageAlert" > 
        {open? <Sound
      url="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Incorrect.mp3?alt=media&token=29e2afc2-f037-42b3-8d4d-c8b9b0316dae"
      playStatus={Sound.status.PLAYING}
    /> : null}
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
  export function UpvoteAlert() {
    const [open, setOpen] = React.useState(true);
    setTimeout(() => { setOpen(false);},3000)
    return (
        <div className = "MessageAlert" > 
        {open? <Sound
      url="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Correct.mp3?alt=media&token=f00a3ca4-2cb7-4892-a802-2b0e0ba46b1c"
      playStatus={Sound.status.PLAYING}
    /> : null}
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
          Upvoted! Thanks for your feedback. 
        </Alert>
      </Collapse>
        </div>
    )
}

  export function ReportAlert() {
    const [open, setOpen] = React.useState(true);
    setTimeout(() => { setOpen(false);},3000)
    return (
      
          <div className = "MessageAlert" > 
           {open? <Sound
      url="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Incorrect.mp3?alt=media&token=29e2afc2-f037-42b3-8d4d-c8b9b0316dae"
      playStatus={Sound.status.PLAYING}
    /> : null}
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
            Reported, We apologise for any inconvenience caused.
          </Alert>
        </Collapse>
          </div>
      )
          
    }

