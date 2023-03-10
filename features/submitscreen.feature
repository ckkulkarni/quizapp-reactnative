Feature: Submit Screen

    Scenario: User submits their quiz and sees their results
        Given the user has completed the quiz is on the Submit Screen
        Then the user should see the details they entered in the home screen
        And the user should see their score in a pie chart
        And the user should see a button to re-enter their details

