
'use strict';

(() => {

    const moment = require('moment');

    const
        dateFormat = 'YYYYMMDDHHmm',
        hourFormat = 'HH-mm';

    const status = (res) => {

        return {

            /**
             * raw
             *
             * Raw response from server
             * @type {JSON}
             */
            raw: res,

            /**
             * idLieu
             *
             * INSEE city code returned by server
             * @type {String}
             */
            idLieu: res.idLieu,

            /**
             * lastUpdate
             *
             * Date of the last update of the prediction
             * @type {Date}
             */
            lastUpdate: moment(res.lastUpdate, hourFormat).toDate(),

            /**
             * validity
             *
             * Date of end of validity (usually now + 10min)
             * @type {Date}
             */
            validity: moment(res.echeance, dateFormat).toDate(),

            /**
             * raining
             *
             * Is it raining now ?
             * @type {Boolean}
             */
            raining: res.dataCadran[0].niveauPluie > 1,

            /**
             * willRain
             *
             * Will it be raining in the next hour ?
             * @type {Boolean}
             */
            willRain: res.dataCadran.reduce((result, item) => {
                return result ? result : item.niveauPluie > 1;
            }, false),

            /**
             * windows
             *
             * 12 items array for the 5min windows of the next hours
             * @type {Array}
             *
             * @example
             *
                [1, 1, 2, 2, 3, 3, 2, 2, 0, 0, 0, 0]
             *
             */
            windows: res.dataCadran.map((item) => item.niveauPluie),

            /**
             * confidence
             *
             * Custom confidence measure. Number in [0, 1]
             * 0 = Can't predict the next hour
             * 1 = Next hour fully predicted
             * @type {Number}
             * @example 0.083333
             */
            confidence: res.dataCadran.reduce((result, item) => {
                return item.niveauPluie === 0 ? result : ++result;
            }, 0) / 12,

        };

    };

    module.exports = status;

})();
