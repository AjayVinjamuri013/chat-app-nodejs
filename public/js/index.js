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
		var template = jQuery('#message-template').html();
		 var formattedTime = moment(msg.createdAt).format('h:mm a');
		var html = Mustache.render(template,{
			text:msg.text,
			from : msg.from,
			createdAt : formattedTime
		});

		jQuery('#messages').append(html);
		
		// //console.log('new message',msg);
		// var li = jQuery('<li></li>');
		// li.text(`${msg.from} ${formattedTime}: ${msg.text}`);
		// jQuery('#messages').append(li);
	});

	socket.on('newLocationMessage',function(msg){
		
		var template = jQuery('#location-message-template').html();
		 var formattedTime = moment(msg.createdAt).format('h:mm a');
		var html = Mustache.render(template,{
			from : msg.from,
			url :msg.url,
			createdAt : formattedTime
		});

		jQuery('#messages').append(html);
		// var li = jQuery('<li></li>');
		// var a =jQuery('<a target = _blank">My current Location</a>');
		// li.text(`${msg.from} ${formattedTime}: `);
		// a.attr('href',msg.url);
		// li.append(a);
		// jQuery('#messages').append(li);
	});
	jQuery('#message-form').on('submit',function (argument) {
	argument.preventDefault();

	socket.emit('createMessage',{
		from : "User",
		text : jQuery('[name=message]').val()
	},function (){
		jQuery('[name=message]').val('');
	});
	});

	var location1=jQuery('#send-location');
	location1.on('click',function () {
		if (!navigator.geolocation) {
			return alert('not supported by your browser.');
		}

		location1.attr('disabled','disabled').text('Sending Location...');
		navigator.geolocation.getCurrentPosition(function(position){
			location1.removeAttr('disabled').text('Send Location');
			socket.emit('createLocationMessage',{
				latitude : position.coords.latitude,
				longitude : position.coords.longitude
			});
			//console.log(position);
		},function(){
			location1.removeAttr('disabled').text('Send Location');
			alert('unable to fetch location');
		});
	});