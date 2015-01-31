/**
 * Created by Logan on 12/14/2014.
 */


var Scriptr = (function(Scriptr) {


    var _loops = {

        iterator : {

            resolve : function($loop, $model){
                $loop = $loop || this;
                $model = this.$model;

                var results = [];
                for (var i = $loop.options.iteration; i <= $loop.options.count; i++) {
                    $loop.options.iteration = i;
                    results.push($model.resolve());
                }
                return results;
            },

            defaults : {
                count : 0,
                iteration : 0
            }
        }

    };

    Scriptr.prototype.loops = _loops;


    //TODO: Compile this dynamically, at instantiation, maybe?
    Scriptr.prototype.loopTypes = Scriptr.loopTypes = {

         ITERATOR : 'iterator',

         DOWHILE : 'doWhile',

         CUSTOM : 'custom'
     };

    return Scriptr;

}(Scriptr));