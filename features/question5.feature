Feature: Quiz Question 5

    As a user,
    I want to answer a question by dragging the correct answer to a blank space
    So that I can test my knowledge of ReactJS

    Scenario: User answers Question 5 correctly
        Given I am on the Question 5 screen
        When I see the questions rendered properly
        And I drag the correct answer to the blank space, and the answer is accepted
        Then I press the "Submit" button, and it should take me to the final submission screen
    Scenario: User answers Question 5 incorrectly
        Given I am on the Question 5 screen
        When I see the question rendered properly
        And I drag an incorrect answer to the blank space, and the answer is rejected
