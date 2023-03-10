import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  Button,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import {QuizContext} from './QuizContext';
export default function Question3() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {score, trackScore, setScore, selectedValue} = useContext(QuizContext);
  const [answerIndex, setIndex] = useState<number>();
  const currentScore = score;
  const [submitted, setSubmit] = useState<boolean>(false);
  let question = '';
  const maxScore = 9;
  let answers: any = [];
  if (selectedValue == 'ReactJS') {
    question =
      'What does myReactApp refer to in the following command? npm create-react-app myReactApp';
    answers = [
      'Name of the App to be created',
      'The directory to create the app in',
      'The type of App to be created',
      'A reference to existing App',
    ];
  } else if (selectedValue == 'React Native') {
    question =
      'How can you create a new React Native project using React Native CLI?';
    answers = [
      'expo init',
      'react-native Project-name',
      'npx react-native init Project_Name',
      'expo react-native Project-name',
    ];
  } else if (selectedValue == 'JavaScript') {
    question =
      'What will the output of this code snippet: console.log(018 - 015)?';
    answers = ['NaN', '3', '5', '13'];
  } else if (selectedValue == 'Java') {
    question = 'What is a correct syntax to output "Hello World" in Java';
    answers = [
      "Console.WriteLine('Hello World')",
      "echo('Hello World')",
      "System.out.println('Hello World');",
      "print('Hello World')",
    ];
  }
  const handleAnswerCheck = () => {
    setSubmit(true);
    if (selectedValue == 'ReactJS') {
      if (answerIndex === 0 && score < maxScore) {
        setScore(score + 1);
      } else {
        setScore(currentScore);
      }
    } else if (selectedValue == 'React Native') {
      if (answerIndex === 2 && score < maxScore) {
        setScore(score + 1);
      } else {
        setScore(currentScore);
      }
    } else if (selectedValue == 'JavaScript') {
      if (answerIndex === 1 && score < maxScore) {
        setScore(score + 1);
      } else {
        setScore(currentScore);
      }
    } else if (selectedValue == 'Java') {
      if (answerIndex === 2 && score < maxScore) {
        setScore(score + 1);
      } else {
        setScore(currentScore);
      }
    }
  };

  const handleOptionPress = (index: number) => {
    setIndex(index);
  };
  return (
    <View style={styles.container} testID="questionContainer">
      <View style={styles.questionNavigation}>
        {[
          'Question 1',
          'Question 2',
          'Question 3',
          'Question 4',
          'Question 5',
        ].map((question, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(question)}
            style={styles.navigationTouchable}
            testID={`goto-${index}`}>
            <Text style={styles.navigationText}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {trackScore && <Text>Score: {score}</Text>}
      <Text style={{fontSize: 20, color: 'black'}} testID="question">
        {question}
      </Text>
      {answers.map((answer: string, index: number) => (
        <Pressable
          key={index}
          style={[
            styles.optionStyling,
            answerIndex === index && styles.selectedOption,
          ]}
          onPress={() => handleOptionPress(index)}>
          <Text testID={`answer-${index}`}>{answer}</Text>
        </Pressable>
      ))}
      <Button
        title="Answer"
        onPress={handleAnswerCheck}
        disabled={submitted}
        testID="answerButton"
      />
      <Button
        title="Next Question"
        onPress={() => navigation.navigate('Question 4')}
        testID="nextQuestion"
      />
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
        testID="previousQuestion"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionStyling: {
    backgroundColor: '#00A1E4',
    padding: 10,
    borderRadius: 20,
    marginTop: 6,
    marginBottom: 10,
    width: '70%',
  },
  selectedOption: {
    backgroundColor: '#CC3F0C',
  },
  questionNavigation: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'absolute',
    top: 0,
  },
  navigationTouchable: {
    backgroundColor: '#FEB95F',
    padding: 3,
    marginHorizontal: 7,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 100,
    height: 30,
    width: 30,
    marginVertical: 20,
  },
  navigationText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 3,
  },
});
