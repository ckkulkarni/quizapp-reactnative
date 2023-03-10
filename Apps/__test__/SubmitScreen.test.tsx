import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {QuizContext} from './../QuizContext';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import {Text} from 'react-native';
import SubmitScreen from './../SubmitScreen';
import PieChart from 'react-native-pie-chart';
const navigation = useNavigation<NativeStackNavigationProp<any>>();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn().mockReturnValue({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
  };
});
describe('Final screen', () => {
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
  it('screen renders correctly', async () => {
    await waitFor(() => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <SubmitScreen />
        </QuizContext.Provider>,
      );
      expect(screen.getByTestId('scoreContainer')).toBeDefined();
    });
  });
  it('the details render properly', async () => {
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
  });
  it('the restart button works as expected', async () => {
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
  it('the pie chart is rendered properly', async () => {
    await waitFor(() => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <SubmitScreen />
        </QuizContext.Provider>,
      );
      const pieChart = screen.UNSAFE_getByType(PieChart);
      expect(pieChart).toBeDefined();
    });
  });
  it('the pie chart data is rendered properly', async () => {
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
});
