[![npm](https://badgen.net/npm/v/homebridge-tibber-lightsensor/latest)](https://www.npmjs.com/package/homebridge-tibber-lightsensor)
[![Try homebridge-tibber-lightsensor on RunKit](https://badge.runkitcdn.com/homebridge-tibber-lightsensor.svg)](https://npm.runkit.com/homebridge-tibber-lightsensor)

# homebridge-tibber-lightsensor
Tibber lightsensor is a plugin for Homebridge which makes it possible to see your real time power consumption from Tibber in iOS/Homekit without the need to install a third party app!

:bulb: The plugin fetches the current watt usage from your Tibber Pulse and displays it as a lightsensor (lux) in Homekit. Using a built in timer, it can update the Home app UI with a new value as often as you'd like. For instance 10 Watt from Tibber API is displayed as 10 lux in Home app.

:heart: This wouldn't be possible without Tibber and their great open API.

## Screenshots

### iOS Home App
<img src="https://i.postimg.cc/N02CCMgQ/Webp-net-gifmaker.gif" width="200" />

### Homebridge Config UI X
<img src="https://i.postimg.cc/gkVDqs5c/tibber.png" />

## Prerequisites

You need to have a Tibber Pulse. You can buy them from their online store:

> https://tibber.com/se/store/produkt/pulse-p1

You will also need two API tokens from Tibber. One personal token, and your house id. Get them at:

> https://developer.tibber.com/

## Installation 
This plugin is published on [npm](https://www.npmjs.com/package/homebridge-tibber-lightsensor) and should be installed globally using:

`npm install -g homebridge-tibber-lightsensor`

## Configuration

You need to create API tokens in Tibbers developer portal. Go to https://developer.tibber.com/ using your Tibber account and `Generate an Access Token`. You then need to go to API Explorer https://developer.tibber.com/explorer, load your personal token and get your unique house ID under `Real time subscription`.

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
The `pullInterval` is how often the lightsensor should be updated with a new value in ms. In our example above it is set to 1 second (1000 ms).

Restart homebridge, and you should now see a lightsensor accessory in one of your rooms displaying real time data from Tibber. 

