/**
 * Created by Logan on 12/14/2014.
 */


//TODO: Want to be able to define variables that exist outside of the model / loop.

var Scriptr = (function(){


    /*
    * Helper Functions
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
    * Objects / Constructors
    */

    function Field(opts, $context) {
        var _field = Scriptr.prototype.fields[opts.type];

        this.name = opts.name;
        this.options = applyDefaults(opts.options, _field.defaults);
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
        var _loop = Scriptr.prototype.loops[opts.type];

        this.$variable = getVariable(opts, $context); //new Model(opts.model, $context);

        this.name = opts.name;
        this.options = applyDefaults(opts.options, _loop.defaults);
        this.value = [];

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

        //TODO: Test for Fields better. Don't just leave it as a default case.
        //FIELD
        else {
            _variable = new Field(args, $context);
        }

        return _variable;
    };




    var _args;
    var _version = "0.1.0";

    Scriptr = function(args) {

        _args = args;
    };


    Scriptr.prototype.getArgs = function() {

        return _args;
    };


    Scriptr.prototype.getVersion = function() {

        return _version;
    };

    Scriptr.prototype.generate = function(args) {
        args = args || _args;

        var $context = {};
        var generator = getVariable(args, $context);

        var result = generator.resolve();

        return result;
    };

    return Scriptr;

}());
