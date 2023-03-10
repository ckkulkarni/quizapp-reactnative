import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import SelectDropdown from 'react-native-select-dropdown';
import {QuizContext} from './QuizContext';
export default function Base() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {setName, setMail, setPhone, setSelected, setTracker} =
    useContext(QuizContext);
  const [validMail, setValid] = useState<boolean>(true);
  const [validName, setValidName] = useState<boolean>(false);
  const [validPhone, setValidPhone] = useState<boolean>(false);
  const [submitPressed, setSubmit] = useState<boolean>(false);
  const [validSelections, setSelections] = useState<boolean>(false);
  const [validOption, setOption] = useState<boolean>(false);
  const selections = ['ReactJS', 'React Native', 'JavaScript', 'Java'];
  function handleSubmit() {
    setSubmit(true);
  }
  const handleEmailChange = (text: string) => {
    setMail(text);
    const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    setValid(emailFormat.test(text));
  };
  const handleNameChange = (text: string) => {
    setName(text);
    setValidName(text.trim().length > 0);
  };
  const handlePhoneChange = (text: string) => {
    setPhone(text);
    setValidPhone(text.trim().length === 10);
  };

  const isFormValid = validName && validMail && validPhone;
  const startQuiz = isFormValid && submitPressed;
  const track = [true, false];
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Enter your name"
        onChangeText={handleNameChange}
        style={styles.input}
      />
      {!validMail && (
        <Text style={{color: 'red'}}>Enter a valid Email Address</Text>
      )}
      <TextInput
        placeholder="Enter your Email ID"
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        style={[styles.input, !validMail && styles.invalidInput]}
      />
      <TextInput
        placeholder="Enter your Phone Number"
        keyboardType="numeric"
        onChangeText={handlePhoneChange}
        style={styles.input}
      />
      <Text>Select your preferred language: </Text>
      <SelectDropdown
        data={selections}
        onSelect={(selectedItem, index) => {
          setSelected(selectedItem);
        }}
        searchInputTxtColor={'blue'}
      />
      <Text>Track Score?</Text>
      <SelectDropdown
        data={track}
        onSelect={(tracking, index) => {
          setTracker(tracking);
        }}
        searchInputTxtColor={'blue'}
      />
      <Button title="Submit" onPress={handleSubmit} disabled={!isFormValid} />
      <Button
        disabled={!startQuiz}
        title="Click Here to Start Quiz"
        onPress={() => navigation.navigate('Question 1')}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    marginVertical: 10,
  },
  invalidInput: {
    borderColor: 'red',
  },
  selector: {
    backgroundColor: 'blue',
    padding: 10,
  },
});
