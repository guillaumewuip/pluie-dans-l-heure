
'use strict';

(() => {

    const
        request     = require('./lib/request'),
        status      = require('./lib/status'),
        constants   = require('./lib/constants');

    module.exports = Object.assign(
        {},
        constants,
        {
            request: request,
            get: (id) => {
                return request(id).then((res) => {
                    return res.hasData ? status(res) : new Error('no data');
                });
            },
        }
    );

})();
