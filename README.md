
# FM-PROMISE library 

[![NPM version][npm-image]][npm-url]

Makes a batch request to URLs provided as parameter and return a promise

This library uses Promise.all under the hood to make multiple calls.

## Installation and Usage

Set `fm-promise` as a dependency and install it.

```bash
npm i fm-promise --save
```

Then prefix the relevant `require()`s with `fm-promise`:

```js
var fs = require('fm-promise')
//sample URLs
var urls = ['https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json'];

fs.getURLPromise(url).then(function (response) {
  //do something with response
  console.log(response);
}, function(error) {
    //something went wrong
    console.log('error', error);
})
```
## Dependencies

This lib uses request-promise and bluebird for compatibilities' sake under the hood

## Points to note

Parameter of getURLPromise expects an array of valid URLs which return json data.

If you provide an empty array, non-array variable or object as parameter, or a list of strings 
inside array, it will reject the promise and you should catch it in error/catch (in es6) part 
of promise.

## Tests

you can run tests using `npm run test`. 

## FAQ

### Can I provide any URL in an array ?

You should only provide URLs in array which return json data instead of normal data and are 
publically available


### Can I add more features?

Sure, you can add any features

### Are there any other functions by this lib?

Yes there are certain utility functions like isValidURL but we strongly recommend not to use them.
