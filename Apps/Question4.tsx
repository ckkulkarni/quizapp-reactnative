import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import {QuizContext} from './QuizContext';
export default function Question4() {
  const [submitted, setSubmit] = useState<boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {score, trackScore, setScore, selectedValue} = useContext(QuizContext);
  const [answerIndex, setIndex] = useState<number>();
  const maxScore = 9;
  const currentScore = score;
  let question = '';
  let answers: any = [];
  if (selectedValue == 'ReactJS') {
    question = 'What is the default port number in which the application run?';
    answers = ['3000', '8080', '3001', '5000'];
  } else if (selectedValue == 'React Native') {
    question = 'What is props?';
    answers = [
      'Which used for rendering dynamic changes whithin component',
      'Import component from one another component like react-native in app.js, custom component',
      'Which stands for properties and is being used for passing data from one component to another',
      'None of the above',
    ];
  } else if (selectedValue == 'JavaScript') {
    question =
      'How would you prompt users with messages and also accept inputs at the same time?';
    answers = ['Alert()', 'Display()', 'Prompt()', 'Confirm()'];
  } else if (selectedValue == 'Java') {
    question = 'What is the size of byte variable?';
    answers = ['8 bit', '16 bit', '32 bit', '64 bit'];
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
      if (answerIndex === 2 && score < maxScore) {
        setScore(score + 1);
      } else {
        setScore(currentScore);
      }
    } else if (selectedValue == 'Java') {
      if (answerIndex === 0 && score < maxScore) {
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
            style={styles.navigationTouchable}>
            <Text style={styles.navigationText} testID={`goto-${index}`}>
              {index + 1}
            </Text>
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
        onPress={() => navigation.navigate('Question 5')}
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
