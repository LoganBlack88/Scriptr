
describe("A Scriptr instance", function(){


    it("has a 'getDataModel' function, which returns the args that were passed in at instantiation.", function(){

        var testScriptr = new Scriptr({
            name : 'id',
            type : 'increment',
            options : { seed : 0, increment : 3 }
        });

        expect(testScriptr.getDataModel).toBeDefined();
        expect(typeof testScriptr.generate).toEqual('function');

        var dm = testScriptr.getDataModel();

        expect(dm).toBeDefined();
        expect(dm.name).toEqual('id');
        expect(dm.type).toEqual('increment');
        expect(dm.options).toBeDefined();
        expect(dm.options.seed).toEqual(0);
        expect(dm.options.increment).toEqual(3);
    });


    it("has an 'addFields' function.", function(){
        var testScriptr = new Scriptr();

        expect(testScriptr.addFields).toBeDefined();
        expect(typeof testScriptr.addFields).toEqual('function');
    });


    it("has a 'generate' function.", function(){
        var testScriptr = new Scriptr({
            name : 'id',
            type : 'increment',
            options : { seed : 0, increment : 3 }
        });
        expect(testScriptr.generate).toBeDefined();
        expect(typeof testScriptr.generate).toEqual('function');
    });

    it("generates when args are passed at instantiation, but are NOT passed to generate method when called.", function(){
        var result;
        var testFn = function() {
            var testScriptr = new Scriptr({
                field: {
                    name: 'test',
                    type: Scriptr.fields.STATIC,
                    options: {
                        value: 'foo'
                    }
                }
            });
            result = testScriptr.generate();
        };

        expect(testFn).not.toThrow();
        expect(result).toEqual('foo');
    });

    it("generates when args are NOT passed at instantiation, but are passed to generate method when called.", function() {

        var result;
        var testFn = function() {
            var testScriptr = new Scriptr();
            result = testScriptr.generate({
                field: {
                    name: 'test',
                    type: Scriptr.fields.STATIC,
                    options: {
                        value: 'bar'
                    }
                }
            });
        };

        expect(testFn).not.toThrow();
        expect(result).toEqual('bar');
    });


    //TODO: Args passed at generate will be used instead of args passed at instantiation.

    //TODO: Args passed at generate will NOT overwrite args that were passed at instantiation.

});