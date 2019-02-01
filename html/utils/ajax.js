let ajax = {
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    request(obj) {
        obj.method = obj.method || "GET";
        obj.data = obj.data || {};
        obj.headers = obj.headers || this.headers;
        let xhr = new XMLHttpRequest(), parameter = (() => {
            let date;
            for (let h of Object.keys(obj.headers)) {
                this.headers[h] = obj.headers[h];
            }
            for (let o of Object.keys(obj.data)) {
                date = "&" + o + "=" + obj.data[o];
            }
            if (date && obj.method.toLocaleUpperCase() === "POST") {
                return date.substring(1);
            }
            if (date && obj.method.toLocaleUpperCase() === "GET") {
                if (obj.url.indexOf("?") >= 0) {
                    obj.url += date;
                } else {
                    obj.url += "?" + date.substring(1);
                }
            }
        })();
        xhr.open(obj.method, obj.url, !obj.async);
        xhr.timeout = obj.timeout;
        for (let h of Object.keys(this.headers)) {
            xhr.setRequestHeader(h, this.headers[h]);
            if (this.headers[h].toLocaleLowerCase() === "application/json") {
                parameter = JSON.stringify(obj.data);
            }
        }
        return new Promise((resolve, reject) => {
            xhr.onload = function () {
                resolve(xhr);
            };
            xhr.onerror = function () {
                reject(xhr);
            };
            xhr.ontimeout = function () {
                xhr.abort();
            };
            xhr.send(parameter);
        });
    },
    get(url, obj) {
        obj["url"] = url;
        obj['method'] = "GET";
        return this.request(obj);
    },
    post(url, obj) {
        obj["url"] = url;
        obj['method'] = "POST";
        return this.request(obj);
    },
    getJSON(url) {
        return this.requestJSON("GET", url);
    },
    postJSON(url) {
        return this.requestJSON("POST", url);
    },
    requestJSON(method, url) {
        return new Promise((resolve, reject) => {
            this.request({
                method: method,
                url: url,
                timeout: 1000,
            }).then(res => {
                resolve(JSON.parse(res.response));
            }).catch(e => {
                reject(e);
            });
        });
    },
};
ajax.postJSON("/html/i18n/json/zh_CN.json").then(res => {
    console.info(res);
});
