"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpFetcher = void 0;
const node_fetch_1 = require("node-fetch");
const fetch = require('node-fetch');
class HttpFetcher {
    headerMetas = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        "Connection": "Close"
    };
    fetchOptions = {
        // These properties are part of the Fetch Standard
        method: 'GET',
        headers: new node_fetch_1.Headers(this.headerMetas),
        body: null,
        redirect: 'follow',
        signal: null,
        // The following properties are node-fetch extensions
        follow: 20,
        compress: true,
        size: 0,
        agent: null,
        highWaterMark: 16384,
        insecureHTTPParser: false // Use an insecure HTTP parser that accepts invalid HTTP headers when `true`.
    };
    fetchUrl = "https://";
    responseObj = {};
    constructor(method, url, headers, options) {
        if (options) {
            this.fetchOptions = options;
        }
        if (headers) {
            headers = new node_fetch_1.Headers(headers);
            this.fetchOptions.headers = headers;
        }
        this.fetchUrl = url;
        this.fetchOptions.method = method.toUpperCase();
    }
    setOption(key, value) {
        if (this.fetchOptions.hasOwnProperty(key))
            this.fetchOptions[key] = value;
    }
    setHeader(key, value) {
        if (this.headerMetas.hasOwnProperty(key)) {
            this.headerMetas[key] = value;
            this.fetchOptions.headers = new node_fetch_1.Headers(this.headerMetas);
        }
    }
    execute() {
        this.responseObj = fetch(this.fetchUrl, this.fetchOptions)
            .then(response => response.json());
        return this.responseObj;
    }
}
exports.HttpFetcher = HttpFetcher;
