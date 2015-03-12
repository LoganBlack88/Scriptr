/**
 * Created by Logan on 3/3/2015.
 */

describe("The Scriptr field", function(){


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



    describe("number", function(){

        it("is a field option.", function(){

            expect(Scriptr.prototype.__testing__._fields.number).toBeDefined();
        });

        it("has a default value of null.", function(){

            expect(Scriptr.prototype.__testing__._fields.number.defaults.value).toEqual(null);
        });

        it("accepts a value option, and returns that value at generate.", function(){
            var numberScriptr = new Scriptr({
                field : {
                    type: 'number',
                    options: { value: 6 }
                }
            });
            var result = numberScriptr.generate();

            expect(result).toEqual(6);
        })
    });



    describe("random", function(){

        it("is a field option", function(){

            expect(Scriptr.prototype.__testing__._fields.random).toBeDefined();
        });

        //TODO: Write more tests for "random".
    });



    describe("string", function(){

        it("is a field option", function(){

            expect(Scriptr.prototype.__testing__._fields.string).toBeDefined();
        });

        it("has a default value of null.", function(){

            expect(Scriptr.prototype.__testing__._fields.string.defaults.value).toEqual(null);
        });

        it("accepts a value option, and returns that value at generate.", function(){
            var intScriptr = new Scriptr({
                field : {
                    type: 'string',
                    options: { value: "foo bar" }
                }
            });
            var result = intScriptr.generate();

            expect(result).toEqual('foo bar');
        })
    });


});

