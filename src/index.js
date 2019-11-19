const Promise = require('bluebird');
const requestPromise = require('request-promise');

export const URLS = [
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json'
    ];

export const isValidURL = str => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

export const convertUrlsToPromises = urls => {
    let urlsArray = [];
    urls.forEach(url => {
        if (isValidURL(url)) {
            urlsArray.push(requestPromise({
                "method":"GET", 
                "uri": url,
                "json": true
            }).catch(e=> console.log(`URL ${url} failed and error is ${e.message}`))
            );
        }
            
    });
    return urlsArray;
}
const validateParams = (urls, reject) => {
    if (!Array.isArray(urls)) {
        reject('fm-promise library expects array of URLs to process.');
    }
    if (Array.isArray(urls) && urls.length <= 0) {
        reject('fm-promise library expects at least one URL to process.');
    }
}
export const getURLPromise = urls => {
    return new Promise((resolve, reject) => {
        
        //validate parameters
        validateParams(urls, reject);

        const promises = convertUrlsToPromises(urls);
        if (!promises.length) {
            reject('Invalid array of URLs provided');
        }
        if (promises.length > 0) {
            Promise.all(promises)
            .then(response => {
                let data = response.map(res => {
                    if (res)
                        return {...res}
                });
                if(!data) {
                    reject('No data found');
                } else if(data[0] === undefined) {
                    reject('No data found');
                } else {
                    resolve(data);
                }
                
            })
            .catch(error=> {
                reject(error.message);
            });
        }
    });    
}