class Users {
	constructor(){
		this.users =[];
	}

	adduser(id,name,room){
		var user = {id,name,room};
		this.users.push(user);
		return user;
	}

	getuser(id){
		return this.users.filter((user)=>user.id===id)[0];
	}


	removeuser(id){
		var user = this.getuser(id);
		if(user)
		{
			this.users = this.users.filter((user)=>user.id!==id);
		}
		return user;
	}

	getuserlist(room){
		var users = this.users.filter((user)=>user.room === room);
		var namesArray = users.map((user)=>user.name);

		return namesArray;
	}
}

module.exports = {Users};