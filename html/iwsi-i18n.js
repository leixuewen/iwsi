let i18n = {
    language: {},
    langDate: {},
    langAttr: 'i18n',
    attribute: '@',
    i18nCSS: 'i18nCSS',
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
        this.tabCSS(lang);
    },
    getTranslate: function (lang) {
        let _this = this, ajax = new XMLHttpRequest();
        ajax.open(_this.request, _this.language[lang].json);
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
    tabCSS(lang) {
        let link = document.querySelector("link[" + this.i18nCSS + "]");
        if (link === null) {
            link = document.createElement("link");
            link.setAttribute("rel", "stylesheet");
            link.setAttribute(this.i18nCSS, "");
            document.getElementsByTagName("head")[0].appendChild(link);
        }
        link.setAttribute("href", this.language[lang].css);
    },
    endTranslate(lang) {
        console.log(lang);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    i18n.language = {
        'zh_CN': {
            json: 'zh_CN.json',
            css: 'zh_CN.css',
        },
        'en_US': {
            json: 'en_US.json',
            css: 'en_US.css',
        }
    };
    i18n.translate('zh_CN');
});