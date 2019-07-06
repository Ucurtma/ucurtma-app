Feature: The student onboarding journey

  As a student I want to register myself by the registration journey

  Scenario: Student onboarding
    Given an anonymous student
    When I visit "/"
    Then I should see the Create Journey button
    When I click Create Journey button
    Then I should be redirected to "/create-journey"
    And I should see the continue button
    When I click the continue button
    Then I should see the "Welcome to your boarding journey, are you ready?" journey step
    When I fill the form correctly
    And I click Signup button
    Then I should see the "Upload documents, Verify yourself." journey step
    When I upload a file to second dropbox
    Then I should see the "Wait and prepare for a war." journey step