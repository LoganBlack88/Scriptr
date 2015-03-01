/**
 * Created by Logan on 12/14/2014.
 */


var Scriptr = (function(Scriptr) {


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

    Scriptr.prototype.loops = _loops;


    //TODO: Compile this dynamically, at instantiation, maybe?
    Scriptr.prototype.loopTypes = Scriptr.loopTypes = {

         ITERATOR : 'iterator',

         DOWHILE : 'doWhile',

         CUSTOM : 'custom'
     };

    return Scriptr;

}(Scriptr));