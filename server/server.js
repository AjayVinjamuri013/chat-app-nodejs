const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT ||3000;
//console.log(publicPath);
var app=  express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection',(socket)=>{
	console.log('new user connection');


//socket.emit emits signal to a single connection.
//io.emit emits signal to every single connection.
// socket.emit('newMessage',{
// 	from : 'ajay',
// 	text:'ssup',
// 	createdAt : 123
// 	});
socket.emit('newMessage',{
	from : 'admin',
	text : 'welcome!!',
	createdAt : new Date().getTime()
});
socket.broadcast.emit('newMessage',{
	from:'admin',
	text : 'new user joined',
	createdAt : new Date().getTime()
});
socket.on('createMessage',(newmsg)=>{
		console.log('new msg',newmsg);
		io.emit('newMessage',{
			from : newmsg.from,
			text : newmsg.text,
			createdAT : new Date().getTime()
		});
		// socket.broadcast.emit('newMessage',{
		// 	from : newmsg.from,
		// 	text : newmsg.text,
		// 	createdAT : new Date().getTime()
		// });
	});
socket.on('disconnect',()=>{
	console.log('user was disconnected');
	});
});

server.listen(port,()=>{
 	console.log(`server is up on ${port}`);
 });