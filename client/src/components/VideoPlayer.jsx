import { Grid, Paper, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { SocketContext } from './SocketContext'

const videoPlayer = () => {
  const {myVideo,name,userVideo,callAccepted,callEnded, stream, call} = useContext(SocketContext)
  return (
    <Grid container style={{alignContent:'center'}}>
       {stream &&
      <Paper>
        <Grid item xs={12} md={6}>
          <Typography variant='h5' gutterBottom>{name || 'Name'}</Typography>
          <video playsInline muted ref={myVideo} autoPlay />
        </Grid>
      </Paper>
      }
      {callAccepted && !callEnded &&
      <Paper>
        <Grid item xs={12} md={6}>
          <Typography variant='h5' gutterBottom>{call.name || 'Name'}</Typography>
          <video playsInline muted ref={userVideo} autoPlay></video>
        </Grid>
      </Paper>}
    </Grid>
  )
}

export default videoPlayer