//by calling io method,we are initiating the request	
	var socket=io();
	socket.on('connect',function(){
		console.log('connected to server');

	// socket.emit('createMessage',{
	// 	from : 'akash',
	// 	text : 'hello'
	// });
	});
	socket.on('disconnect',function(){
		console.log('disconnected from server');
	});

	socket.on('newMessage',function (msg) {
		// body...
		console.log('new message',msg);
		var li = jQuery('<li></li>');
		li.text(`${msg.from} : ${msg.text}`);
		jQuery('#messages').append(li);
	});


	jQuery('#message-form').on('submit',function (argument) {
	argument.preventDefault();

	socket.emit('createMessage',{
		from : "User",
		text : jQuery('[name=message]').val()
	},function (){

	});
	});