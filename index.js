
'use strict';

(() => {

    const
        utils       = require('./lib/utils'),
        request     = require('./lib/request'),
        status      = require('./lib/status');

    const rain = {};

    //add constants
    utils.addLockedProperty(rain, 'NO_DATA',         0);
    utils.addLockedProperty(rain, 'NO_RAIN',         1);
    utils.addLockedProperty(rain, 'LIGHT_RAIN',      2);
    utils.addLockedProperty(rain, 'MODERATE_RAIN',   3);
    utils.addLockedProperty(rain, 'HEAVY_RAIN',      4);

    rain.request = request;

    rain.get = (id) => {
            return request(id).then((res) => {
            return res.hasData ? status(res) : new Error('no data');
        });
    };

    module.exports = rain;

})();
