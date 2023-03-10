Feature: Quiz Start Button Navigation
    As a user
    I want to click the "Click Here to Start Quiz" button
    So that I can navigate to the first quiz question
    Scenario: User submits form with valid inputs
        Given I am on the base screen
        When I enter a valid email "test@test.com"
        And I enter a valid name "John"
        And I enter a valid phone number "1234567890"
        And I submit the form
        Then I should see the start quiz button
