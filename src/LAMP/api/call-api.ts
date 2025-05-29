const configs = {
    baseUrl: '',
};
interface ApiArgument {
    token?: string;
    body?: any;
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

    protected setInit(token?: string, body?: any) {
        this.reset();
        this.setToken(token);
        this.setHeader();
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

    protected setHeader() {
        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/json');
        if (!this.token) {
            return;
        }
        this.headers.set('Authorization', `Bearer ${this.token}`);
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

    protected url = '';

    protected async fetcher<response = any>(url: string, option: RequestInit) {
        const res = await fetch(this.baseUrl + url, option);
        // 에러면 에러 반환
        if (!res.ok) {
            throw new Error(res.status.toString());
        }

        try {
            return res.json() as response;
        } catch (err) {
            return {} as response;
        }
    }

    constructor(url: string) {
        super();
        this.url = url;
    }

    getToken() {
        // return LocalStorage.getItem(configs.storageName) ?? undefined;
    }

    get<response = any>({ token }: Omit<ApiArgument, 'body'> = {}) {
        this.method = 'GET';
        this.setInit(token);
        return this.fetcher<response>(this.url, this.getConfig());
    }

    post<response = any>({ token, body }: ApiArgument = {}) {
        this.method = 'POST';
        this.setInit(token, body);
        return this.fetcher<response>(this.url, this.getConfig());
    }

    delete<response = any>({ token, body }: ApiArgument = {}) {
        this.method = 'DELETE';
        this.setInit(token, body);
        return this.fetcher<response>(this.url, this.getConfig());
    }

    patch<response = any>({ token, body }: ApiArgument = {}) {
        this.method = 'PATCH';
        this.setInit(token, body);
        return this.fetcher<response>(this.url, this.getConfig());
    }

    put<response = any>({ token, body }: ApiArgument = {}) {
        this.method = 'PUT';
        this.setInit(token, body);
        return this.fetcher<response>(this.url, this.getConfig());
    }
}

class GenerateUrl {
    protected url = ''; // /api/:id/test/:userName

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
            this.url = `${this.url}?${this.queryUrl}`;
        }

        return new ReqApi(this.url);
    }
}

export const gu = new GenerateUrl();
