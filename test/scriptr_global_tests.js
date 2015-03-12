
describe("The Scriptr global object", function(){


    it("is defined globally.", function(){

        expect(Scriptr).toBeDefined();
    });


    it("has an 'addFields' function.", function(){

        expect(Scriptr.addFields).toBeDefined();
        expect(typeof Scriptr.addFields).toEqual('function');
    });


    it("has an 'addLoops' function.", function(){

        expect(Scriptr.addLoops).toBeDefined();
        expect(typeof Scriptr.addLoops).toEqual('function');
    });


    it("has a 'fields' object which contains enum-like values that map to field types.", function(){

        expect(Scriptr.fields).toBeDefined();
        expect(typeof Scriptr.fields).toEqual('object');

        var keys = Object.keys(Scriptr.fields);
        var _fields = Scriptr.prototype.__testing__._fields;

        //the fields object have MODEL and LOOP as types, while _fields does not.
        if (keys[0] === 'MODEL' && keys[1] === 'LOOP') {
            keys = keys.splice(2, keys.length);
        }
        expect(keys.length).toEqual(Object.keys(_fields).length);

        //check that all Scriptr.fields has a matching _field object.
        for (i=0; i < keys.length; i++) {
            var key = Scriptr.fields[keys[i]];
            expect(key).toBeDefined();
            for(j=0; j < _fields.length; j++) {
                var field = _fields[key];
                expect(field).toBeDefined();
            }
        }
    });


    it("has a 'loops' object which contains enum-like values that map to loop types.", function(){

        expect(Scriptr.loops).toBeDefined();
        expect(typeof Scriptr.loops).toEqual('object');

        var keys = Object.keys(Scriptr.loops);
        var _loops = Scriptr.prototype.__testing__._loops;

        expect(keys.length).toEqual(Object.keys(_loops).length);

        //check that all Scriptr.loops has a matching _loop object.
        for (i=0; i < keys.length; i++) {
            var key = Scriptr.loops[keys[i]];
            expect(key).toBeDefined();
            for(j=0; j < _loops.length; j++) {
                var loop = _loops[key];
                expect(loop).toBeDefined();
            }
        }
    });


    it("instantiates without constructor arguments.", function(){

        var testScriptr;
        var testFn = function() {
            testScriptr = new Scriptr();
        };

        expect(testFn).not.toThrow();
        expect(testScriptr).toBeDefined();
    });


    it("instantiates with constructor arguments.", function(){

        var testScriptr;
        var testFn = function() {
            testScriptr = new Scriptr({
                model: {
                    name: 'myModel',
                    fields: [{
                        name: 'id',
                        type: Scriptr.fields.INCREMENT,
                        options: {
                            seed: 1,
                            increment: 1
                        }
                    }]
                }
            });
        };

        expect(testFn).not.toThrow();
        expect (testScriptr).toBeDefined();
    });


});
