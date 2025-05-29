type ApiMethod = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';
export class ApiConfig {
    init: RequestInit = {};

    headers: Headers | undefined = undefined;

    method: ApiMethod = 'GET';

    body: any | undefined = undefined;

    token?: string = undefined;

    public setInit(token?: string, body?: any) {
        this.setToken(token);
        this.setHeader();
        this.setBody(body);

        this.init = {
            method: this.method,
            headers: this.headers,
        };
        if (typeof body !== 'object') {
            throw new Error('Api body cannot be String');
        }
        if (this.body) {
            this.init.body = this.body;
        }
    }

    public reset() {
        this.init = {};
        this.headers = undefined;
        this.method = 'GET';
        this.body = undefined;
        this.token = undefined;
    }

    public getConfig() {
        return this.init;
    }

    private setToken(token?: string) {
        this.token = token;
    }

    private setHeader() {
        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/json');
        if (!this.token) {
            return;
        }
        this.headers.set('Authorization', `Bearer ${this.token}`);
    }

    private setBody(body?: any) {
        if (!body) {
            return;
        }
        this.body = JSON.stringify(body);
    }
}
