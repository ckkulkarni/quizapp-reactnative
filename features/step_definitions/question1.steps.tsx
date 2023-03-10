import {fireEvent, render, waitFor} from '@testing-library/react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {loadFeature, defineFeature} from 'jest-cucumber';
import {QuizContext} from './../../Apps/QuizContext';
import {View, TextInput, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Question1 from './../../Apps/Question1';
const uuid = uuidv4();
const feature = loadFeature('./features/question1.feature');
const navigation = useNavigation<NativeStackNavigationProp<any>>();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn().mockReturnValue({
      navigate: jest.fn(),
    }),
  };
});
defineFeature(feature, test => {
  const mockQuizContext = {
    score: 0,
    setScore: jest.fn(),
    name: 'chandu',
    setName: jest.fn(),
    email: 'chandra@chandu.com',
    setMail: jest.fn(),
    phone: '1234567890',
    setPhone: jest.fn(),
    selectedValue: 'ReactJS',
    setSelected: jest.fn(),
    trackScore: true,
    setTracker: jest.fn(),
  };
  test('User answers first quiz question correctly', ({
    given,
    when,
    then,
    and,
  }) => {
    given('I am on the Question 1 screen', () => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Question1 />
        </QuizContext.Provider>,
      );
      expect(screen.getByTestId('questionContainer')).toBeDefined();
    });
    when(
      'I select the correct answer and press "Answer", then the score should update',
      () => {
        const screen = render(
          <QuizContext.Provider value={mockQuizContext}>
            <Question1 />
          </QuizContext.Provider>,
        );
        fireEvent.press(screen.getByTestId('answer-0'));
        fireEvent.press(screen.getByTestId('answerButton'));
        expect(mockQuizContext.setScore).toBeCalledWith(1);
      },
    );
    when(
      'I select any of the numbers above the questions, then it should navigate to that respective question screen',
      async () => {
        await waitFor(() => {
          const screen = render(
            <QuizContext.Provider value={mockQuizContext}>
              <Question1 />
            </QuizContext.Provider>,
          );
          fireEvent.press(screen.getByTestId('navigate-to-1'));
          expect(navigation.navigate).toBeCalledWith('Question 2');
          fireEvent.press(screen.getByTestId('navigate-to-2'));
          expect(navigation.navigate).toBeCalledWith('Question 3');
          fireEvent.press(screen.getByTestId('navigate-to-3'));
          expect(navigation.navigate).toBeCalledWith('Question 4');
          fireEvent.press(screen.getByTestId('navigate-to-4'));
          expect(navigation.navigate).toBeCalledWith('Question 5');
        });
      },
    );
    then(
      'I navigate to the next question when I click on the "Next Question" button',
      async () => {
        await waitFor(() => {
          const screen = render(
            <QuizContext.Provider value={mockQuizContext}>
              <Question1 />
            </QuizContext.Provider>,
          );
          fireEvent.press(screen.getByTestId('question2'));
          expect(navigation.navigate).toBeCalledWith('Question 2');
        });
      },
    );
  });
  test('User answers first quiz question incorrectly', ({given, when}) => {
    given('I am on the Question 1 screen', () => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Question1 />
        </QuizContext.Provider>,
      );
      expect(screen.getByTestId('questionContainer')).toBeDefined();
    });
    when(
      'I select an incorrect answer and press "Answer", then the score should remain the same',
      () => {
        const screen = render(
          <QuizContext.Provider value={mockQuizContext}>
            <Question1 />
          </QuizContext.Provider>,
        );
        fireEvent.press(screen.getByTestId('answer-2'));
        fireEvent.press(screen.getByTestId('answerButton'));
        expect(mockQuizContext.setScore).toBeCalledWith(0);
      },
    );
  });
});
