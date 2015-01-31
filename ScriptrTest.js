/**
 * Created by Logan on 12/14/2014.
 */


    //document.addEventListener("DOMContentLoaded", function(event) {


    console.log('-------------------------------------------');
    console.log(' PHASE 1 : Inspection');
    console.log('-------------------------------------------');
    console.log('');

    var myScriptr = new Scriptr();

    console.log('this is the Scriptr global object: ');
    console.log(Scriptr);
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
                    interval: 1
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
                        interval: 1
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

    var childrenScriptr = new Scriptr({
        model: {
            name: 'myModel',
            fields: [{
                name: 'id',
                type: Scriptr.fieldTypes.INCREMENT,
                options: {
                    seed: 1,
                    interval: 1
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
                options : {}
            }]
        }
    });

//});