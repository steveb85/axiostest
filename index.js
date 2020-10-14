let Service, Characteristic;

const axios = require('axios');

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory('homebridge-winix-c545', 'WinixC545', 'WinixC545', 'WinixAM90');
}

function WinixC545(log, config) {
    this.log = log;
    this.name = config.name || 'Air Purifier';
    this.deviceId = config.deviceId;
    this.user = config.user;
    this.password = config.password;

    this.apiServer = `https://smart.us.gw.winixcorp.com/homedevice/control/${this.deviceId}`;
    this.deviceStatusServer = `https://smart.us.gw.winixcorp.com/homedevice/polling/${this.deviceId}`;
    this.loginServer = `https://smart.us.gw.winixcorp.com/login';
    this.showAirQuality = config.showAirQuality || false;
    this.nameAirQuality = config.nameAirQuality || 'Air Quality';
    this.showPlasmawave = config.showPlasmawave || false;
    this.device = null;
    this.services = [];
    if (!this.deviceId) {
        throw new Error('Your must provide deviceId of the Air Purifier.');
    }
    this.service = new Service.AirPurifier(this.name);
    this.service
        .getCharacteristic(Characteristic.Active)
        .on('get', this.getActiveState.bind(this))
        .on('set', this.setActiveState.bind(this));
    this.service
        .getCharacteristic(Characteristic.CurrentAirPurifierState)
        .on('get', this.getCurrentAirPurifierState.bind(this));
    this.service
        .getCharacteristic(Characteristic.TargetAirPurifierState)
        .on('get', this.getTargetAirPurifierState.bind(this))
        .on('set', this.setTargetAirPurifierState.bind(this));
    this.service
        .getCharacteristic(Characteristic.RotationSpeed)
        .on('get', this.getRotationSpeed.bind(this))
        .on('set', this.setRotationSpeed.bind(this));
    if (this.showPlasmawave) {
        this.switchService = new Service.Switch(this.name + ' Plasmawave');
        this.switchService
            .getCharacteristic(Characteristic.On)
            .on('get', this.getPlasmawave.bind(this))
            .on('set', this.setPlasmawave.bind(this));
        this.services.push(this.switchService);
    }
    this.serviceInfo = new Service.AccessoryInformation();
    this.serviceInfo
        .setCharacteristic(Characteristic.Manufacturer, 'Winix')
        .setCharacteristic(Characteristic.Model, 'AM90');
    this.services.push(this.service);
    this.services.push(this.serviceInfo);
    if (this.showAirQuality) {
        this.airQualitySensorService = new Service.AirQualitySensor(this.nameAirQuality);
        this.airQualitySensorService
            .getCharacteristic(Characteristic.AirQuality)
            .on('get', this.getAirQuality.bind(this));
        this.services.push(this.airQualitySensorService);
    }
    this.init();
}
;
