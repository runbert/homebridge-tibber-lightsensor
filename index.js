"use strict";

let Service, Characteristic, api;

const TibberFeed = require("tibber-api").TibberFeed;
const PullTimer = require("homebridge-http-base").PullTimer;
const PackageJson = require('./package.json');
var IConfig = require("tibber-api").IConfig;
var currentPowerConsumption = 0;

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    api = homebridge;

    homebridge.registerAccessory(PackageJson.name, "TibberLightSensor", TibberLightSensor);
};

function TibberLightSensor(log, config) {
    this.log = log;
    this.name = config.name;

    // Minimum Lux value.
    this.minSensorValue = 0;

    // Maximum Lux value.
    this.maxSensorValue = 65536;

    this.homebridgeService = new Service.LightSensor(this.name);
    this.homebridgeService.getCharacteristic(Characteristic.CurrentAmbientLightLevel)
        .setProps({
                    minValue: this.minSensorValue,
                    maxValue: this.maxSensorValue
                })
        .on("get", this.getSensorValue.bind(this));

    // Timer to automatically update light sensor value with latest received value from Tibber API.
    if (config.pullInterval) {
        this.pullTimer = new PullTimer(log, config.pullInterval, this.getSensorValue.bind(this), value => {
            this.homebridgeService.setCharacteristic(Characteristic.CurrentAmbientLightLevel, value);
        });

        this.pullTimer.start();
    }

    startTibber(log, config);
}

function startTibber(log, config) {
    // Tibber API Tokens
    const token = config.apiToken;
    const homeId = config.apiHomeId;
 
    // Config object needed when instantiating TibberQuery.
    IConfig = {
        // Endpoint configuration.
        apiEndpoint: {
            apiKey: token,
            feedUrl: 'wss://api.tibber.com/v1-beta/gql/subscriptions',
        },
        // Query configuration.
        homeId: homeId,
        timestamp: true,
        power: true,
    };

    // Creates a new instance of TibberFeed with the desired configuration and timeout. 
    // The timeout is used for reconnection when no data is received within the specified time.
    const tibberFeed = new TibberFeed(IConfig, 30000);

    // Subscribe to "data" event.
    tibberFeed.on('data', data => {
        currentPowerConsumption = data.power;
    });

    // Subscribe to "connected" event.
    tibberFeed.on('connected', message => {
        log.info('Successfully connected to Tibber API!')
    });

    // Subscribe to "disconnected" event.
    tibberFeed.on('disconnected', message => {
        log.info('Disconnected from Tibber API. ' + message)
        startTibber(log, config);
    });

    // Connect to Tibber data feed.
    tibberFeed.connect();
}

TibberLightSensor.prototype = {

    identify: function (callback) {
      this.log.info("Identify requested");
      callback(null);
    },

    getServices: function () {
        const informationService = new Service.AccessoryInformation();

        informationService
            .setCharacteristic(Characteristic.Manufacturer, PackageJson.author.name)
            .setCharacteristic(Characteristic.Model, PackageJson.name)
            .setCharacteristic(Characteristic.SerialNumber, '001')
            .setCharacteristic(Characteristic.FirmwareRevision, PackageJson.version);

        return [informationService, this.homebridgeService];
    },

    getSensorValue: function (callback) {
        // this.log.info('Getting current power consumption: ' + currentPowerConsumption + ' W');
        callback(null, currentPowerConsumption)
    },

};