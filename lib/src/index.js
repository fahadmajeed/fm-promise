'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Promise = require('bluebird');
var requestPromise = require('request-promise');

var URLS = exports.URLS = ['https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json', 'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json', 'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json'];

var isValidURL = exports.isValidURL = function isValidURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
};

var convertUrlsToPromises = exports.convertUrlsToPromises = function convertUrlsToPromises(urls) {
    var urlsArray = [];
    urls.forEach(function (url) {
        if (isValidURL(url)) {
            urlsArray.push(requestPromise({
                "method": "GET",
                "uri": url,
                "json": true
            }).catch(function (e) {
                return console.log('URL ' + url + ' failed and error is ' + e.message);
            }));
        }
    });
    return urlsArray;
};
var validateParams = function validateParams(urls, reject) {
    if (!Array.isArray(urls)) {
        reject('fm-promise library expects array of URLs to process.');
    }
    if (Array.isArray(urls) && urls.length <= 0) {
        reject('fm-promise library expects at least one URL to process.');
    }
};
var getURLPromise = exports.getURLPromise = function getURLPromise(urls) {
    //validate parameters
    return new Promise(function (resolve, reject) {
        validateParams(urls, reject);

        var promises = convertUrlsToPromises(urls);
        if (!promises.length) {
            reject('Invalid array of URLs provided');
        }
        if (promises.length > 0) {
            Promise.all(promises).then(function (response) {
                var data = response.map(function (res) {
                    if (res) return _extends({}, res);
                });
                resolve(data);
            }).catch(function (error) {
                reject(error.message);
            });
        }
    });
};
//# sourceMappingURL=index.js.map