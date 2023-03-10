// import * as enzyme from 'enzyme';
// import {mount, shallow} from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import Question5 from '../Question5';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {QuizContext} from './../QuizContext';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import Draggable from 'react-native-draggable';
import {Text, View} from 'react-native';
const navigation = useNavigation<NativeStackNavigationProp<any>>();
import '@testing-library/react-native';
//enzyme.configure({adapter: new Adapter()});
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn().mockReturnValue({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
  };
});
describe('Fifth Question component', () => {
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
          <Question5 />
        </QuizContext.Provider>,
      );
      fireEvent.press(screen.getByTestId('goto-0'));
      expect(navigation.navigate).toBeCalledWith('Question 1');
      fireEvent.press(screen.getByTestId('goto-1'));
      expect(navigation.navigate).toBeCalledWith('Question 2');
      fireEvent.press(screen.getByTestId('goto-2'));
      expect(navigation.navigate).toBeCalledWith('Question 3');
      fireEvent.press(screen.getByTestId('goto-3'));
      expect(navigation.navigate).toBeCalledWith('Question 4');
    });
  });
  it('component renders properly', async () => {
    await waitFor(() => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Question5 />
        </QuizContext.Provider>,
      );
      expect(screen.getByTestId('question5-container')).toBeDefined();
    });
  });
  it('on pressing the Go Back Button, it should navigate back to the previous question screen', async () => {
    await waitFor(() => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Question5 />
        </QuizContext.Provider>,
      );
      fireEvent.press(screen.getByTestId('previousQuestion'));
      expect(navigation.goBack).toBeCalled();
    });
  });
  it('the questions are rendered correctly, assuming that the selectedValue state from the context API is ReactJS', async () => {
    await waitFor(() => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Question5 />
        </QuizContext.Provider>,
      );
      expect(screen.getByTestId('question-0').props.children).toBe(
        '_ is used to avoid prop-drilling.',
      );
      expect(screen.getByTestId('question-1').props.children).toBe(
        'ReactJS is a _ of Javascript.',
      );
      expect(screen.getByTestId('question-2').props.children).toBe(
        '_ are created using ReactJS.',
      );
      expect(screen.getByTestId('question-3').props.children).toBe(
        '_ is a third party ReactJS library called that is used to make API calls.',
      );
      expect(screen.getByTestId('question-4').props.children).toBe(
        'ReactJS uses _ DOM.',
      );
    });
  });
  it('should call handleAnswerDrop when an answer is dropped', async () => {
    const answers = [
      {id: 1, text: 'Answer 1'},
      {id: 2, text: 'Answer 2'},
      {id: 3, text: 'Answer 3'},
    ];
    const questionPositions = [100, 200, 300];
    const handleAnswerDrop = jest.fn();
    const setSelectedAnswer = jest.fn();
    const {getByText, UNSAFE_queryAllByType} = render(
      <View>
        <View>
          <Text>Question 1</Text>
          <Text>Question 2</Text>
          <Text>Question 3</Text>
        </View>
        <View>
          {answers.map(answer => (
            <View key={answer.id}>
              <Draggable
                onDrag={() => setSelectedAnswer(answer.id)}
                onDragRelease={(event, gestureState) => {
                  let questionIndex = -1;
                  for (let i = 0; i < questionPositions.length; i++) {
                    if (gestureState.moveY < questionPositions[i]) {
                      questionIndex = i;
                      break;
                    }
                  }
                  if (questionIndex !== -1) {
                    handleAnswerDrop(answer.id, questionIndex);
                  }
                }}>
                <Text>{answer.text}</Text>
              </Draggable>
            </View>
          ))}
        </View>
      </View>,
    );
    const [draggableElement] = UNSAFE_queryAllByType(Draggable) || [];
    await fireEvent(draggableElement, 'drag', {
      moveY: 105,
    });
    expect(setSelectedAnswer).toBeCalled();
  });
  it('on submission, should navigate to the final screen', async () => {
    await waitFor(() => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Question5 />
        </QuizContext.Provider>,
      );
      fireEvent.press(screen.getByTestId('submitButton'));

      expect(navigation.navigate).toBeCalledWith('Final Score');
    });
  });
});
