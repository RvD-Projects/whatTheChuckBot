import { HeadersInit, Headers } from 'node-fetch';
const httpFetch = require('node-fetch');


export class HttpFetcher {

    headerMetas:HeadersInit = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        "Connection": "Close"
    };

    fetchOptions:FetchOptions = {
        // These properties are part of the Fetch Standard
        method: 'GET',
        headers: new Headers(this.headerMetas),
        body: null,                 // Request body. can be null, or a Node.js Readable stream
        redirect: 'Follow',         // Set to `manual` to extract redirect headers, `error` to reject redirect
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
    responseObj:any

    setOption(key:string, value) {
        if( this.fetchOptions.hasOwnProperty(key) ){
            this.fetchOptions[key] = value;
        }
        else {
            throw Error("This option property is not implemented");
        }
    }

    setHeader(key:string, value:string) {
        if( this.headerMetas.hasOwnProperty(key) ) {
            this.headerMetas[key] = value;
            this.fetchOptions.headers = new Headers(this.headerMetas);
        }
        else {
            throw Error("This header property is not implemented");
        }
    }

    private async fetch():Promise<any> {
        this.responseObj = await httpFetch(this.fetchUrl, this.fetchOptions)
			.then(response => response.json());
        return this.responseObj;
    }

    async get(url:string):Promise<any> {
        this.fetchUrl = url;
        this.fetchOptions.method = "GET";
        return await this.fetch();
    }
    async post(url:string, bodyJSON:string):Promise<any> {
        this.fetchUrl = url;
        this.fetchOptions.method = "GET";
        this.fetchOptions.body = bodyJSON
        return await this.fetch();
    }
    
}


class FetchOptions {
    public method: "GET" | "POST" | "PULL" | "PUT" | "DELETE" | "PATCH";
    public headers:Headers;
    public body:string = '{}'
    public redirect: "Follow"
    public signal:any = null
    public follow:number = 10
    public compress:boolean = false
    public size:number = 0
    public agent:any = null
    public highWaterMark:number = 16384
    public insecureHTTPParser:boolean = false
}