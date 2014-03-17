/**
 * Instapush API client.
 * @package Instapush 
 */

/**
 * Dependencies
 */
var request = require('request');

/**
 * Constructor
 */
function Instapush () {  

    //default API version 
    this.version = 'v1'; 
    this.url = 'api.instapush.im';

}
/**
 * settings  method.
 * @param {object} options
 */
Instapush.prototype.settings = function(options){
        this.version = options.version || this.version;
        this.token = options.token || '';
        this.appid =  options.id || '';
        this.appsecret =  options.secret || '';
        this.ssl =  options.ssl || '';

}

/**
 * Request method.
 *
 * @param {string} Method
 * @param {string} URL
 * @param {string} data
 *
 * @return {Object}
 */
Instapush.prototype.request = function (method, url,data, callback) {
    var self = this;
    var protocole = (self.ssl == true)?'https':'http';
    // Handle params
    if (typeof callback === 'undefined') {
        callback = data;
        data = {};
    }
    // Construct headers
    var headers = { 'x-instapush-token': self.token ,
    'x-instapush-appid':self.appid,
    'x-instapush-appsecret':self.appsecret
    };
    // HTTP request
    request({
        method:     method,
        url:        protocole+'://'+self.url+'/'+self.version+'' + url,
        headers:    headers,
        json:       data
    }, function (err, response, body) {
        console.log(protocole+'://'+self.url+'/'+self.version+'' + url);
        if (err) return callback(err);
        if (response.code < 200 || response.code > 302) return callback(body);
        callback(null, body);
    });
};

/**
 * Notify method.
 * Send push notifications based on application ID and application Secret
 *
 * @param {object} data
 * ex: {"title":"nodejsEvent2",
        "trackers":["name","country"],
        "message":"{name} from {country} sucked."
        };
 * @return {Object}
 */
Instapush.prototype.notify = function (data, callback) {
    var url = '/post';
    this.request('POST', url,data, callback);
};

/**
 * listApps method.
 * List apps of user given his user token
 * @return {Object}
 */
Instapush.prototype.listApps = function (callback) {
    var url = '/apps/list';
    this.request('GET', url, callback);
};

/**
 * listEvents method.
 * List events of specific app  given id and secret of app.
 * @return {Object}
 */

Instapush.prototype.listEvents = function (callback) {
/*        this.appid = options.id || this.appid;
        this.appsecret = options.secret||this.appsecret;*/
    var url = '/events/list';
    this.request('GET',url,callback);
};

/**
 * addEvent method.
 * adds a new event to an app.
 * @param {object} data
 * ex: {"event":"search","trackers":{"term":"api"}
 * @return {Object}
 */

Instapush.prototype.addEvent = function (data, callback) {
    var url = '/events/add';
    this.request('POST', url,data, callback);
};

/**
 * addApp method.
 * adds a new app to a user.
 * @param {object} data
 * ex: {"title":"NodeJSAPP"}
 * @return {Object}
 */

Instapush.prototype.addApp = function (data, callback) {
    var url = '/apps/add';
    this.request('POST', url,data, callback);
};

/**
 * Export
 */
module.exports = new Instapush();

