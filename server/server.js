const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const {generateMessage} = require('./utils/message');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('New User Connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat app'));


    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user Joined'));

    socket.on('disconnect', ()=> {
        console.log("Client Disconnected");
    });

    socket.on('createMessage', (message)=> {
        console.log("New Message", message)
        io.emit('newMessage', generateMessage(message.from, message.text));
    });  
});


server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
}); 

