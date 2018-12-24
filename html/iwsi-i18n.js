let i18n = {
    language: {},
    langDate: {},
    langAttr: 'i18n',
    attribute: '@',
    request: "GET",
    async: true,
    asyncMax: 99,
    asyncMin: 9,
    translate: function (lang) {
        if (this.langDate[lang] === undefined) {
            this.getTranslate(lang);
        } else {
            this.runTranslate(lang);
        }
    },
    getTranslate: function (lang) {
        let _this = this, ajax = new XMLHttpRequest();
        ajax.open(_this.request, _this.language[lang]);
        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4) {
                _this.langDate[lang] = JSON.parse(ajax.response);
                _this.runTranslate(lang);
            }
        };
        ajax.send();
    },
    runTranslate(lang) {
        let _this = this;
        let langAttrData = Array.prototype.slice.call(document.querySelectorAll('[' + _this.langAttr + ']'));
        window._il = langAttrData.length;
        if (!_this.async) {
            _this.startTranslate(langAttrData, lang);
        } else {
            let num = Math.ceil(langAttrData.length / _this.asyncMin);
            num = num > _this.asyncMax ? num : _this.asyncMin;
            for (let i = 0; i < langAttrData.length; i += num) {
                setTimeout(_this.startTranslate(langAttrData.slice(i, i + num), lang));
            }
        }
    },
    startTranslate(obj, lang) {
        let al = this.attribute.length, langDate = this.langDate[lang];
        for (let el of obj) {
            let text = langDate[el.getAttribute(this.langAttr)];
            if (text !== undefined) {
                el.innerHTML = text;
            }
            for (let name of el.getAttributeNames()) {
                let val = langDate[el.getAttribute(name)];
                if (name.substring(0, al) === this.attribute && val !== undefined) {
                    el.setAttribute(name.substring(al, name.length), val);
                    break;
                }
            }
        }
        window._il -= obj.length;
        if (window._il <= 0) {
            this.endTranslate(lang);
        }
    },
    endTranslate(lang) {
        console.log(lang);
    }
};
window.onload = function () {
    i18n.language = {
        'zh_CN': 'zh_CN.json',
        'en_US': 'en_US.json',
    };
    i18n.translate('zh_CN');
};