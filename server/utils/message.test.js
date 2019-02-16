var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
	it('should generate correct message object',()=>{
		var from = 'ram';
		var text = 'some message';
		var message = generateMessage(from,text);

		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({from,text});
	});
});

describe('generateLocationMessage',()=>{
	it('should generate correct location object',()=>{
		var from='Deb';
		var lat =1;
		var long =2;
		var url = 'https://www.google.com/maps?q=1,2';
		var message = generateLocationMessage(from,lat,long);

		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({from,url});
	});
});