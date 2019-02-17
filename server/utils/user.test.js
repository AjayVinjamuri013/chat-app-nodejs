const expect = require('expect');

const {Users} = require('./user');

describe("Users",()=>{
	var users;
	beforeEach(()=>{
		users = new Users();
		users.users = [{
			id:'1',
			name :'aj',
			room:'pubg'
		},{
			id:'2',
			name :'james',
			room:'fortnite'
		},{
			id:'3',
			name :'rock',
			room:'pubg'
		}];
	});

	it('should add new user',()=>{
		var users = new Users();
		var user ={
			id : '123',
			name :'rocky',
			room :'mumbai'
		};
		var reUser = users.adduser(user.id,user.name,user.room);
		//1st users for users in line 7 and second users for users in constructor in user.js
		expect(users.users).toEqual([user]);
	});

	it('should remove user',()=>{
		var a=users.removeuser('1');
		expect(a.id).toBe('1');
		expect(users.users.length).toBe(2);

	});

	it('should not remove user',()=>{
		var b=users.removeuser('11');
		expect(b).toBeUndefined();

		expect(users.users.length).toBe(3);
	});

	it('should find user',()=>{
		var user = users.getuser('2');
		expect(user.id).toBe('2');
	});

	it('should not find user',()=>{
		var user = users.getuser('23');
		expect(user).toBeUndefined();
	})

	it('should return names of room pubg',()=>{
		var userList = users.getuserlist('pubg');

		expect(userList).toEqual(['aj','rock']);
	});

	it('should return names of room fortnite',()=>{
		var userList1 = users.getuserlist('fortnite');

		expect(userList1).toEqual(['james']);
	});
});