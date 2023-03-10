import {fireEvent, render, waitFor} from '@testing-library/react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {loadFeature, defineFeature} from 'jest-cucumber';
import {QuizContext} from './../../Apps/QuizContext';
import {View, TextInput, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import SubmitScreen from './../../Apps/SubmitScreen';
import PieChart from 'react-native-pie-chart';
const uuid = uuidv4();

const navigation = useNavigation<NativeStackNavigationProp<any>>();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn().mockReturnValue({
      navigate: jest.fn(),
    }),
  };
});
const feature = loadFeature('./features/submitscreen.feature');
defineFeature(feature, test => {
  const mockQuizContext = {
    score: 7,
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
  test('User submits their quiz and sees their results', ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      'the user has completed the quiz is on the Submit Screen',
      async () => {
        await waitFor(() => {
          const screen = render(
            <QuizContext.Provider value={mockQuizContext}>
              <SubmitScreen />
            </QuizContext.Provider>,
          );
          expect(screen.getByTestId('scoreContainer')).toBeDefined();
        });
      },
    );
    then(
      'the user should see the details they entered in the home screen',
      async () => {
        await waitFor(() => {
          const screen = render(
            <QuizContext.Provider value={mockQuizContext}>
              <SubmitScreen />
            </QuizContext.Provider>,
          );
          expect(screen.getByTestId('score').props.children[1]).toBe(7);
          expect(screen.getByTestId('selectedStream').props.children[1]).toBe(
            'ReactJS',
          );
          expect(screen.getByTestId('name').props.children[1]).toBe('chandu');
          expect(screen.getByTestId('mail').props.children[1]).toBe(
            'chandra@chandu.com',
          );
          expect(screen.getByTestId('phoneNo').props.children[1]).toBe(
            '1234567890',
          );
        });
      },
    );
    then('the user should see their score in a pie chart', async () => {
      await waitFor(() => {
        const screen = render(
          <QuizContext.Provider value={mockQuizContext}>
            <SubmitScreen />
          </QuizContext.Provider>,
        );
        const chartData = [2, 7];
        const chartColors = ['#A20021', '#B0FF92'];
        const pieChart = screen.UNSAFE_getByType(PieChart);
        expect(pieChart.props.widthAndHeight).toEqual(200);
        expect(pieChart.props.series).toEqual(chartData);
        expect(pieChart.props.sliceColor).toEqual(chartColors);
      });
    });
    and('the user should see a button to re-enter their details', async () => {
      await waitFor(() => {
        const screen = render(
          <QuizContext.Provider value={mockQuizContext}>
            <SubmitScreen />
          </QuizContext.Provider>,
        );

        fireEvent.press(screen.getByTestId('restartQuiz'));
        expect(mockQuizContext.setScore).toBeCalledWith(0);
        expect(navigation.navigate).toBeCalledWith('Home');
      });
    });
  });
});
