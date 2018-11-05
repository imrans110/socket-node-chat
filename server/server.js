const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const {generateMessage, generateLocationMessage} = require('./utils/message');
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

    socket.on('createMessage', (message, callback)=> {
        console.log("createMessage", message)
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from server');
    });
    
    socket.on('createLocationMessage', (coords) =>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords));
    });
});


server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
}); 

