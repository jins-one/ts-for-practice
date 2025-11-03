import { configs } from './configs';
import LocalStorage from './LocalStorage';

interface ApiArgument {
    token?: string;
    body?: any;
    header?: Record<string, string>;
}
type ApiMethod = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';

interface CreateUrlParameter {
    endPoint: string;
    queryObject?: Record<string, any>;
    urlObject?: Record<string, any>;
}

class ApiConfig {
    protected init: RequestInit = {};
    protected headers: Headers | undefined = undefined;
    protected method: ApiMethod = 'GET';
    protected body: any | undefined = undefined;
    protected token?: string = undefined;

    protected setInit(
        header: Record<string, string> = {},
        token?: string,
        body?: any,
    ) {
        this.setToken(token);
        this.setHeader(header);
        this.setBody(body);
        this.init = {
            method: this.method,
            headers: this.headers,
        };
        if (this.body) {
            this.init.body = this.body;
        }
    }
    protected reset() {
        this.init = {};
        this.headers = undefined;
        this.method = 'GET';
        this.body = undefined;
        this.token = undefined;
    }
    protected getConfig() {
        return this.init;
    }
    protected setToken(token?: string) {
        this.token = token;
    }
    protected setHeader(header: Record<string, string> = {}) {
        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/json');
        if (this.token) {
            this.headers.set('Authorization', `Bearer ${this.token}`);
        }
        if (header) {
            Object.entries(header).forEach(([key, value]) => {
                this.headers!.set(key, value);
            });
        }
    }
    protected setBody(body?: any) {
        if (!body) {
            return;
        }
        this.body = JSON.stringify(body);
    }
}

class ReqApi extends ApiConfig {
    protected baseUrl: string = configs.baseUrl;
    protected url: string = '';
    protected async fetcher<response = any>(url: string, option: RequestInit) {
        const res = await fetch(this.baseUrl + url, option);
        // 에러면 에러 반환
        if (!res.ok) {
            throw new Error(res.status.toString());
        }

        // 1) 응답 본문을 문자열로 가져온다
        const text = await res.text();
        const trimmed = text.trim();

        // 2) 빈 문자열, "null", "undefined" 면 undefined 반환
        if (
            !trimmed ||
            trimmed.toLowerCase() === 'null' ||
            trimmed.toLowerCase() === 'undefined'
        ) {
            return undefined;
        }

        // 3) JSON.parse 시도
        try {
            return JSON.parse(trimmed) as response;
        } catch (err) {
            console.log('JSON parsing error:', err);
            return undefined;
        }
    }
    constructor(url: string) {
        super();
        this.url = url;
    }
    getToken() {
        return LocalStorage.getItem(configs.storageName) ?? undefined;
    }
    get<response = any>({
        token,
        header = {},
    }: Omit<ApiArgument, 'body'> = {}) {
        this.reset();
        this.method = 'GET';
        this.setInit(header, token);
        return this.fetcher<response>(this.url, this.getConfig());
    }
    post<response = any>({ token, body, header = {} }: ApiArgument = {}) {
        this.reset();
        this.method = 'POST';
        this.setInit(header, token, body);
        return this.fetcher<response>(this.url, this.getConfig());
    }
    delete<response = any>({ token, body, header = {} }: ApiArgument = {}) {
        this.reset();
        this.method = 'DELETE';
        this.setInit(header, token, body);
        return this.fetcher<response>(this.url, this.getConfig());
    }
    patch<response = any>({ token, body, header = {} }: ApiArgument = {}) {
        this.reset();
        this.method = 'PATCH';
        this.setInit(header, token, body);
        return this.fetcher<response>(this.url, this.getConfig());
    }
    put<response = any>({ token, body, header = {} }: ApiArgument = {}) {
        this.reset();
        this.method = 'PUT';
        this.setInit(header, token, body);
        return this.fetcher<response>(this.url, this.getConfig());
    }
}

class GenerateUrl {
    protected url: string = ''; // /api/:id/test/:userName
    protected queryUrl: URLSearchParams | null = null;
    protected reset() {
        this.url = '';
        this.queryUrl = null;
    }
    protected generateQueryUrl(querys: Record<string, any>) {
        const arrQuerys = Object.entries(querys);
        this.queryUrl = new URLSearchParams(arrQuerys);
    }
    protected replaceUrlParams(params: Record<string, any>) {
        this.url = this.url.replace(/:([^/]+)/g, (_, key: string) => {
            const value = params[key];
            // undefined 또는 null 이면 토큰 그대로 반환
            if (value === undefined || value === null) {
                return `:${key}`;
            }
            // 문자열로 변환 후 URL-safe 인코딩
            return encodeURIComponent(String(value));
        });
    }

    /**
     * createUrl.createUrl({
     *     endPoint: "/ser/:id",
     *       queryObject: {
     *         id2: 1,
     *       },
     *     urlObject: {
     *       id: 1,
     *     },
     *   })
     * @param param0 endPoint, queryObject, urlObject
     * @returns ReqApi
     */
    createUrl({ endPoint, queryObject, urlObject }: CreateUrlParameter) {
        this.reset();

        if (queryObject) this.generateQueryUrl(queryObject);

        this.url = endPoint;
        if (urlObject) this.replaceUrlParams(urlObject);

        if (this.queryUrl) {
            this.url = this.url + '?' + this.queryUrl;
        }

        return new ReqApi(this.url);
    }
}

export const gu = new GenerateUrl();
