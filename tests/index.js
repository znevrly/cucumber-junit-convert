const cucumberJunitConvert = require('../index');

const options = {
    inputJsonFile: './tests/resources/default-cucumber-report.json',
    outputXmlFile: './tests/resources/test-report.xml',
    featureNameAsClassName: false,
    failOnUndefinedStep: false
}

cucumberJunitConvert.convert(options);
