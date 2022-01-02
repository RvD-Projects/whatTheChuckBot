import { HeaderInit, Headers } from 'node-fetch';
const fetch = require('node-fetch');


export class HttpFetcher {

    headerMetas:HeaderInit = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        "Connection": "Close"
    };

    fetchOptions:any = {
        // These properties are part of the Fetch Standard
        method: 'GET',
        headers: new Headers(this.headerMetas),
        body: null,                 // Request body. can be null, or a Node.js Readable stream
        redirect: 'follow',         // Set to `manual` to extract redirect headers, `error` to reject redirect
        signal: null,               // Pass an instance of AbortSignal to optionally abort requests

        // The following properties are node-fetch extensions
        follow: 20,                 // maximum redirect count. 0 to not follow redirect
        compress: true,             // support gzip/deflate content encoding. false to disable
        size: 0,                    // maximum response body size in bytes. 0 to disable
        agent: null,                // http(s).Agent instance or function that returns an instance (see below)
        highWaterMark: 16384,       // the maximum number of bytes to store in the internal buffer before ceasing to read from the underlying resource.
        insecureHTTPParser: false	// Use an insecure HTTP parser that accepts invalid HTTP headers when `true`.
    };

    fetchUrl:string = "https://";
    responseObj:any = {};

    constructor(method:string, url:string,
        headers?:HeaderInit,
        options?:any
    ) {

        if(options){
            this.fetchOptions = options;
        }

        if(headers){
            headers = new Headers(headers);
            this.fetchOptions.headers = headers;
        }
        this.fetchUrl = url;
        this.fetchOptions.method = method.toUpperCase();
    }

    setOption(key:string, value) {
        if( this.fetchOptions.hasOwnProperty(key) )
            this.fetchOptions[key] = value;
    }

    setHeader(key:string, value:string) {
        if( this.headerMetas.hasOwnProperty(key) ) {
            this.headerMetas[key] = value;
            this.fetchOptions.headers = new Headers(this.headerMetas);
        }
    }

    execute():any {
        this.responseObj = fetch(this.fetchUrl, this.fetchOptions)
			.then(response => response.json());
        return this.responseObj;
    }
    
}