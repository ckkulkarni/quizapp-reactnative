Feature: Quiz Question 4

    As a user
    I want to answer the third quiz question
    So that I can test my knowledge on ReactJS

    Scenario: User answers third quiz question correctly
        Given I am on the Question 4 screen
        When I select the correct answer and press "Answer", then the score should update
        When I select any of the numbers above the questions, then it should navigate to that respective question screen
        Then I navigate to the next question when I click on the "Next Question" button

    Scenario: User answers third quiz question incorrectly
        Given I am on the Question 4 screen
        When I select an incorrect answer and press "Answer", then the score should remain the same
