const builder = require('junit-report-builder');
const fs = require('fs');
const jsonFile = require('jsonfile');

function convert(options) {
  const jsonFileResult = jsonFile.readFileSync(options.inputJsonFile);
  const reportBuilder = builder.newBuilder();
  jsonFileResult.forEach(function(feature) {
    let durationInSec = 0;
    const suite = reportBuilder.testSuite().name(feature.name);
    feature.elements.forEach(function(scenario) {
      if (scenario.type == 'background') {
        return;
      }

      const result = getScenarioSummary(scenario, options);
      const className = options.featureNameAsClassName ? feature.name : scenario.id;

      durationInSec += result.duration;
      if (result.status === 'failed') {
        
        if (result.embeddings.length) {
          suite
            .testCase()
            .name(scenario.name)
            .className(className)
            .standardError(result.message)
            .errorAttachment(result.embeddings) 
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
  reportBuilder.writeTo(options.outputXmlFile);
}

function getScenarioSummary(scenario, options) {
  let status = 'passed';
  let message = null;
  let duration = 0;
  let embeddings = [];

  scenario.steps.forEach(function(step) {
    if (step.result.duration) {
      duration += step.result.duration;
    }

    if (step.embeddings && step.embeddings.length > 0) {
      for(let i = 0; i < step.embeddings.length; i++){
          embeddings.push(step.embeddings[i].data + '\n')
          
      }
    }

    if (step.result.status == 'failed' || !!options.failOnUndefinedStep && step.result.status == 'undefined') {
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
