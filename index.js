let Service, Characteristic;// i think this is to do with homebridge
const axios = require('axios')
var varEmail =  'xxxxxx' //your login for winix smart america app could be read from homebridge config
var varPassword = 'xxxxxxx' // your password for winix smart america app could be read from homebridge config


//below is a section from /homebridge-winix-c545 i believe for connecting to homebridge server
//module.exports = function (homebridge) {
//    Service = homebridge.hap.Service;
//    Characteristic = homebridge.hap.Characteristic;
//    homebridge.registerAccessory('homebridge-winix-am90', 'WinixAM90', WinixAM90);
//}

function WinixAM90(log, config) {
    this.log = log;
<<<<<<< HEAD
    this.name = 'Air Purifier';
//these are the servers
    this.apiServer = `https://smart.us.gw.winixcorp.com:9903/homedevice/status`;
    this.deviceStatusServer = "https://smart.us.gw.winixcorp.com:9903/homedevice/status";

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
        this.serviceInfo = new Service.AccessoryInformation();

        this.serviceInfo
            .setCharacteristic(Characteristic.Manufacturer, 'Winix')
            .setCharacteristic(Characteristic.Model, 'AM90');

        this.services.push(this.service);
        this.services.push(this.serviceInfo);

        this.init();
      }

//below is a section for statuses that needs to be updated.
//  WinixAM90.prototype = {
//          serverStatuses: {
//              POWER: 'A02',
//              AUTO_MANUAL: 'A03',
//              ROTATION_SPEED: 'A04',
//              PLASMAWAVE: 'A07',
//              AIR_QUALITY: 'S07'
//          },

//        this.getStatusesFromServer();

function getstatusfromserver () {
axios({
        method:'post',
        url: 'https://smart.us.gw.winixcorp.com:9903/homedevice/status',
        data:{   body: {
        "hDId": "ZEROS20180424000184:72:07:23:3A:0E" //not sure if this is device specific
    },
        header:{"deviceId" : "fdasfadlfajskdl;fjaslkd", //insert your deviceid here
        "langCode": "EN",
        "modelName": "iPhone11,8",
        "networkKind": "WIFI",
        "osKind": "IOS",
        "osVer": "14.0.1",
        "reqTime": "20201012124531228",
        "resolution": "320*568",
        'serverUId': "UID0100022637"}}, //crucial to have all these feilds in the post header
        email: varEmail,
        password: varPassword
},)
.then(function (response) {
        this.status = (response.data.body.homeDevice.byteData)
        console.log(this.status)
})}
console.log(getstatusfromserver())

//this will return a code to the console.log which includes everything you need for status,
//i'll do another document that explains what i've learned there
=======
    this.name = config.name || 'Air Purifier';
    this.deviceId = 'DCB50996-C9F1-4AD9-8F48-430F7048F4DA';
    this.user = 'steve.bartlett@mac.com';
    this.password = 'asop7890';

    this.server= `https://smart.us.gw.winixcorp.com:9903/login`;
    this.apiServer = `https://smart.us.gw.winixcorp.com/homedevice/control/${this.deviceId}`;
    this.deviceStatusServer = `https://smart.us.gw.winixcorp.com/homedevice/polling/${this.deviceId}`;
    this.loginServer = `https://smart.us.gw.winixcorp.com/login';

    this.init();
};
const url = `{this.Server}`;
 axios.post(url)
data: {
    username: '{this.user}';
    password: '{this.password}';
}
>>>>>>> b5ef8c1f7959006a7354cecc5a390240e97c3e6a
