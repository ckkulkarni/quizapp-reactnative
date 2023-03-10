import Question4 from '../Question4';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {QuizContext} from './../QuizContext';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
const navigation = useNavigation<NativeStackNavigationProp<any>>();
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn().mockReturnValue({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
  };
});
describe('Question 4 component', () => {
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
  it('on touching any of the 5 numbers above the question, the user should navigate to the previous or next questions', async () => {
    await waitFor(() => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Question4 />
        </QuizContext.Provider>,
      );
      fireEvent.press(screen.getByTestId('goto-0'));
      expect(navigation.navigate).toBeCalledWith('Question 1');
      fireEvent.press(screen.getByTestId('goto-1'));
      expect(navigation.navigate).toBeCalledWith('Question 2');
      fireEvent.press(screen.getByTestId('goto-2'));
      expect(navigation.navigate).toBeCalledWith('Question 3');
      fireEvent.press(screen.getByTestId('goto-4'));
      expect(navigation.navigate).toBeCalledWith('Question 5');
    });
  });
  it('on pressing the Next Question Button, it should navigate to the next question screen', async () => {
    await waitFor(() => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Question4 />
        </QuizContext.Provider>,
      );
      fireEvent.press(screen.getByTestId('nextQuestion'));
      expect(navigation.navigate).toBeCalledWith('Question 5');
    });
  });
  it('on pressing the Go Back Button, it should navigate back to the previous question screen', async () => {
    await waitFor(() => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Question4 />
        </QuizContext.Provider>,
      );
      fireEvent.press(screen.getByTestId('previousQuestion'));
      expect(navigation.goBack).toBeCalled();
    });
  });
  it('expect the question to be rendered correctly, provided the selectedValue is ReactJS', async () => {
    await waitFor(() => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Question4 />
        </QuizContext.Provider>,
      );
      expect(screen.getByTestId('question').props.children).toBe(
        'What is the default port number in which the application run?',
      );
    });
  });

  it('expect the correct answers to be rendered provided the selectedValue is ReactJS', async () => {
    await waitFor(() => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Question4 />
        </QuizContext.Provider>,
      );
      expect(screen.getByTestId('answer-0').props.children).toBe('3000');
      expect(screen.getByTestId('answer-1').props.children).toBe('8080');
      expect(screen.getByTestId('answer-2').props.children).toBe('3001');
      expect(screen.getByTestId('answer-3').props.children).toBe('5000');
    });
  });
  it('the correct answer being pressed causes the score to be incremented', async () => {
    await waitFor(() => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Question4 />
        </QuizContext.Provider>,
      );
      fireEvent.press(screen.getByTestId('answer-0'));
      fireEvent.press(screen.getByTestId('answerButton'));
      expect(mockQuizContext.setScore).toBeCalledWith(1);
    });
  });
});
