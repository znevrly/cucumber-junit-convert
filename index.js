const builder = require('junit-report-builder');
const fs = require('fs');
const jsonFile = require('jsonfile');

function convert(options) {
  const jsonFileResult = jsonFile.readFileSync(options.inputJsonFile);
  jsonFileResult.forEach(function(feature) {
    let durationInSec = 0;
    const suite = builder.testSuite().name(feature.name);
    feature.elements.forEach(function(scenario) {
      if (scenario.type == 'background') {
        return;
      }

      const result = getScenarioSummary(scenario);
      durationInSec += result.duration;
      if (result.status === 'failed') {
        const className = options.featureNameAsClassName ? feature.name : scenario.id;
        
        if (result.embeddings.length) {
          suite
            .testCase()
            .name(scenario.name)
            .className(className)
            .standardError(result.message)
            .errorAttachment(result.embeddings[0])
            .failure(result.message)
            .time(result.duration);
        } else {
          suite
            .testCase()
            .name(scenario.name)
            .className(className)
            .failure(result.message)
            .time(result.duration);
        }
      } else if (result.status === 'skipped') {
        suite
          .testCase()
          .name(scenario.name)
          .className(className)
          .skipped()
          .time(result.duration);
      } else {
        suite
          .testCase()
          .name(scenario.name)
          .className(className)
          .time(result.duration);
      }
    });
    suite.time(durationInSec);
  });
  builder.writeTo(options.outputXmlFile);
}

function getScenarioSummary(scenario) {
  let status = 'passed';
  let message = null;
  let duration = 0;
  let embeddings = [];

  scenario.steps.forEach(function(step) {
    if (step.result.duration) {
      duration += step.result.duration;
    }

    if (step.embeddings && step.embeddings.length > 0) {
      embeddings.push(step.embeddings[0].data);
    }

    if (step.result.status == 'failed') {
      status = 'failed';
      message = step.result.error_message;
    } else if (
      status == 'passed' &&
      (step.result.status == 'pending' || step.result.status == 'skipped')
    ) {
      status = 'skipped';
    }
  });
  const durationInSec = duration / 1000000000; //ns to sec

  return {
    status: status,
    message: message,
    duration: durationInSec,
    embeddings
  };
}

module.exports = {
  convert: convert
};
