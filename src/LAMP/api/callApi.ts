import { ApiConfig } from './ApiConfig';

interface ApiArgument {
    url: string;
    token?: string;
    body?: any;
}
async function fetcher<response = unknown>(url: string, option: RequestInit) {
    const res = await fetch(url, option);
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
class ReqApi extends ApiConfig {
    baseUrl = 'https://analysis.doctorpresso.com';

    get<response = any>({ url, token }: ApiArgument) {
        this.method = 'GET';
        this.setInit(token);
        return fetcher<response>(this.baseUrl + url, this.getConfig());
    }

    post<response = any>({ url, token, body }: ApiArgument) {
        this.reset();
        this.method = 'POST';
        this.setInit(token, body);
        return fetcher<response>(this.baseUrl + url, this.getConfig());
    }

    delete<response = any>({ url, token, body }: ApiArgument) {
        this.reset();
        this.method = 'DELETE';
        this.setInit(token, body);
        return fetcher<response>(this.baseUrl + url, this.getConfig());
    }

    patch<response = any>({ url, token, body }: ApiArgument) {
        this.reset();
        this.method = 'PATCH';
        this.setInit(token, body);
        return fetcher<response>(this.baseUrl + url, this.getConfig());
    }

    put<response = any>({ url, token, body }: ApiArgument) {
        this.reset();
        this.method = 'PUT';
        this.setInit(token, body);
        return fetcher<response>(this.baseUrl + url, this.getConfig());
    }
}

export const reqApi = new ReqApi();
