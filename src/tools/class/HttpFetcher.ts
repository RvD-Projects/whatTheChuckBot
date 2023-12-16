import fetch from 'node-fetch';
import { HeadersInit, Headers } from 'node-fetch';

interface IAPIOptions {
    method: string,
    body: string,
    headers: Headers
}


export class HttpFetcher {

    headerMetas: HeadersInit = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        "Connection": "Close"
    };

    fetchOptions: IAPIOptions = {
        method: 'GET',
        headers: new Headers(this.headerMetas),
        body: null
    };

    fetchUrl: string = "https://";
    responseObj: any

    setOption(key: string, value) {
        if (this.fetchOptions.hasOwnProperty(key)) {
            this.fetchOptions[key] = value;
        }
        else {
            throw Error("This option property is not implemented");
        }
    }

    setHeader(key: string, value: string) {
        if (this.headerMetas.hasOwnProperty(key)) {
            this.headerMetas[key] = value;
            this.fetchOptions.headers = new Headers(this.headerMetas);
        }
        else {
            throw Error("This header property is not implemented");
        }
    }

    private async fetch(url: string): Promise<any> {
        this.responseObj = await fetch(url, this.fetchOptions)
            .then(response => response);

        return this.responseObj;
    }

    async get(url: string): Promise<any> {
        this.fetchOptions.method = "GET";
        return await this.fetch(url);
    }

    async post(url: string, bodyJSON: string): Promise<any> {
        this.fetchOptions.method = "POST";
        this.fetchOptions.body = bodyJSON
        return await this.fetch(url);
    }
}

class FetchOptions {
    public method: "GET" | "POST" | "PULL" | "PUT" | "DELETE" | "PATCH";
    public headers: Headers;
    public body: string = '{}'
    public redirect: "Follow"
    public signal: any = null
    public follow: number = 10
    public compress: boolean = false
    public size: number = 0
    public agent: any = null
    public highWaterMark: number = 16384
    public insecureHTTPParser: boolean = false
}