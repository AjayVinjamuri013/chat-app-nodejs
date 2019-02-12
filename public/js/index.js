//by calling io method,we are initiating the request	
	var socket=io();
	socket.on('connect',function(){
		console.log('connected to server');

	socket.emit('createMessage',{
		from : 'akash',
		text : 'hello'
	});
	});
	socket.on('disconnect',function(){
		console.log('disconnected from server');
	});

	socket.on('newMessage',function (msg) {
		// body...
		console.log('new message',msg);
	});