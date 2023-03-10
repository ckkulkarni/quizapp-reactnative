import {fireEvent, render, waitFor} from '@testing-library/react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import Adapter from 'enzyme-adapter-react-16';
import {mount, shallow} from 'enzyme';
import * as enzyme from 'enzyme';
import Base from '../../Apps/Base';
import {loadFeature, defineFeature} from 'jest-cucumber';
import {QuizContext} from './../../Apps/QuizContext';
import {View, TextInput, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
const uuid = uuidv4();
const feature = loadFeature('./features/base.feature');
const navigation = useNavigation<NativeStackNavigationProp<any>>();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn().mockReturnValue({
      navigate: jest.fn(),
    }),
  };
});
enzyme.configure({adapter: new Adapter()});
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

  test('User submits form with valid inputs', ({given, when, and, then}) => {
    let wrapper: any;
    beforeEach(() => {
      wrapper = shallow(<Base />);
    });
    given('I am on the base screen', () => {
      const wrapper = shallow(<Base />);
      expect(wrapper).toMatchSnapshot();
    });
    when('I enter a valid email "test@test.com"', () => {
      expect(wrapper.find('TextInput').at(0)).toBeTruthy();
    });
    and('I enter a valid name "John"', () => {
      expect(wrapper.find('TextInput').at(1)).toBeTruthy();
    });
    and('I enter a valid phone number "1234567890"', () => {
      expect(wrapper.find('TextInput').at(2)).toBeTruthy();
    });

    and('I submit the form', () => {
      const setSubmit = jest.fn();
      wrapper.find('TextInput').at(0).simulate('changeText', 'chandrakanth');
      wrapper
        .find('TextInput')
        .at(1)
        .simulate('changeText', 'chandra@kanth.com');
      wrapper.find('TextInput').at(2).simulate('changeText', '1234567890');
      wrapper.find('Button').at(0).props().onPress();
      expect(wrapper.find('Button').at(0).prop('disabled')).toBe(false);
    });

    then('I should see the start quiz button', () => {
      wrapper.find('Button').at(0).props().onPress();
      const startQuizButton = wrapper.find('Button').at(1);
      expect(startQuizButton.prop('disabled')).toBe(false);
    });
  });
});
