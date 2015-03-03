describe("The Scriptr object", function(){

    it("is defined globally", function(){

        expect(Scriptr).toBeDefined();
    });

    it("instantiates without constructor arguments", function(){

        var testScriptr = new Scriptr();

        //TODO: Come up with more meaningful test(s).
        expect(testScriptr).toBeDefined();
    });

    it("instantiates with constructor arguements", function(){
        //TODO: Simplify this object.
        var testScriptr = new Scriptr({
            model : {
                name: 'myModel',
                fields: [{
                    name: 'id',
                    type: Scriptr.fieldTypes.INCREMENT,
                    options: {
                        seed: 1,
                        interval: 1
                    }
                }]
            }
        });
        //TODO: Come up with more meaningful test(s).
        expect (testScriptr).toBeDefined();
    });


});