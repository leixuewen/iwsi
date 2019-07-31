const ajax = {
    defaults: {
        url: '',
        async: true,
        method: 'GET',
        baseURL: '',
        headers: {},
        params: {},
        timeout: 60000,
    },
    interceptors: {
        request(obj) {
        },
        response(res) {
            return res;
        },
    },
    request(obj) {
        ajax.interceptors.request(obj);
        let xhr = new XMLHttpRequest(), config = {...ajax.defaults, ...obj},
            params = {...obj.params}, parameter = '';
        if(config.async){
            xhr.timeout = config.timeout;
            xhr.ontimeout = () => xhr.abort();
        }
        for (let k of Object.keys(config)) {
            if (ajax.defaults[k] === undefined) {
                params[k] = config[k];
            }
        }
        if (config.headers['Content-Type'] === 'application/json') {
            parameter = JSON.stringify(params);
        } else {
            for (let p of Object.keys(params)) {
                parameter += '&' + p + '=' + params[p];
            }
            if (config.method === 'GET' && parameter) {
                config.url = config.url.indexOf('?') >= 0 ? config.url + parameter : config.url += "?" + parameter.substring(1);
            } else {
                parameter = parameter.substring(1);
            }
        }
        xhr.open(config.method, config.baseURL + config.url, config.async);
        for (let k of Object.keys(config.headers)) {
            xhr.setRequestHeader(k, config.headers[k]);
        }
        return new Promise((resolve, reject) => {
            xhr.onload = () => resolve(ajax.interceptors.response(xhr));
            xhr.onerror = () => reject(ajax.interceptors.response(xhr));
            xhr.send(parameter);
        });
    },
    get(url, obj = {}) {
        obj['url'] = url;
        obj['method'] = 'GET';
        return ajax.request(obj);
    },
    delete(url, obj = {}) {
        obj['url'] = url;
        obj['method'] = 'DELETE';
        return ajax.request(obj);
    },
    head(url, obj = {}) {
        obj['url'] = url;
        obj['method'] = 'HEAD';
        return ajax.request(obj);
    },
    post(url, obj = {}) {
        obj['url'] = url;
        obj['method'] = 'POST';
        return ajax.request(obj);
    },
    put(url, obj = {}) {
        obj['url'] = url;
        obj['method'] = 'PUT';
        return ajax.request(obj);
    },
    patch(url, obj = {}) {
        obj['url'] = url;
        obj['method'] = 'PATCH';
        return ajax.request(obj);
    },
};