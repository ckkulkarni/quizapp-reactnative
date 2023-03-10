import Question1 from '../Question1';
import Adapter from 'enzyme-adapter-react-16';
import * as enzyme from 'enzyme';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {QuizContext} from './../QuizContext';
enzyme.configure({adapter: new Adapter()});
const navigation = useNavigation<NativeStackNavigationProp<any>>();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn().mockReturnValue({
      navigate: jest.fn(),
    }),
  };
});

describe('Question 1 component', () => {
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

  it("the question is correct assuming that selectedValue state is equal to 'ReactJS'", () => {
    const screen = render(
      <QuizContext.Provider value={mockQuizContext}>
        <Question1 />
      </QuizContext.Provider>,
    );
    const questionText = screen.getByTestId('questionID');
    expect(questionText.props.children).toBe(
      'What is the extension used for TypeScript in ReactJS?',
    );
  });
  it('the answers are rendered correctly, assuming that the selected state value is ReactJS', async () => {
    await waitFor(() => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Question1 />
        </QuizContext.Provider>,
      );
      const answer0 = screen.getByTestId('answer-0');
      const answer1 = screen.getByTestId('answer-1');
      const answer2 = screen.getByTestId('answer-2');
      const answer3 = screen.getByTestId('answer-3');
      expect(answer0.props.children).toBe('.tsx');
      expect(answer1.props.children).toBe('.jsx');
      expect(answer2.props.children).toBe('.js');
      expect(answer3.props.children).toBe('.java');
    });
  });
  it('should update the score when the right answer is pressed', async () => {
    await waitFor(() => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Question1 />
        </QuizContext.Provider>,
      );
      fireEvent.press(screen.getByTestId('answer-0'));
      fireEvent.press(screen.getByTestId('answerButton'));
      expect(mockQuizContext.setScore).toBeCalledWith(1);
    });
  });
  it('score should remain the same when the wrong answer is pressed', async () => {
    await waitFor(() => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Question1 />
        </QuizContext.Provider>,
      );
      fireEvent.press(screen.getByTestId('answer-1'));
      fireEvent.press(screen.getByTestId('answerButton'));
      expect(screen.getByTestId('score').props.children[1]).toBe(0);
    });
  });
  it('when the next question button is pressed, the user should navigate to the next screen', async () => {
    await waitFor(() => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Question1 />
        </QuizContext.Provider>,
      );
      fireEvent.press(screen.getByTestId('question2'));
      expect(navigation.navigate).toBeCalledWith('Question 2');
    });
  });
  it('when one of the numbers at the top are pressed, it should navigate to the pressed question', async () => {
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
  });
});
