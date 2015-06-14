/**
 * Created by Logan on 3/3/2015.
 */

describe("The Scriptr field", function(){


    describe("custom", function(){

        it("is a field option", function(){

            expect(Scriptr.prototype.__testing__._fields.custom).toBeDefined();
        });

        it("has a default return of null, if no resolve is offered.", function(){
            var result;
            var testDefault = function() {
                var defaultScriptr = new Scriptr({
                    field: {
                        type: 'custom'
                    }
                });
                result = defaultScriptr.generate();
            }

            expect(testDefault).not.toThrow();
            expect(result).toBeNull();
        });

        it("accepts a user-defined resolve, and calls it during generation.", function(){
            var customScriptr = new Scriptr({
                field : {
                    type : 'custom',
                    options : {
                        resolve : function($context) {
                            return 12.581;
                        }
                    }
                }
            });
            var result = customScriptr.generate();

            expect(result).toEqual(12.581);
        });

        //TODO: Supplies a valid $context object as argument.
        it("calls resolve with a valid $context parameter.", function() {
            var testScriptr = new Scriptr({
                model : {
                    fields : [{
                        type : 'custom',
                        resolve : function(){

                        }
                    }]
                }
            });


        });

        //TODO: This is an instance of Field. (Requires adding Field to the __testing__ var).

    });



    describe("increment", function(){

        it("is a field option", function(){

            expect(Scriptr.prototype.__testing__._fields.increment).toBeDefined();
        });

        it("has a default seed of 1.", function(){

            expect(Scriptr.prototype.__testing__._fields.increment.defaults.seed).toEqual(1);
        });

        it("has a default increment of 1.", function(){

            expect(Scriptr.prototype.__testing__._fields.increment.defaults.increment).toEqual(1);
        });

        it("counts up from 1, when generated with default options.", function(){
            var incrementScriptr = new Scriptr({
                loop : {
                    type: Scriptr.loops.ITERATOR,
                    options: { count: 5, iteration: 1 },
                    field: { type: 'increment' }
                }
            });
            var result = incrementScriptr.generate();

            expect(result[0]).toEqual(1);
            expect(result[1]).toEqual(2);
            expect(result[2]).toEqual(3);
            expect(result[3]).toEqual(4);
            expect(result[4]).toEqual(5);
        });

        it("accepts alternate seed options.", function(){
            var incrementScriptr = new Scriptr({
                loop : {
                    type: Scriptr.loops.ITERATOR,
                    options: { count: 3, iteration: 1 },
                    field: {
                        type: 'increment',
                        options : { seed : 5 }
                    }
                }
            });
            var result = incrementScriptr.generate();

            expect(result[0]).toEqual(5);
            expect(result[1]).toEqual(6);
            expect(result[2]).toEqual(7);
        });

        it("accepts alternate increment options.", function(){
            var incrementScriptr = new Scriptr({
                loop : {
                    type: Scriptr.loops.ITERATOR,
                    options: { count: 3, iteration: 1 },
                    field: {
                        type: 'increment',
                        options : { increment : 5 }
                    }
                }
            });
            var result = incrementScriptr.generate();

            expect(result[0]).toEqual(1);
            expect(result[1]).toEqual(6);
            expect(result[2]).toEqual(11);
        });

        it("accepts alternate seed AND increment options.", function(){
            var incrementScriptr = new Scriptr({
                loop : {
                    type: Scriptr.loops.ITERATOR,
                    options: { count: 3, iteration: 1 },
                    field: {
                        type: 'increment',
                        options : { seed : 10, increment : 7 }
                    }
                }
            });
            var result = incrementScriptr.generate();

            expect(result[0]).toEqual(10);
            expect(result[1]).toEqual(17);
            expect(result[2]).toEqual(24);
        });
    });


    describe("random", function(){

        it("is a field option", function(){

            expect(Scriptr.prototype.__testing__._fields.random).toBeDefined();
        });

        //TODO: Write more tests for "random".
    });



    describe("static", function(){

        it("is a field option", function(){

            expect(Scriptr.prototype.__testing__._fields.static).toBeDefined();
        });

        it("has a default value of null.", function(){

            expect(Scriptr.prototype.__testing__._fields.static.defaults.value).toEqual(null);
        });

        it("accepts a value as an option, and returns that value at resolve time.", function(){
            var intScriptr = new Scriptr({
                model : {
                    fields: [{
                        name : 'string',
                        type : 'static',
                        options: { value: "foo" }
                    }, {
                        name : 'number',
                        type : 'static',
                        options: { value: 10 }
                    }, {
                        name : 'date',
                        type: 'static',
                        options: { value: new Date('12/31/1999') }
                    }, {
                        name : 'array',
                        type : 'static',
                        options: { value: [1,2,3] }
                    }, {
                        name : 'object',
                        type : 'static',
                        options: { value: { key : 'value' } }
                    }, {
                        name : 'null',
                        type : 'static',
                        options: { value: null }
                    }, {
                        name : 'undefined',
                        type : 'static',
                        options: { value: undefined }
                    }]
                }
            });
            var result = intScriptr.generate();

            expect(result.string).toEqual('foo');
            expect(result.number).toEqual(10);
            expect(result.date.valueOf()).toEqual(new Date('12/31/1999').valueOf());
            expect(result.array instanceof Array).toBe(true);
            expect(result.object instanceof Object).toBe(true);
            expect(result.null).toBeNull();
            expect(result.undefined).toBeUndefined();
        });
    });


});

