<a href="https://snyk.io/test/github/znevrly/cucumber-junit-convert"><img src="https://snyk.io/test/github/znevrly/cucumber-junit-convert/badge.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/znevrly/cucumber-junit-convert" style="max-width:100%;"></a>


Convert Cucumber.js json result file to XML Junit format. Unlike many similar libraries keeps Scenario = Testcase, not Step = Testcase.

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
### 1.1.1
- fixed https://github.com/znevrly/cucumber-junit-convert/issues/5

### 1.1.0
- test cases are marked as skipped when at least one step was pending or skipped, and there was no failure
- update dependencies

### 1.0.2
- fix typo

### 1.0.1
- Add classname to testcase

### 1.0.0
- Initial release
