Convert Cucumber.js json result file to XML Junit format. Unlike many similar libraries keeps Scenario == Testcase, not Step = Testcase

Installation
------------

To install the latest version, run:

    npm install cucumber-junit-convert --save

Usage
-----

```JavaScript
const cucumberJunitConvert = require('cucumber-junit-convert');

const options = {
    inputJsonFile: '<filename>.json',
    outputXmlFile: '<filename>.xml'
}

cucumberJunitConvert.convert(options);

```

License
-------

[MIT](LICENSE)

Changelog
---------

### 1.0.0
- Initial release
