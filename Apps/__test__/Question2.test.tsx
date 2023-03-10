import Question2 from '../Question2';
import Adapter from 'enzyme-adapter-react-16';
import * as enzyme from 'enzyme';
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
describe('Question 2 component', () => {
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
          <Question2 />
        </QuizContext.Provider>,
      );
      fireEvent.press(screen.getByTestId('goto-0'));
      expect(navigation.navigate).toBeCalledWith('Question 1');
      fireEvent.press(screen.getByTestId('goto-2'));
      expect(navigation.navigate).toBeCalledWith('Question 3');
      fireEvent.press(screen.getByTestId('goto-3'));
      expect(navigation.navigate).toBeCalledWith('Question 4');
      fireEvent.press(screen.getByTestId('goto-4'));
      expect(navigation.navigate).toBeCalledWith('Question 5');
    });
  });
  it('the question is rendered correctly', async () => {
    await waitFor(() => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Question2 />
        </QuizContext.Provider>,
      );
      expect(screen.getByTestId('question').props.children).toBe(
        'ReactJS a framework of JavaScript. True or false',
      );
    });
  });
  it('the answers are rendered correctly', async () => {
    await waitFor(() => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Question2 />
        </QuizContext.Provider>,
      );
      expect(screen.getByTestId('answer-0').props.children).toBe('True');
      expect(screen.getByTestId('answer-1').props.children).toBe('False');
    });
  });
  it('the correct answer being pressed causes the score to be incremented', async () => {
    await waitFor(() => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Question2 />
        </QuizContext.Provider>,
      );
      fireEvent.press(screen.getByTestId('answer-1'));
      fireEvent.press(screen.getByTestId('answerButton'));
      expect(mockQuizContext.setScore).toBeCalledWith(1);
    });
  });
  it('when the next question button is pressed, the user should navigate to the next screen', async () => {
    await waitFor(() => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Question2 />
        </QuizContext.Provider>,
      );
      fireEvent.press(screen.getByTestId('nextQuestion'));
      expect(navigation.navigate).toBeCalledWith('Question 3');
    });
  });
  it('when the Go Back button is pressed, the user should navigate to the next screen', async () => {
    await waitFor(() => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Question2 />
        </QuizContext.Provider>,
      );
      fireEvent.press(screen.getByTestId('previousQuestion'));
      expect(navigation.goBack).toBeCalled();
    });
  });
});
