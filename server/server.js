const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {Users} = require('./utils/user');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT ||3000;
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {validString} = require('./utils/validation');
//console.log(publicPath);
var app=  express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

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
socket.on('join',(param,callback)=>{
	if(!validString(param.name) || !validString(param.room)){
		return callback('Name and Room are required');
	}

	socket.join(param.room);
	users.removeuser(socket.id);
	users.adduser(socket.id,param.name,param.room);

	io.to(param.room).emit('updateUserList',users.getuserlist(param.room));
	socket.emit('newMessage',generateMessage('Admin','Welcome !!!'));
	socket.broadcast.to(param.room).emit('newMessage',generateMessage('Admin',`${param.name} has joined !`));
	callback();
});


socket.on('createMessage',(newmsg,callback)=>{
		console.log('create msg',newmsg);
		io.emit('newMessage',generateMessage(newmsg.from,newmsg.text));
		callback();
		// socket.broadcast.emit('newMessage',{
		// 	from : newmsg.from,
		// 	text : newmsg.text,
		// 	createdAT : new Date().getTime()
		// });
	});
socket.on('createLocationMessage',(coords)=>{
	io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
})
socket.on('disconnect',()=>{
	//console.log('user was disconnected');
	var user = users.removeuser(socket.id);

	if(user)
	{
		io.to(user.room).emit('updateUserList',users.getuserlist(user.room));
		io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`));
	}
	});
});

server.listen(port,()=>{
 	console.log(`server is up on ${port}`);
 });