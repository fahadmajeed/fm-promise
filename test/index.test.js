import {  expect, assert } from 'chai';
import sinon from 'sinon';
import * as LIB from '../src/index';

describe('FM-promise Test suite', () => {
    describe('Test getURLPromise function', () => {
        it("rejects promise when No parameter provided", (done) => {
            const errorMessage = 'fm-promise library expects array of URLs to process.';
            LIB.getURLPromise().catch(error => {
                expect(error).to.equal(errorMessage);
                done();
            });
        });

        it("rejects promise when empty array provided", ()=> {
            const errorMessage = 'fm-promise library expects at least one URL to process.';
            LIB.getURLPromise([]).catch(error => {
                expect(error).to.equals(errorMessage);
            })
        });
        it("rejects promise if invalid array of URL is provided", () => {
            const urls =['invalid', 'urls'];
            const expected = 'Invalid array of URLs provided';
            LIB.getURLPromise(urls)
            .catch(error => {
                expect(error).to.equal(expected);
            });
        });
        it("rejects promise if valid URL provided but doesn't return response", (done) => {
            const urls =['yahoo.com'];
            const expected = ['No data found'];
            let getPromiseStub = sinon.stub(LIB, 'getURLPromise');
            getPromiseStub.withArgs(urls).rejects(expected);
                
            getPromiseStub(urls)
            .catch(error => {
                expect(error).to.equal(expected);
                done();
            });
            getPromiseStub.restore();
        });
        it("returns array of 3 resolved promises", (done) => {
            const urls = LIB.URLS;
            const expected = 3;
            let getPromiseStub = sinon.stub(LIB, 'getURLPromise');
            getPromiseStub.withArgs(urls).resolves(
                [
                    {
                        "items":[
                                    {
                                        "symbolInput": "GBPUSD",
                                        "basic": {
                                            "symbol": "GBPUSD",
                                            "name": "UK Pound Sterling/US Dollar FX Spot Rate",
                                            "exchange": "SOURCE IS A THOMSON REUTERS CONTRIBUTOR",
                                            "exhangeCode": "RCT",
                                            "bridgeExchangeCode": "CUX"
                                        }
                                    }
                                ]
                    },
                    {
                        "items":[
                                    {
                                        "symbolInput": "GBPUSD",
                                        "basic": {
                                            "symbol": "GBPUSD",
                                            "name": "UK Pound Sterling/US Dollar FX Spot Rate",
                                            "exchange": "SOURCE IS A THOMSON REUTERS CONTRIBUTOR",
                                            "exhangeCode": "RCT",
                                            "bridgeExchangeCode": "CUX"
                                        }
                                    }
                                ]
                    },
                    {
                        "items":[
                                    {
                                        "symbolInput": "GBPUSD",
                                        "basic": {
                                            "symbol": "GBPUSD",
                                            "name": "UK Pound Sterling/US Dollar FX Spot Rate",
                                            "exchange": "SOURCE IS A THOMSON REUTERS CONTRIBUTOR",
                                            "exhangeCode": "RCT",
                                            "bridgeExchangeCode": "CUX"
                                        }
                                    }
                                ]
                    }
                ]);
            getPromiseStub(urls)
            .then(result => {
                expect(result.length).to.equal(expected);
                done();
            })
            .catch(error => {
                done(error);
            });
            getPromiseStub.restore();
        });       
    });
    describe('Test isValidURL function', () => {
        it("returns false when invalid URL is provided", () => {
            const invalidUrl = 'jibberish';
            expect(LIB.isValidURL(invalidUrl, false));
        });

        it("returns true if valid URL is provided", () => {
            const validURL = 'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json';
            expect(LIB.isValidURL(validURL, true));
        });
    });

    describe('Test convertUrlsToPromises function', () => {
        it("returns empty array when empty array of URLs is provided ", () => {
            const expected = [];
            const actual = [];
            expect(LIB.convertUrlsToPromises(actual), expected);
        });

        it("returns 3 elements of array of promises  when 3 elements of URL array is provided", () => {
            const actual = LIB.URLS;
            assert.equal(LIB.convertUrlsToPromises(actual).length, 3);
        });
    });
});