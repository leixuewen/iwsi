let generateStrUtil = {
    BINARY: "01",
    OCTAL: "01234567",
    HEXADECIMAL: "0123456789acbdef",
    ALPHABET: "acbdefghijklmnopqrstuvwxyz",
    ALPHABET_SIZE: "acbdefghijklmnopqrstuvwxyzACBDEFGHIJKLMNOPQRSTUVWXYZ",
    generateStr: function (bytes, num) {
        let s = '';
        for (var i = 0; i < num; i++) {
            s += bytes.substr(Math.floor(Math.random() * bytes.length), 1);
        }
        return s;
    },
    generateBinary: function (num) {
        return this.generateStr(this.BINARY, num);
    },
    generateOctal: function (num) {
        return this.generateStr(this.OCTAL, num);
    },
    generateHexadecimal: function (num) {
        return this.generateStr(this.HEXADECIMAL, num);
    },
    generateAlphabet: function (num) {
        return this.generateStr(this.ALPHABET, num);
    },
    generateAlphabetSize: function (num) {
        return this.generateStr(this.ALPHABET_SIZE, num);
    }
}

// console.info(generateStrUtil.generateAlphabetSize(99));
// console.info(generateStrUtil.generateStr("!@#$%^&*()", 99));