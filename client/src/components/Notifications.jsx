import { Button } from '@material-ui/core'
import React, { useContext } from 'react'
import { SocketContext } from './SocketContext'

const Notifications = () => {
  const {call,answerCall,callAccepted} = useContext(SocketContext)
  return (
    <>{
      call.isReceivedCall && !callAccepted && (
        <div style={{display:'flex', justifyContent:'center'}}>
          <h1>{call.name} is calling</h1>
          <Button variant='contained' color='primary' onClick={answerCall}>Answer</Button>
        </div>
      )
    }
    
    </>
  )
}

export default Notifications