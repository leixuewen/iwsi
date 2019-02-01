let key;
window.module = new Proxy({exports: {}}, {
    set(obj, prop, val) {
        if (key) {
            obj[prop][key] = val;
            key = null;
        }
    }
});
window.request = function (url, cover) {
    if (!module.exports[url] || cover) {
        key = url;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.send();
        eval(xhr.response);
    }
    return module.exports[url];
};
console.info(request("utils/module.exports.js"));
