// https://yudhajitadhikary.medium.com/creating-chat-application-using-express-and-websockets-ed567339c4d5

//import express server module
var express = require('express');
//import socket.io
var socket = require('socket.io');

//App setup
//create an instance of express server
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

//server static files in public folder
app.use(express.static('public'));

//socket setup and pass server
var io = socket(server);

io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);

    //handle chat event
    socket.on('chat', function(data){
        //console.log(data);
        io.sockets.emit('chat', data);
    });

    //handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});
