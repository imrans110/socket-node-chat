var socket = io();
socket.on('connect', ()=> {
    console.log("Connected to server");
    // socket.emit('newMessage', {
    //     text: "How you doing mate",
    //     from : "Syed"
    // });
});

socket.on("newMessage", (message)=> {
    console.log('New Message', message);
});

socket.on('disconnect', ()=> {
    console.log("Disconnected from server");
});