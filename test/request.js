
'use strict';

(() => {


    const
        assert    = require('chai').assert,
        fetchMock = require('fetch-mock');

    const URL = 'http://www.meteofrance.com/mf3-rpc-portlet/rest/pluie';

    const obj = {
        a: 1234,
    };

    fetchMock
        .mock(URL + '/404', 404)
        .mock(URL + '/200', JSON.stringify(obj))
        .mock(URL + '/noJSON', 'hello world');

    describe('request', function () {

        const request = require('../lib/request');

        it('should return a Promise', function () {
            assert(request('404') instanceof Promise);
        });

        it('should return JSON', function (done) {
            request('200')
                .then((res) => {
                    assert.deepEqual(res, obj);
                    done();
                })
                .catch(done);
        });

        it('should fail if URL is 404', function (done) {
            request('404')
                .then(() => done(false))
                .catch(() => done());
        });

        it(`should fail if can't convert JSON`, function (done) {
            request('noJSON')
                .then(() => done(false))
                .catch(() => done());
        });

    });

})();
