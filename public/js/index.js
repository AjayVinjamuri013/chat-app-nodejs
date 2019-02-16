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

	socket.on('newLocationMessage',function(msg){
		var li = jQuery('<li></li>');
		var a =jQuery('<a target = _blank">My current Location</a>');
		li.text(`${msg.from}: `);
		a.attr('href',msg.url);
		li.append(a);
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

	var location1=jQuery('#send-location');
	location1.on('click',function () {
		if (!navigator.geolocation) {
			return alert('not supported by your browser.');
		}
		navigator.geolocation.getCurrentPosition(function(position){
			socket.emit('createLocationMessage',{
				latitude : position.coords.latitude,
				longitude : position.coords.longitude
			});
			//console.log(position);
		},function(){
			alert('unable to fetch location');
		});
	});