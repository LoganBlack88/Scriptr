/**
 * Created by Logan on 12/14/2014.
 */


//TODO: Want to be able to define variables that exist outside of the model / loop.

var Scriptr = (function(){


    /*
    * Helper Functions
    */
    /**
     * TODO: Organize helpers into a pseudo underscore.
     *      If underscore is found in the global scope, use it.
     *      If not, create your own _ with a sampling of underscore's methods.
     *      Also, add any other helpful methods (such as clone) to the _ namespace.
     *      Note, if underscore is added AFTER Scriptr, this could cause problems...
     *      ...Maybe recheck for _ at instantiation, and re-add non-underscore helpers.
     */



    var isArray = function(arg){

        return (arg instanceof Array);
    };

    var isObject = function(arg){

        return (arg instanceof Object);
    };

    var forEach = function(array, fn) {

        if (isArray(array)) {
            for (var i = 0; i < array.length; i++) {
                fn(array[i]);
            }
        }

        else if(isObject(array)){
            var keys = Object.keys(array);
            forEach(keys, function(key){
                fn(array[key]);
            });
        }
    };

    var applyDefaults = function(obj1, obj2) {
        var keys = Object.keys(obj2);
        forEach(keys, function(key) {
            if (!obj1.hasOwnProperty(key)){
                obj1[key] = obj2[key];
            }
        });

        return obj1;
    };

    //TODO: Make a deep copy.
    /* Shallow Copy */
    var clone = function(obj) {

        var copy = {};
        var keys = Object.keys(obj);
        forEach(keys, function(key){
            copy[key] = obj[key];
        });

        return copy;
    };


    /*
    * Fields
    */

    var _fields = {

        increment : {

            resolve: function ($context) {
                if (this.options.currentSeed === undefined) {
                    this.options.currentSeed = this.options.seed;
                } else {
                    this.options.currentSeed += this.options.increment;
                }
                return this.options.currentSeed;
            },
            defaults : {
                seed : 0,
                increment : 1
            }
        },


        number : {
            resolve : function($context) {

                return this.options.value;
            },
            defaults : {
                value : null
            }
        },


        random : {
            resolve : function($context) {
                var min = this.options.min,
                    max = this.options.max,
                    result = Math.random() * (max - min) + min;

                if (this.options.ceil) { return Math.ceil(result); }
                if (this.options.floor) { return Math.floor(result); }
                if (this.options.toFixed) { return result.toFixed(toFixed); }
                return result;
            },
            defaults : {
                min : 0,
                max : 100,
                ceil : false,
                floor : true,
                toFixed : null
            }
        },

        string : {
            resolve : function($context) {

                return this.options.value;
            },
            defaults : {
                value : null
            }
        }

    };


    /*
    * Loops
    */

    var _loops = {

        iterator : {

            resolve : function($context){
                $variable = this.$variable;

                var results = [];
                for (var i = this.options.iteration; i <= this.options.count; i++) {
                    this.options.iteration = i;
                    results.push($variable.resolve());
                }
                return results;
            },

            defaults : {
                count : 0,
                iteration : 0
            }
        }
    };



    /*
    * Objects / Constructors
    */

    function Field(opts, $context) {
        var _field = _fields[opts.type];
        //TODO: Validate _field

        this.name = opts.name;
        this.options = applyDefaults(opts.options || {}, _field.defaults);
        this.value = null;

        this.$context = clone($context);
        this.$context.$field = this;

        var field = this;
        this.resolve = function() {
            field.value = _field.resolve.call(field, $context);
            return field.value;
        };
    };


    function Model(opts, $context) {

        this.name = opts.name;
        this.options = opts;
        this.fields = {};
        this.value = {};

        this.$context = clone($context);
        this.$context.$model = this;

        var model = this;
        forEach(opts.fields, function(field) {
            model.fields[field.name] = getVariable(field, model.$context);
        });

        this.resolve = function() {
            model.value = {};   //clear former values.
            forEach(model.fields, function(field){
                model.value[field.name] = field.resolve();
            });
            return clone(model.value);  //clone to break reference
        };
    };


    function Loop(opts, $context) {
        var _loop = _loops[opts.type];
        //TODO: Validate _loop.

        this.name = opts.name;
        this.options = applyDefaults(opts.options, _loop.defaults);
        this.value = [];
        this.$variable = getVariable(opts, $context);

        this.$context = clone($context);
        this.$context.$loop = this;

        var loop = this;
        this.resolve = function() {
            this.value = _loop.resolve.call(loop, $context);
            return this.value;
        };

    };


    var getVariable = function(args, $context){
        var _variable;

        //LOOP
        if (args.loop) {
            _variable = new Loop(args.loop, $context);
        }
        else if (args.type === Scriptr.fieldTypes.LOOP) {
            _variable = new Loop(args.options, $context);
        }

        // MODEL
        else if (args.model){
            _variable = new Model(args.model, $context);
        }
        else if (args.type === Scriptr.fieldTypes.MODEL) {
            _variable = new Model(args.options, $context);
        }

        //FIELD
        else if (args.field) {
            _variable = new Field(args.field, $context);
        }
        //TODO: Write a more meaningful test. Look for 'args.type' in list of field types.
        else {
            _variable = new Field(args, $context);
        }

        //TODO: Write a base case. Throw an exception or something, if variable cannot be resolved. Include variable name for identification?

        return _variable;
    };



    var _args;
    var _version = "0.1.0";


    Scriptr = function(args) {

        _args = args;
    };

    /**
    *
    * @param opts { name, resolve, defaults }
    *          or { fieldOne : { resolve, defaults }, fieldTwo : { resolve, defaults } }
    *          or [{ name, resolve, defaults }, { name, resolve, defaults }]
    */
    //TODO: Implement addFields.
    Scriptr.addFields = function(opts){
        console.log('addField');
        console.log(opts);
    };

    //TODO: Implement addLoops.
    Scriptr.addLoops = function(opts){
        console.log('addField');
        console.log(opts);
    };


    //TODO: Consider giving this a better name. Data Model?
    Scriptr.prototype.getArgs = function() {

        return _args;
    };


    Scriptr.prototype.getVersion = function() {

        return _version;
    };

    Scriptr.prototype.generate = function(args) {
        args = args || _args;

        var generator = getVariable(args, {});
        var result = generator.resolve();

        return result;
    };



    //TODO: Make this dynamic - possibly at instantiation (so that fields can be added to the Scriptr global.)
    Scriptr.prototype.fieldTypes = Scriptr.fieldTypes = {

        MODEL : 'model',
        LOOP : 'loop',

        INCREMENT : 'increment',

        NUMBER : 'number',

        RANDOM : 'random',

        STRING : 'string'

    };

    //TODO: Make this dynamic - possibly at instantiation (so that new loops can be added to the Scriptr global.)
    Scriptr.prototype.loopTypes = Scriptr.loopTypes = {

        ITERATOR : 'iterator',

        DOWHILE : 'doWhile',

        CUSTOM : 'custom'
    };

    //BEGIN: Development only
    //TODO: Remove at 'deploy'. grunt-strip-code?
    //  http://philipwalton.com/articles/how-to-unit-test-private-functions-in-javascript/

    Scriptr.prototype.__testing__ = {
        _fields : _fields,
        _loops : _loops
    };

    //END: Development only




    return Scriptr;

}());
