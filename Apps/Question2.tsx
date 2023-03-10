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
export default function Question2() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {score, setScore, selectedValue, trackScore} = useContext(QuizContext);
  const [answerIndex, setIndex] = useState<number>();
  const currentScore = score;
  const maxScore = 9;
  const [submitted, setSubmit] = useState<boolean>(false);
  let question = '';
  let answers: any = [];
  if (selectedValue == 'ReactJS') {
    question = 'ReactJS a framework of JavaScript. True or false';
    answers = ['True', 'False'];
  } else if (selectedValue == 'React Native') {
    question =
      'React Native can only be used to create apps for Android and IOS. True or false?';
    answers = ['True', 'False'];
  } else if (selectedValue == 'JavaScript') {
    question = 'JavaScript must always be used for a web page. True or false?';
    answers = ['True', 'False'];
  } else if (selectedValue == 'Java') {
    question = 'JSP stands for Jakarta Server Pages. True or false?';
    answers = ['True', 'False'];
  }
  const handleAnswerCheck = () => {
    setSubmit(true);
    if (selectedValue == 'ReactJS') {
      if (answerIndex === 1 && score < maxScore) {
        setScore(score + 1);
      } else {
        setScore(currentScore);
      }
    } else if (selectedValue == 'React Native') {
      if (answerIndex === 0 && score < maxScore) {
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
            testID={`goto-${index}`}
            key={index}
            onPress={() => navigation.navigate(question)}
            style={styles.navigationTouchable}>
            <Text style={styles.navigationText}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {trackScore && <Text testID="score">Score: {score}</Text>}
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
        onPress={() => navigation.navigate('Question 3')}
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
