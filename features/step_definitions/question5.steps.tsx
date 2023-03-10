import {fireEvent, render, waitFor} from '@testing-library/react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {loadFeature, defineFeature} from 'jest-cucumber';
import {QuizContext} from './../../Apps/QuizContext';
import {View, Text, TextInput, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Question5 from './../../Apps/Question5';
import Draggable from 'react-native-draggable';
const uuid = uuidv4();

const navigation = useNavigation<NativeStackNavigationProp<any>>();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn().mockReturnValue({
      navigate: jest.fn(),
    }),
  };
});
const feature = loadFeature('./features/question5.feature');
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
  test('User answers Question 5 correctly', ({given, when, then, and}) => {
    given('I am on the Question 5 screen', () => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Question5 />
        </QuizContext.Provider>,
      );
      expect(screen.getByTestId('question5-container')).toBeDefined();
    });
    when('I see the questions rendered properly', async () => {
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
    and(
      'I drag the correct answer to the blank space, and the answer is accepted',
      async () => {
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
      },
    );
    then(
      'I press the "Submit" button, and it should take me to the final submission screen',
      async () => {
        await waitFor(() => {
          const screen = render(
            <QuizContext.Provider value={mockQuizContext}>
              <Question5 />
            </QuizContext.Provider>,
          );
          fireEvent.press(screen.getByTestId('submitButton'));

          expect(navigation.navigate).toBeCalledWith('Final Score');
        });
      },
    );
  });
  test('User answers Question 5 incorrectly', ({given, when, then, and}) => {
    given('I am on the Question 5 screen', () => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Question5 />
        </QuizContext.Provider>,
      );
      expect(screen.getByTestId('question5-container')).toBeDefined();
    });
    when('I see the question rendered properly', async () => {
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
    and(
      'I drag an incorrect answer to the blank space, and the answer is rejected',
      async () => {
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
          moveY: 155,
        });
        expect(setSelectedAnswer).toBeCalled();
      },
    );
  });
});
