
'use strict';

(() => {

    const
        assert      = require('chai').assert,
        fetchMock   = require('fetch-mock');

    const URL = 'http://www.meteofrance.com/mf3-rpc-portlet/rest/pluie';

    const obj = {
        'idLieu' : '441090',
        'echeance' : '201406091700',
        'lastUpdate' : '16h45',
        'isAvailable' : true,
        'hasData' : true,
        'niveauPluieText' : [ 'De17h00 à 18h00 : Pas de précipitations' ],
        'dataCadran' : [ {
            'niveauPluieText' : 'Pas de précipitations',
            'niveauPluie' : 1,
            'color' : 'ffffff'
        }, {
            'niveauPluieText' : 'Pas de précipitations',
            'niveauPluie' : 1,
            'color' : 'ffffff'
        }, {
            'niveauPluieText' : 'Pas de précipitations',
            'niveauPluie' : 1,
            'color' : 'ffffff'
        }, {
            'niveauPluieText' : 'Pas de précipitations',
            'niveauPluie' : 1,
            'color' : 'ffffff'
        }, {
            'niveauPluieText' : 'Pas de précipitations',
            'niveauPluie' : 1,
            'color' : 'ffffff'
        }, {
            'niveauPluieText' : 'Pas de précipitations',
            'niveauPluie' : 1,
            'color' : 'ffffff'
        }, {
            'niveauPluieText' : 'Pas de précipitations',
            'niveauPluie' : 1,
            'color' : 'ffffff'
        }, {
            'niveauPluieText' : 'Pas de précipitations',
            'niveauPluie' : 1,
            'color' : 'ffffff'
        }, {
            'niveauPluieText' : 'Pas de précipitations',
            'niveauPluie' : 1,
            'color' : 'ffffff'
        }, {
            'niveauPluieText' : 'Pas de précipitations',
            'niveauPluie' : 1,
            'color' : 'ffffff'
        }, {
            'niveauPluieText' : 'Pas de précipitations',
            'niveauPluie' : 1,
            'color' : 'ffffff'
        }, {
            'niveauPluieText' : 'Pas de précipitations',
            'niveauPluie' : 1,
            'color' : 'ffffff'
        } ]
    },
    obj2 = {
        idLieu: '1234',
        echeance: null,
        lastUpdate: null,
        isAvailable: false,
        hasData: false,
        niveauPluieText: null,
        dataCadran: null
    };

    fetchMock
        .mock(URL + '/2', JSON.stringify(obj2))
        .mock(URL + '/1', JSON.stringify(obj));

    describe('module', function () {

        const
            rain    = require('../index'),
            status  = require('../lib/status'),
            request = require('../lib/request');

        const constantsTest = [
            {prop: 'NO_DATA', val: 0},
            {prop: 'NO_RAIN', val: 1},
            {prop: 'LIGHT_RAIN', val: 2},
            {prop: 'MODERATE_RAIN', val: 3},
            {prop: 'HEAVY_RAIN', val: 4},
        ];

        constantsTest.forEach(function (test) {

            it(
                `should have immutable ${test.prop} property to ${test.val}`,
                function (done) {
                    assert.property(rain, test.prop);
                    assert.equal(rain[test.prop], test.val);

                    try {
                        rain[test.prop] = 1234;
                        done(false);
                    } catch(e) {
                        done();
                    }
                }
            );

        });

        it('should have request property', function () {
            assert.equal(rain.request, request);
        });

        it('should have get property', function () {
            assert.property(rain, 'get');
        });

        it('should return a Promise', function () {
            assert(rain.get(1) instanceof Promise);
        });

        it('should return status when get a good id', function (done) {
            rain.get(1)
                .then((res) => {
                    assert.deepEqual(res, status(obj));
                    done();
                })
                .catch(done);
        });

        it('should return "no data" when get a bad id', function (done) {
            rain.get(2)
                .then(() => {
                    done('should not pass here');
                })
                .catch((err) => {
                    assert.equal(err.message, 'no data');
                    done();
                });
        });

    });

})();
