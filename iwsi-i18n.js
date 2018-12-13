let i18n = {
    language: [],
    langDate: {},
    dataName: '',
    async: true,
    asyncMax: 9,
    asyncMin: 100,
    translate: function (language) {
        if (langDate[language]) {

        } else {

        }
    },
}
window.onload = function () {
    i18n.language = [
        {'zh_CN': '/zh_CN'},
        {'en_US': '/en_US'},
    ];
    i18n.dataName = "translate";
    i18n.translate('zh_CN');
}