import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';
import { SocketContext } from './SocketContext';
import { Assignment, ChildCare, Phone, PhoneDisabled } from '@material-ui/icons';

const Options = ({children}) => {
  const {name,setName,callAccepted,callEnded, stream, call,userId, leaveCall,callUser} = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');

  return (
    <Container>
      <Paper elevation={10}>
        <form noValidate autoComplete='off'>
            <Grid container style={{'margin': '10px','padding':'3px'}}>
              <Grid item xs={12} md={6}  style={{padding: '10px',width:'70%'}}>
                <Box style={{padding: '10px',width:'70%'}}>
                <Typography variant='h6' gutterBottom>
                  Account Info
                </Typography>
                <TextField label='Name' value={name} onChange={(e)=>setName(e.target.value)} fullWidth></TextField>
                <CopyToClipboard text={userId}>
                    <Button variant='contained' fullWidth startIcon={<Assignment fontSize='large'/>} color='primary' > Copy your ID</Button>
                </CopyToClipboard>
                </Box>
                </Grid>

                <Grid item xs={12} md={6} style={{padding: '10px',width:'70%'}}>
                <Box style={{padding: '10px',width:'70%'}}>
                <Typography variant='h6' gutterBottom>
                  Make a Call
                </Typography>
                <TextField label='ID to Call' value={idToCall} onChange={(e)=>setIdToCall(e.target.value)} fullWidth></TextField>
                { callAccepted && !callEnded ?(
                    <Button variant='contained' color='secondary' startIcon={<PhoneDisabled fontSize='large'/>} fullWidth onClick={()=>leaveCall()}>Hang Up</Button>
                ):(
                  <Button variant='contained' color='primary' startIcon={<Phone fontSize='large'/>} fullWidth onClick={()=>callUser(idToCall)}>Call</Button>
                )}
                </Box>
                </Grid>
            </Grid>

        </form>
        {children}
      </Paper>
    </Container>
  )
}

export default Options