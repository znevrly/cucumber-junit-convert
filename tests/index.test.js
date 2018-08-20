const cucumberJunitConvert = require('../index');
const fs = require('fs');
const jsonFile = require('jsonfile');
const jsonCase = jsonFile.readFileSync('./tests/resources/cases.json', 'utf8');

function testAll() {
    jsonCase.forEach((testcase) => {
        test('Testcase: ' + testcase.case, () => {
            let options = {
                inputJsonFile: './tests/resources/test-input-' + testcase.file + '.json',
                outputXmlFile: './tests/resources/test-output-' + testcase.file + '.xml'
            };
            cucumberJunitConvert.convert(options);
            expect(testFun(options.outputXmlFile)).toMatch(verifyFun(testcase));
            fs.unlink(options.outputXmlFile, (err) => {
                if (err)
                    throw err;
            });
        });
    });
}

function verifyFun(testcase) {
    if (testcase.toMatch !== undefined) {
        return new RegExp(testcase.toMatch);
    } else {
        return fs.readFileSync('./tests/resources/test-verify-' + testcase.file + '.xml', 'utf8');
    }
}
function testFun(filename) {
    return fs.readFileSync(filename, 'utf8');
}
testAll();