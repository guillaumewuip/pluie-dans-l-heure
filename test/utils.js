
'use strict';

(() => {

    const assert = require('chai').assert;

    describe('utils', function () {

        const utils = require('../lib/utils');

        it('should have addLockedProperty property', function (done) {
            assert.property(utils, 'addLockedProperty');
            assert.typeOf(utils.addLockedProperty, 'function');

            const obj = {};
            utils.addLockedProperty(obj, 'p', 1234);
            try {
                obj.p = 5678;
                done(false);
            } catch(e) {
                done();
            }
        });

    });

})();
