import React,{useEffect,useRef,createContext} from 'react'
import {useState} from 'react';
import { io } from 'socket.io-client'
import Peer from 'simple-peer'


const SocketContext = createContext();

const ContextProvider = ({children})=>{

const socket = io('http://localhost:5000');

const [stream, setStream] = useState(null);
const [userId, setUserId] = useState('')
const [call, setCall] = useState({})
const [callAccepted, setCallAccepted] = useState(false)
const [callEnded, setCallEnded] = useState(false)
const [name, setName] = useState('')


const myVideo = useRef();
const userVideo = useRef();
const connectionRef = useRef();

  useEffect(()=>{
    navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((currentStream)=>{
      setStream(currentStream);
      myVideo.current.srcObject = currentStream;
    });
    socket.on('user1',(id)=>{
      setUserId(id);
    });

    socket.on('callUser',({from, name: callerName, signal})=>{
      console.log(' Call USer from socket: '+ from + ",signal: "+signal)
      setCall({isReceivedCall: true, from, name: callerName, signal})
    });
    // socket.on('callAccepted', (signal)=>{
    //   setCallAccepted(true);
    //   console.log('Call Accepted');
    //   connectionRef.current.signal(signal);
    // });

  },[])
  const answerCall = ()=>{
    setCallAccepted(true);
    const peer = new Peer({initiator:false, trickle: false, stream});
    
    peer.on('signal',(data)=>{
      console.log("Answering call..."+JSON.stringify(data));
      socket.emit('answerCall', {signal: data, to: call.from})
    });

    peer.on('stream',(currentStream)=>{
      userVideo.current.srcObject=currentStream
    })

    peer.signal(call.signal);

    connectionRef.current = peer;
  }
  const callUser = (id)=>{
    console.log("Call user id: "+ id);
    const peer = new Peer({initiator:true, trickle: false, stream});

    peer.on('signal',(data)=>{
      socket.emit('callUser', {userToCall: id, signalData: data , from: userId, name})
    });

    peer.on('stream',(currentStream)=>{
      userVideo.current.srcObject=currentStream
    });
    socket.on('callAccepted', (signal)=>{
      setCallAccepted(true);
      console.log('Call Accepted');
      peer.signal(signal);
    });
    connectionRef.current = peer;
  }
  const leaveCall = ()=>{
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  }

  return (
    <SocketContext.Provider value={
      {call,callAccepted,userId,myVideo,userVideo,stream,name,setName,callEnded,callUser,leaveCall,answerCall}}>
        {children}
      </SocketContext.Provider>
  )
}

export {ContextProvider, SocketContext };