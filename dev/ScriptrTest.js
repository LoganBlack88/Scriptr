/**
 * Created by Logan on 12/14/2014.
 */


    //document.addEventListener("DOMContentLoaded", function(event) {


    /** Done with??
var incrementScriptr = new Scriptr({
    loop : {
        type: Scriptr.loopTypes.ITERATOR,
        options: { count: 3, iteration: 1 },
        field: {
            type: 'increment',
            options : { increment : 5 }
        }
    }
});
var result = incrementScriptr.generate();
console.log(result);
    */

        console.log(Scriptr.prototype);

    var testingScriptr = new Scriptr();
    console.log(testingScriptr);
    console.log(testingScriptr.__testing__);


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

    console.log('this is Scriptr.fieldTypes :');
    console.log(Scriptr.fieldTypes);
    console.log('');

    console.log('this is myScriptr.fieldTypes :');
    console.log(myScriptr.fieldTypes);
    console.log('');

    console.log('this is Scriptr.loopTypes :');
    console.log(Scriptr.loopTypes);
    console.log('');

    console.log('this is myScriptr.loopTypes :');
    console.log(myScriptr.loopTypes);
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
                type: Scriptr.fieldTypes.INCREMENT,
                options: {
                    seed: 1,
                    increment: 1
                }
            }, {
                name : 'name',
                type : Scriptr.fieldTypes.STRING,
                options: {
                    value : 'John Doe'
                }
            }, {
                name : 'age',
                type : Scriptr.fieldTypes.RANDOM,
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
            type: Scriptr.loopTypes.ITERATOR,
            options : {
                count : 5,
                iteration : 1
            },
            model: {
                name: 'myModel',
                fields: [{
                    name: 'id',
                    type: Scriptr.fieldTypes.INCREMENT,
                    options: {
                        seed: 1,
                        increment: 1
                    }
                }, {
                    name: 'name',
                    type: Scriptr.fieldTypes.STRING,
                    options: {
                        value: 'John Doe'
                    }
                }, {
                    name: 'age',
                    type: Scriptr.fieldTypes.RANDOM,
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
                type: Scriptr.fieldTypes.INCREMENT,
                options: {
                    seed: 1,
                    increment: 1
                }
            }, {
                name: 'name',
                type: Scriptr.fieldTypes.STRING,
                options: {
                    value: 'John Doe'
                }
            }, {
                name: 'age',
                type: Scriptr.fieldTypes.RANDOM,
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
                        type: Scriptr.fieldTypes.INCREMENT,
                        options: {
                            seed: 1,
                            increment: 1
                        }
                    }, {
                        name: 'name',
                        type: Scriptr.fieldTypes.STRING,
                        options: {
                            value: 'Jane Doe'
                        }
                    }, {
                        name: 'age',
                        type: Scriptr.fieldTypes.RANDOM,
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
                type: Scriptr.fieldTypes.INCREMENT,
                options: {
                    seed: 1,
                    increment: 1
                }
            }, {
                name: 'name',
                type: Scriptr.fieldTypes.STRING,
                options: {
                    value: 'John Doe'
                }
            }, {
                name: 'age',
                type: Scriptr.fieldTypes.RANDOM,
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
                    type: Scriptr.loopTypes.ITERATOR,
                    options : {
                        count : 3,
                        iteration : 1
                    },
                    model: {
                        name: 'myModel',
                        fields: [{
                            name: 'id',
                            type: Scriptr.fieldTypes.INCREMENT,
                            options: {
                                seed: 1,
                                increment: 1
                            }
                        }, {
                            name: 'name',
                            type: Scriptr.fieldTypes.STRING,
                            options: {
                                value: 'John Doe'
                            }
                        }, {
                            name: 'age',
                            type: Scriptr.fieldTypes.RANDOM,
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
            type: Scriptr.fieldTypes.RANDOM,
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