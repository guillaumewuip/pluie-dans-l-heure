
'use strict';

(() => {

    const
        chai   = require('chai'),
        assert = chai.assert;

    chai.use(require('chai-datetime'));

    describe('status', function () {

        const status = require('../lib/status');

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
        };

        const obj2 = {
            'idLieu' : '441090',
            'echeance' : '201406091700',
            'lastUpdate' : '16h45',
            'isAvailable' : true,
            'hasData' : true,
            'niveauPluieText' : [ 'De17h00 à 18h00 : Pas de précipitations' ],
            'dataCadran' : [ {
                'niveauPluieText' : 'Pas de précipitations',
                'niveauPluie' : 2,
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
                'niveauPluie' : 3,
                'color' : 'ffffff'
            }, {
                'niveauPluieText' : 'Pas de précipitations',
                'niveauPluie' : 4,
                'color' : 'ffffff'
            }, {
                'niveauPluieText' : 'Pas de précipitations',
                'niveauPluie' : 4,
                'color' : 'ffffff'
            }, {
                'niveauPluieText' : 'Pas de précipitations',
                'niveauPluie' : 3,
                'color' : 'ffffff'
            }, {
                'niveauPluieText' : 'Pas de précipitations',
                'niveauPluie' : 0,
                'color' : 'ffffff'
            }, {
                'niveauPluieText' : 'Pas de précipitations',
                'niveauPluie' : 0,
                'color' : 'ffffff'
            }, {
                'niveauPluieText' : 'Pas de précipitations',
                'niveauPluie' : 0,
                'color' : 'ffffff'
            } ]
        };

        const
            s   = status(obj),
            s2  = status(obj2);

        it('should return the obj as the raw property', function () {
            assert.equal(s.raw, obj);
        });

        it('should extract idLieu', function () {
            assert.equal(s.idLieu, obj.idLieu);
        });

        it('should extract and convert lastUpdate date', function () {
            const date = new Date();
            date.setHours(16);
            date.setMinutes(45);
            date.setSeconds(0);
            date.setMilliseconds(0);

            assert.equalDate(s.lastUpdate, date);
        });

        it('should extract and convert validity date', function () {
            const date = new Date();
            date.setYear(2014);
            date.setMonth(5);
            date.setDate(9);
            date.setHours(17);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);

            assert.equalDate(s.validity, date);
        });

        it(`should tell if it's raining now`, function () {
            assert.equal(s.raining, false);
            assert.equal(s2.raining, true);
        });

        it('should tell if it will rain', function () {
            assert.equal(s.willRain, false);
            assert.equal(s2.willRain, true);
        });

        it('should extract and clean rain windows', function () {
            assert.deepEqual(s.windows, new Array(12).fill(1));
            assert.deepEqual(s2.windows, [2, 1, 1, 1, 1, 3, 4, 4, 3, 0, 0, 0]);
        });

        it('should give confidence number', function () {
            assert.equal(s.confidence, 1);
            assert.equal(s2.confidence, (12 - 3) / 12);
        });

    });


})();
