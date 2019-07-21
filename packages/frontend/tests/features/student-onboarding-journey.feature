Feature: The student onboarding journey

  As a student I want to register myself by the registration journey

  Scenario: Student onboarding
    Given an anonymous student
    When I visit "/"
    Then I should see the Create Journey button
    When I click Create Journey button