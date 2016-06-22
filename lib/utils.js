
'use strict';

(() => {

    const utils = {

        addLockedProperty: (obj, name, val) => {
            Object.defineProperty(obj, name, {
                value:          val,
                writable:       false,
                enumerable:     true,
                configurable:   false
            });
        },

    };

    module.exports = utils;

})();
