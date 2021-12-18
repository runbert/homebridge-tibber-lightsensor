# homebridge-tibber-lightsensor
Tibber lightsensor is a plugin for Homebridge.

It fetches the current watt usage of your house and displays it as a lightsensor (lux) in Homekit. Using a built in timer, it can update the Home app UI with a new value as often as you'd like (default value is set to update once each second).

Example: 10 Watt from Tibber API is displayed as 10 lux in Home app.

## Screenshots

![tibber.png](https://i.postimg.cc/gkVDqs5c/tibber.png)

## Installation 
This plugin is published on [npm](https://www.npmjs.com/package/homebridge-tibber-lightsensor) and should be installed globally using:

`npm i -g homebridge-tibber-lightsensor`

## Configuration

First thing you need to do is to buy a Tibber Pulse from their store (https://tibber.com/se/store/produkt/pulse-p1).

You then need to create API tokens in Tibbers developer portal. Go to https://developer.tibber.com/ using your Tibber account and `Generate an Access Token`. You then need to go to API Explorer https://developer.tibber.com/explorer, load your personal token and get your unique house ID under `Real time subscription`.

You can now add these values to your homebridge config.json like the example below:
```
{
    "bridge": {
        "name": "Homebridge",
        "username": "B1:12:EF:70:12:42",
        "port": 50611,
        "pin": "012-34-123"
    },
    "accessories": [
        {
            "accessory": "TibberLightSensor",
            "name": "Tibber consumption (Watt)",
            "pullInterval": "1000",
            "apiToken": "ad3ef1ffLvGbgLAbT1Yc12CaoBkLGoL0LFaHAZiAYiA",
            "apiHomeId": "2ff12a12-3ff1-122d-12f1-f111f1212f8e"
        }
    ],
...
```
The pullInterval is how often the lightsensor should be updated with a new value in ms. In our example above it is set to 1 second (1000 ms).

Restart homebridge, and you should now see a lightsensor accessory in one of your room displaying real time data from Tibber. 

