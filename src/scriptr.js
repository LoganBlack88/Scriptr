var Scriptr = (function(){


    /*****************************************************
     * Helper Methods
     ******************************************************/
    var isArray = function(arg){
        return (arg instanceof Array);
    };
    var isObject = function(arg){
        return (arg instanceof Object);
    };

    var forEach = function(array, fn) {
        var index;
        if (isArray(array)) {
            for (var i = 0; i < array.length; i++) {
                fn(array[i], ++index);
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
        //TODO: If !isObject or !isArray would make for better tests.
        if (!obj) { return obj; }
        var copy = {};
        var keys = Object.keys(obj);
        forEach(keys, function(key){
            copy[key] = obj[key];
        });

        return copy;
    };


    /*****************************************************
    * Fields
    ******************************************************/

    var _fields = {

        custom : {
            resolve: function($context){
                return this.options.resolve.call(this, $context);
            },
            defaults : {
                resolve : function($context) {
                    return null;
                }
            }
        },

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
                seed : 1,
                increment : 1
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

        static : {
            resolve : function($context) {

                return this.options.value;
            },
            defaults : {
                value : null
            }
        }

    };


    /*****************************************************
     * Loops
     ******************************************************/

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
        },

        doWhile : {
            //TODO: Implement 'doWhile' loop.
        },

        forEach : {
            //TODO: Implement 'forEach' loop.
        },

        custom : {
            //TODO: Implement 'custom' loop.
        }
    };



    /*****************************************************
     * Variable Constructors
     ******************************************************/

    function Field(opts, $parent) {
        var _field = _fields[opts.type];

        this.name = opts.name;
        this.options = applyDefaults(opts.options || {}, _field.defaults);
        this.value = null;
        this.$parent = $parent;

        var field = this;
        this.resolve = function() {
            field.value = _field.resolve.call(field);
            return field.value;
        };
    };

    function Model(opts, $parent) {

        this.name = opts.name;
        this.options = opts;
        this.value = {};

        this.fields = {};
        this.$parent = $parent;

        var model = this;
        forEach(opts.fields, function(field) {
            model.fields[field.name] = getVariable(field, model);
        });

        this.resolve = function() {
            model.value = {};   //clear former values.
            forEach(model.fields, function(field){
                model.value[field.name] = field.resolve();
            });
            return clone(model.value);  //clone to break reference
        };
    };

    function Loop(opts, $parent) {
        var _loop = _loops[opts.type];

        this.name = opts.name;
        this.options = applyDefaults(opts.options, _loop.defaults);
        this.value = [];
        this.$parent = $parent;
        this.$variable = getVariable(opts, this);

        var loop = this;
        this.resolve = function() {
            this.value = _loop.resolve.call(loop);
            return this.value;
        };
    };


    var getVariable = function(args, $parent){
        var _variable;

        //LOOP
        if (args.loop) {
            _variable = new Loop(args.loop, $parent);
        }
        else if (args.type === Scriptr.fields.LOOP) {
            _variable = new Loop(args.options, $parent);
        }

        // MODEL
        else if (args.model){
            _variable = new Model(args.model, $parent);
        }
        else if (args.type === Scriptr.fields.MODEL) {
            _variable = new Model(args.options, $parent);
        }

        //FIELD
        else if (args.field) {
            _variable = new Field(args.field, $parent);
        }
        //TODO: Write a more meaningful test. Look for 'args.type' in list of field types.
        else {
            _variable = new Field(args, $parent);
        }

        //TODO: Write a base case. Throw an exception or something, if variable cannot be resolved. Include variable name for identification?

        return _variable;
    };


    /**
     * Create the Scriptr object.
     */

    var _dataModel;

    var getDataModel = function(){

        return _dataModel;
    };

    var generate = function(args) {
        args = args || _dataModel;

        var generator = getVariable(args, undefined);
        var result = generator.resolve();

        return result;
    };


    Scriptr = function(args) {

        _dataModel = args;
        this.getDataModel = getDataModel;
        this.generate = generate;
    };

    /**
    *
    * @param opts { name, resolve, defaults }
    *          or { fieldOne : { resolve, defaults }, fieldTwo : { resolve, defaults } }
    *          or [{ name, resolve, defaults }, { name, resolve, defaults }]
    */
    //TODO: Implement addFields.
    Scriptr.prototype.addFields = Scriptr.addFields = function(opts){
        console.log('addField');
        console.log(opts);
    };

    //TODO: Implement addLoops.
    Scriptr.prototype.addLoops = Scriptr.addLoops = function(opts){
        console.log('addField');
        console.log(opts);
    };


    //TODO: Make this dynamic - possibly at instantiation (so that fields can be added to the Scriptr global.)
    Scriptr.prototype.fields = Scriptr.fields = {

        MODEL : 'model',

        LOOP : 'loop',

        CUSTOM : 'custom',

        INCREMENT : 'increment',

        RANDOM : 'random',

        STATIC : 'static'

    };

    //TODO: Make this dynamic - possibly at instantiation (so that new loops can be added to the Scriptr global.)
    Scriptr.prototype.loops = Scriptr.loops = {

        ITERATOR : 'iterator',

        DOWHILE : 'doWhile',

        CUSTOM : 'custom',

        FOREACH : 'forEach'
    };



    //BEGIN: Development only
        //TODO: Remove at 'deploy'. grunt-strip-code?
        //  http://philipwalton.com/articles/how-to-unit-test-private-functions-in-javascript/

    Scriptr.prototype.__testing__ = {
        _fields : _fields,
        _loops : _loops,
        isArray : isArray,
        isObject : isObject,
        forEach : forEach,
        applyDefaults : applyDefaults
    };

    //END: Development only




    return Scriptr;

}());
