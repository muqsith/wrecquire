const assert = require('assert');

const wrequire = require('../index');

const app = wrequire('./src/app');

describe('app', function () {
    describe('#api_1()', function () {
        it('should call api', function (done) {
            app()
            .then(() => {
                assert(true, true);
                done();
            })
        });
    });
});
