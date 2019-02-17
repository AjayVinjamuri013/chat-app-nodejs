const expect = require('expect');

const {validString} = require('./validation');

describe('validString',()=>{
	it('should reject non-string values',()=>{
		var res = validString(98);
		expect(res).toBe(false);
	});

	it('should reject string with only spaces',()=>{
		var res = validString('   ');
		expect(res).toBe(false);
	});

	it('should accept string with non-spaces chars',()=>{
		var res = validString(' me  ');
		expect(res).toBe(true);
	});
});