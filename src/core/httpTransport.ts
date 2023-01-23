import { queryStringify } from "../helpres/queryStringify";

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>
type Options = {
    method?: METHODS;
    timeout?: number;
    headers?: { [key: string]: string };
    data?: { [key: string]: string };
};

enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

class HTTPTransport {
    get: HTTPMethod = (url, options = {}) => {
        const query = options.data ? url + queryStringify(options.data) : url;

        return this.request(query, { ...options, method: METHODS.GET }, options.timeout);
    };

    post: HTTPMethod = (url, options = {}) => {
        console.log(url, options);
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    };

    put: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    };

    delete: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    };

    request = (
        url: string,
        options: Options = { method: METHODS.GET },
        timeout = 5000
    ): Promise<XMLHttpRequest> => {
        const { headers = {}, method, data } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject('Метод отсутствует');
                return;
            }

            const xhr = new XMLHttpRequest();

            xhr.open(method, url);
            xhr.responseType = 'json';

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = () => {
                resolve(xhr.response);
            };

            xhr.onerror = reject;
            xhr.onabort = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}

export default HTTPTransport
