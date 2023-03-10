import Base from '../Base';
import Adapter from 'enzyme-adapter-react-16';
import {mount, shallow} from 'enzyme';
import * as enzyme from 'enzyme';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TextInput, Button} from 'react-native';
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
describe('should render a form with three text inputs, two selections, and one submit', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(<Base />);
  });
  it('component renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should update the name state upon text input', () => {
    expect(wrapper.find('TextInput')).toBeTruthy();
    expect(wrapper.find('SelectDropdown')).toBeTruthy();
    expect(wrapper.find('Button')).toBeTruthy();
  });
  it('should disable the submit button when the form  does not have all the inputs', () => {
    expect(wrapper.find('Button').at(0).prop('disabled')).toBe(true);
  });
  it('should enable the submit button when the form has all the inputs', () => {
    wrapper.find('TextInput').at(0).simulate('changeText', 'chandrakanth');
    wrapper.find('TextInput').at(1).simulate('changeText', 'chandra@kanth.com');
    wrapper.find('TextInput').at(2).simulate('changeText', '1234567890');
    expect(wrapper.find('Button').at(0).prop('disabled')).toBe(false);
  });
  it('on quiz start button, should navigate to the next screen, aka, the quiz should begin', () => {
    wrapper.find('Button').at(0).props().onPress();
    wrapper.find(Button).at(1).props().onPress();
    wrapper.update();
    expect(navigation.navigate).toBeCalledWith('Question 1');
  });
});
