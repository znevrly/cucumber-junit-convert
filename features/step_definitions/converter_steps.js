const assert = require('assert');
const fs = require('fs');
const {Before, Given, When, Then} = require('cucumber');

let cucumberJunitConvert;
let output = "";

Given('converter is initialized', function () {
    cucumberJunitConvert = require('../../index');
});

When('input file {string} is converted to output {string}', function (inputFile, outputFile) {
    const options = {
        inputJsonFile: inputFile,
        outputXmlFile: outputFile
    };
    output = outputFile;
    cucumberJunitConvert.convert(options);
});

Then('result {string} should not be empty', function (output) {
    const fileContent = fs.readFileSync(output, 'utf8');
    assert.equal(fileContent.length > 0, true);
});