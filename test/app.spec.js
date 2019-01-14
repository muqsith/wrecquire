const assert = require('assert');

const wrecquire = require('../index');

const app = wrecquire('./src/app', { before: () => {console.log(Date.now())}, after: () => {console.log(Date.now())}});

const circle = wrecquire('./src/circle', { before: () => {console.log(Date.now())}, after: () => {console.log(Date.now())}});

const Person = wrecquire('./src/Person', { before: () => {console.log(Date.now())}, after: () => {console.log(Date.now())}});


describe('app', function () {
    describe('#api_1()', function () {
        it('should call api', function (done) {
            console.log('Circle area: ', circle.area(5).toFixed(2));
            console.log('Circle perimeter: ', circle.perimeter(5).toFixed(2));

            const p1 = new Person();
            p1.setName('Abdul Muqsith');
            p1.setAge(33);

            console.log(p1.getName(), p1.getAge());

            app()
            .then(() => {
                assert(true, true);
                done();
            });

        });
    });
});
