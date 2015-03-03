describe("The Scriptr global object", function(){

    it("is defined globally", function(){

        expect(Scriptr).toBeDefined();
    });

    //TODO: Write tests to inspect global object properties.

    it("instantiates without constructor arguments", function(){

        var testScriptr;
        var testFn = function() {
            testScriptr = new Scriptr();
        };

        expect(testFn).not.toThrow();
        expect(testScriptr).toBeDefined();
    });

    it("instantiates with constructor arguements", function(){

        var testScriptr;
        var testFn = function() {
            testScriptr = new Scriptr({
                model: {
                    name: 'myModel',
                    fields: [{
                        name: 'id',
                        type: Scriptr.fieldTypes.INCREMENT,
                        options: {
                            seed: 1,
                            interval: 1
                        }
                    }]
                }
            });
        };

        expect(testFn).not.toThrow();
        expect (testScriptr).toBeDefined();
    });




});

describe("A Scriptr instance", function(){

    //TODO: write tests to inspect instantiated object properties.

    it("generates when args are passed at instantiation, but are NOT passed to generate method when called.", function(){

        var result;
        var testFn = function() {
            var testScriptr = new Scriptr({
                field: {
                    name: 'test',
                    type: Scriptr.fieldTypes.STRING,
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
                    type: Scriptr.fieldTypes.STRING,
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