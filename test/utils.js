
'use strict';

(() => {

    const assert = require('chai').assert;

    describe('utils', function () {

        const utils = require('../lib/utils');

        it('should have addLockedProperty property', function () {
            assert.property(utils, 'addLockedProperty');
            assert.typeOf(utils.addLockedProperty, 'function');
        });

    });

})();
