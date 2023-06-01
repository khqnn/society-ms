"use strict";
exports.__esModule = true;
exports.generateHashFromString = void 0;
var createHash = require('crypto').createHash;
var generateHashFromString = function (str) {
    return createHash('sha256').update(str).digest('hex');
};
exports.generateHashFromString = generateHashFromString;
