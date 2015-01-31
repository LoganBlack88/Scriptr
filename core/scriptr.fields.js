/**
 * Created by Logan on 12/14/2014.
 */


var Scriptr = (function(Scriptr) {

    console.log('scriptr.fieldTypes immediate function');
    console.log(Scriptr);


    var _fields = {

        increment : {
            resolve: function ($field, $model, $loop) {
                $field = $field || this;

                if (!$field.options.currentSeed) {
                    $field.options.currentSeed = $field.options.seed;
                } else {
                    $field.options.currentSeed += $field.options.interval;
                }
                return $field.options.currentSeed;
            },
            defaults : {
                seed : 0,
                interval : 1
            }
        },


        integer : {
            resolve : function($field, $model, $loop) {

                return this.options.value;
            },
            defaults : {
                value : null
            }
        },


        random : {
            resolve : function($field, $model, $loop) {
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
            resolve : function($field, $model, $loop) {

                return this.options.value;
            },
            defaults : {
                value : null
            }
        }

    };


    Scriptr.prototype.fields = _fields;

    //TODO: Compile this dynamically, at instantiation, maybe?
    Scriptr.prototype.fieldTypes = Scriptr.fieldTypes = {

        MODEL : 'model',
        LOOP : 'loop',

        INCREMENT : 'increment',

        INTEGER : 'integer',

        RANDOM : 'random',

        STRING : 'string'

    };


    return Scriptr;

}(Scriptr));
