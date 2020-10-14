let Service, Characteristic;

const axios = require('axios');

function WinixC545(log, config) {
    this.log = log;
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
