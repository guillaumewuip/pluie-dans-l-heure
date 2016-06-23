pluie-dans-l-heure [![Build Status](https://travis-ci.org/guillaumewuip/pluie-dans-l-heure.svg?branch=master)](https://travis-ci.org/guillaumewuip/pluie-dans-l-heure)
==================

Package nodejs pour interroger la fonction Pluie dans l'heure de Météo France

# Install

```
npm install pluie-dans-l-heure
```

# Use

```js
const rain = require('pluie-dans-l-heure');

rain
    .get(44019)
    .then((res) => {

        //do something

    })
    .catch((err) => {

        if (err.message === 'no data') {
            return console.log('something wrong with id');
        }

        console.error(err);
    });
```

# Documentation

## rain.get(id)

Params :

- `id` : code INSEE du lieu

Returns : `Promise`. When it resolves :

```
{
    raw: <request result>,
    idLieu: <String>,    //INSEE id
    lastUpdate: <Date>,  //data update date
    validity: <Date>,    //validity date
    raining: <Boolean>,  //is it raining now ?
    willRain: <Boolean>, //rain in the next hour ?
    windows: [           //12 5min-window with rain status
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    confidence: 0       //[0-1] number of confidence
}
```


## `rain.NO_DATA=0`

## `rain.NO_RAIN=1`

## `rain.LIGHT_RAIN=2`

## `rain.MODERATE_RAIN=3`

## `rain.HEAVY_RAIN=4`

## rain.request(id)

Params :

- `id` : code INSEE du lieu

Returns : `Promise`. When it resolves, gives you the JSON output of the HTTP
request.
