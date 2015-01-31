/**
 * Created by Logan on 12/14/2014.
 */


//TODO: Want to be able to define variables that exist outside of the model / loop.

var Scriptr = (function(){

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


    function Field(opts) {
        var _field = Scriptr.prototype.fields[opts.type];

        this.name = opts.name;
        this.options = applyDefaults(opts.options, _field.defaults);
        this.resolve = _field.resolve;
    };


    var modelResolve = Model.prototype.resolve = function(){
        var $model = this;
        var result = {};

        forEach($model.fields, function($field){

            result[$field.name] = $field.resolve($field, $model);
        });

        return result;
    };


    function Model(opts) {
        var model = this;
        this.name = opts.name;
        this.fields = {};
        this.resolve = modelResolve;

        //build out fields
        forEach(opts.fields, function(field) {
            //model.fields[field.name] = new Field(field);
            model.fields[field.name] = new Variable(field);
        });
    };


    function Loop(opts) {
        this.$model = new Model(opts.model);

        var _loop = Scriptr.prototype.loops[opts.type];
        this.options = applyDefaults(opts.options, _loop.defaults);
        this.resolve = _loop.resolve;
    };


    function Variable(args){
        var _variable;

        //LOOP
        if (args.loop) {
            _variable = new Loop(args.loop);
        }
        else if (args.type === Scriptr.fieldTypes.LOOP) {
            _variable = new Loop(args.options);
        }

        // MODEL
        else if (args.model){
            _variable = new Model(args.model);
        }
        else if (args.type === Scriptr.fieldTypes.MODEL) {
            _variable = new Model(args.options);
        }

        //FIELD
        else {
            _variable = new Field(args);
        }

        this.inherit(_variable);
    };

    Variable.prototype.inherit = function(obj){
        var that = this;
        var keys = Object.keys(obj);
        forEach(keys, function(key) {
            that[key] = obj[key];
        });
    };



    Scriptr.prototype.generate = function(args) {
        args = args || _args;

        var variable = new Variable(args);
        var result = variable.resolve();

        return result;
    };
/*
    function runModel(args){
        $model = new Model(args.model);
        return $model.resolve();
    };

    function runLoop(args) {
        $loop = new Loop(args.loop);
        $model = new Model(args.loop.model);
        return $loop.resolve($loop, $model);
    } ;

    function run(args) {

        if (args.loop) {

            return runLoop(args);
        }
        else if (args.model) {

            return runModel(args);
        }
    };
*/

    return Scriptr;

}());
