/**
 * Created by Logan on 12/14/2014.
 */


    var testScriptr = new Scriptr({
        field: {
            name: 'test',
            type: Scriptr.fields.STRING,
            options: {
                value: 'foo'
            }
        }
    });
    result = testScriptr.generate();





  /**

var testScriptr = new Scriptr({
    loop : {
        type: Scriptr.loops.ITERATOR,
        options : {
            count : 5,
            iteration : 1
        },
        model: {
            fields: [{
                name: 'field',
                type: 'custom',
                options: {
                    resolve: function ($context) {

                        console.log($context);

                        return 5;
                    }
                }
            }]
        }
    }  //end Loop
});

var result = testScriptr.generate();
console.log(result);


*/

/*
console.log('-------------------------------------------');
console.log(' PHASE 1 : Inspection');
console.log('-------------------------------------------');
console.log('');

var myScriptr = new Scriptr({ model: { name : "myModel", fields: [] }});

console.log('this is the Scriptr global object: ');
console.log(Scriptr);
console.log('');

console.log('this is the global Scriptr.addFields: ');
console.log(Scriptr.addField);
console.log('');



console.log('this is myScriptr: ');
console.log(myScriptr);
console.log('');

console.log('this is myScriptr.getArgs() :');
console.log(myScriptr.getArgs());
console.log('');

console.log('this is myScriptr.getVersion() :');
console.log(myScriptr.getVersion());
console.log('');

console.log('this is Scriptr.fields :');
console.log(Scriptr.fields);
console.log('');

console.log('this is myScriptr.fields :');
console.log(myScriptr.fields);
console.log('');

console.log('this is Scriptr.loops :');
console.log(Scriptr.loops);
console.log('');

console.log('this is myScriptr.loops :');
console.log(myScriptr.loops);
console.log('');
console.log('');
console.log('');


console.log('-------------------------------------------');
console.log(' PHASE 2 : Generation personScriptr');
console.log('-------------------------------------------');
console.log('');

var personScriptr = new Scriptr({
    model : {
        name: 'myModel',
        fields: [{
            name: 'id',
            type: Scriptr.fields.INCREMENT,
            options: {
                seed: 1,
                increment: 1
            }
        }, {
            name : 'name',
            type : Scriptr.fields.STRING,
            options: {
                value : 'John Doe'
            }
        }, {
            name : 'age',
            type : Scriptr.fields.RANDOM,
            options : {
                min : 18,
                max : 35,
                floor : true,
                ceil : false
            }
        }]
    }
});

console.log('calling personScriptr.generate() :');
var result = personScriptr.generate();
console.log('');
console.log('RESULT:');
console.log(result);
console.log('');
console.log('');
console.log('');


console.log('-------------------------------------------');
console.log(' PHASE 3 : Generation peopleScriptr');
console.log('-------------------------------------------');
console.log('');

var peopleScriptr = new Scriptr({
    loop : {
        type: Scriptr.loops.ITERATOR,
        options : {
            count : 5,
            iteration : 1
        },
        model: {
            name: 'myModel',
            fields: [{
                name: 'id',
                type: Scriptr.fields.INCREMENT,
                options: {
                    seed: 1,
                    increment: 1
                }
            }, {
                name: 'name',
                type: Scriptr.fields.STRING,
                options: {
                    value: 'John Doe'
                }
            }, {
                name: 'age',
                type: Scriptr.fields.RANDOM,
                options: {
                    min: 18,
                    max: 35,
                    floor: true,
                    ceil: false
                }
            }]
        }
    }
});

console.log('calling personScriptr.generate() :');
var result2 = peopleScriptr.generate();

console.log('');
console.log('RESULT:');
console.log(result2);
console.log('');
console.log('');
console.log('');

console.log('-------------------------------------------');
console.log(' PHASE 4 : Generation wifeScriptr');
console.log('-------------------------------------------');
console.log('');

var wifeScriptr = new Scriptr({
    model: {
        name: 'myModel',
        fields: [{
            name: 'id',
            type: Scriptr.fields.INCREMENT,
            options: {
                seed: 1,
                increment: 1
            }
        }, {
            name: 'name',
            type: Scriptr.fields.STRING,
            options: {
                value: 'John Doe'
            }
        }, {
            name: 'age',
            type: Scriptr.fields.RANDOM,
            options: {
                min: 18,
                max: 35,
                floor: true,
                ceil: false
            }
        }, {
            name: 'wife',
            type: 'model',
            options : {
                name : 'wife',
                fields: [{
                    name: 'id',
                    type: Scriptr.fields.INCREMENT,
                    options: {
                        seed: 1,
                        increment: 1
                    }
                }, {
                    name: 'name',
                    type: Scriptr.fields.STRING,
                    options: {
                        value: 'Jane Doe'
                    }
                }, {
                    name: 'age',
                    type: Scriptr.fields.RANDOM,
                    options: {
                        min: 18,
                        max: 35,
                        floor: true,
                        ceil: false
                    }
                }]
            }
        }]
    }
});


console.log('calling wifeScriptr.generate() :');
var result3 = wifeScriptr.generate();

console.log('');
console.log('RESULT:');
console.log(result3);
console.log('');
console.log('');
console.log('');



console.log('-------------------------------------------');
console.log(' PHASE 5 : Generation childrenScriptr');
console.log('-------------------------------------------');
console.log('');

var childrenScriptr = new Scriptr({
    model: {
        name: 'myModel',
        fields: [{
            name: 'id',
            type: Scriptr.fields.INCREMENT,
            options: {
                seed: 1,
                increment: 1
            }
        }, {
            name: 'name',
            type: Scriptr.fields.STRING,
            options: {
                value: 'John Doe'
            }
        }, {
            name: 'age',
            type: Scriptr.fields.RANDOM,
            options: {
                min: 18,
                max: 35,
                floor: true,
                ceil: false
            }
        }, {
            name: 'children',
            type: 'loop',
            options : {
                name : 'children',
                type: Scriptr.loops.ITERATOR,
                options : {
                    count : 3,
                    iteration : 1
                },
                model: {
                    name: 'myModel',
                    fields: [{
                        name: 'id',
                        type: Scriptr.fields.INCREMENT,
                        options: {
                            seed: 1,
                            increment: 1
                        }
                    }, {
                        name: 'name',
                        type: Scriptr.fields.STRING,
                        options: {
                            value: 'John Doe'
                        }
                    }, {
                        name: 'age',
                        type: Scriptr.fields.RANDOM,
                        options: {
                            min: 18,
                            max: 35,
                            floor: true,
                            ceil: false
                        }
                    }]
                }
            }
        }]
    }
});


console.log('calling childrenScriptr.generate() :');
var result4 = childrenScriptr.generate();

console.log('');
console.log('RESULT:');
console.log(result4);
console.log('');
console.log('');
console.log('');




console.log('-------------------------------------------');
console.log(' PHASE 6 : Generation fieldScriptr');
console.log('-------------------------------------------');
console.log('');


var fieldScriptr = new Scriptr({
    field : {
        name: 'random',
        type: Scriptr.fields.RANDOM,
        options: {
            min: 1,
            max: 10,
            floor: true,
            ceil: false
        }
    }
});

console.log('calling fieldscriptr.generate()');
var result6 = fieldScriptr.generate();

console.log('');
console.log('RESULT:');
console.log(result6);

//});


    */