
'use strict';

(() => {

    require('isomorphic-fetch');

    const URL = 'http://www.meteofrance.com/mf3-rpc-portlet/rest/pluie/';

    /**
     * request
     *
     * @param  {Int}    idLieu      INSEE code of the city
     * @see http://www.insee.fr/fr/methodes/nomenclatures/cog/
     *
     * @return {Promise}
     *
     * @example JSON response
     *          Each item in dataCadran is for a 5 min window
     *

        {
          "idLieu" : "441090",
          "echeance" : "201406091700",
          "lastUpdate" : "16h45",
          "isAvailable" : true,
          "hasData" : true,
          "niveauPluieText" : [ "De17h00 à 18h00 : Pas de précipitations" ],
          "dataCadran" : [ {
            "niveauPluieText" : "Pas de précipitations",
            "niveauPluie" : 1,
            "color" : "ffffff"
          }, {
            "niveauPluieText" : "Pas de précipitations",
            "niveauPluie" : 1,
            "color" : "ffffff"
          }, {
            "niveauPluieText" : "Pas de précipitations",
            "niveauPluie" : 1,
            "color" : "ffffff"
          }, {
            "niveauPluieText" : "Pas de précipitations",
            "niveauPluie" : 1,
            "color" : "ffffff"
          }, {
            "niveauPluieText" : "Pas de précipitations",
            "niveauPluie" : 1,
            "color" : "ffffff"
          }, {
            "niveauPluieText" : "Pas de précipitations",
            "niveauPluie" : 1,
            "color" : "ffffff"
          }, {
            "niveauPluieText" : "Pas de précipitations",
            "niveauPluie" : 1,
            "color" : "ffffff"
          }, {
            "niveauPluieText" : "Pas de précipitations",
            "niveauPluie" : 1,
            "color" : "ffffff"
          }, {
            "niveauPluieText" : "Pas de précipitations",
            "niveauPluie" : 1,
            "color" : "ffffff"
          }, {
            "niveauPluieText" : "Pas de précipitations",
            "niveauPluie" : 1,
            "color" : "ffffff"
          }, {
            "niveauPluieText" : "Pas de précipitations",
            "niveauPluie" : 1,
            "color" : "ffffff"
          }, {
            "niveauPluieText" : "Pas de précipitations",
            "niveauPluie" : 1,
            "color" : "ffffff"
          } ]
        }

     *
     *
     */
    const request = (idLieu) => {

        return new Promise((resolve, reject) => {

            fetch(`${URL}${idLieu}`)
                .then(res => res.json())
                .then(resolve)
                .catch(reject);

        });

    };

    module.exports = request;

})();
