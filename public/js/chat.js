//by calling io method,we are initiating the request	
	var socket=io();

	function scrollToBottom()
	{
		var messages= jQuery('#messages');
		var newMessage = messages.children('li:last-child');

		var clientHeight = messages.prop('clientHeight');
		var scrollTop = messages.prop('scrollTop');
		var scrollHeight = messages.prop('scrollHeight');
		var newMessageHeight = newMessage.innerHeight();
		var lastMessageHeight = newMessage.prev().innerHeight();
		if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight)
		{
			messages.scrollTop(scrollHeight);
			//console.log('should scroll');
		}
	}
	socket.on('connect',function(){
		var param = jQuery.deparam(window.location.search);
		//console.log('connected to server');
		socket.emit('join',param,function (err){
			if(err){
						alert(err);
						window.location.href = '/';
			}
			else {
						console.log('No error');
			}
		});
	// socket.emit('createMessage',{
	// 	from : 'akash',
	// 	text : 'hello'
	// });
	});
	socket.on('disconnect',function(){
		console.log('disconnected from server');
	});

	socket.on('updateUserList',function(users){
		//console.log('Users List',users);
		var ol = jQuery('<ol></ol>');
		users.forEach(function (user){
			ol.append(jQuery('<li></li>').text(user));
		});
		jQuery('#users').html(ol);
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
		scrollToBottom();
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
		scrollToBottom();
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