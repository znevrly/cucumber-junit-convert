Feature: Converter

  Addition is great as a verification exercise to get the Cucumber-js infrastructure up and running

  Scenario: Converter writes in output file
    Given converter is initialized
    When input file "./tests/resources/default-cucumber-report.json" is converted to output "./tests/resources/output.xml"
    Then result "./tests/resources/output.xml" should not be empty