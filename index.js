
const express = require('express');
const { createServer } = require('node:http');
const { Server, Socket } = require('socket.io');

const app = express();
const server = createServer(app);

const io =  new Server(server,{
  cors: {
    origin: "*",
    methods: ['GET','POST']
  }
})

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('<h1>Server running...</h1>');
});

io.on('connection', (socket)=>{
    socket.emit('user1', socket.id);

    socket.on('disconnect', ()=>{
      socket.broadcast.emit('call ended');
    })

    socket.on('callUser',({userToCall, signalData, from, name})=>{
        io.to(userToCall).emit('callUser',{signal: signalData,from,name});
    })

    socket.on('answerCall',(data)=>{
      console.log("Data: "+JSON.stringify(data))
      console.log("To: "+data.to)
      io.to(data.to).emit('callAccepted', data.signal);
    })
})  

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});