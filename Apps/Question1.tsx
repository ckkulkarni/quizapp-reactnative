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
export default function Question1() {
  const {trackScore, score, setScore, selectedValue} = useContext(QuizContext);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectedIndex, setIndex] = useState<number>();
  const currentScore = score;
  const maxScore = 9;
  const [submitted, setSubmit] = useState<boolean>(false);
  let questionText = '';
  let options: any[] = [];
  if (selectedValue == 'ReactJS') {
    questionText = 'What is the extension used for TypeScript in ReactJS?';
    options = ['.tsx', '.jsx', '.js', '.java'];
  } else if (selectedValue == 'React Native') {
    questionText =
      'What are the simpler of the two CLIs used to create React Native Apps?';
    options = ['Expo CLI', 'React Native CLI'];
  } else if (selectedValue == 'JavaScript') {
    questionText = 'Inside which HTML element do we put the JavaScript?';
    options = ['<javascript>', '<script>', '<js>', '<scripting>'];
  } else if (selectedValue == 'Java') {
    questionText =
      'In Java, the class name should always be different from file name. True or False?';
    options = ['True', 'False'];
  }
  const handleOptionPress = (index: number) => {
    setIndex(index);
  };
  const handleAnswerCheck = () => {
    setSubmit(true);
    if (selectedValue == 'ReactJS') {
      if (selectedIndex === 0 && score < maxScore) {
        setScore(score + 1);
      } else {
        setScore(currentScore);
      }
    } else if (selectedValue == 'React Native' && score < maxScore) {
      if (selectedIndex === 0) {
        setScore(score + 1);
      } else {
        setScore(currentScore);
      }
    } else if (selectedValue == 'JavaScript' && score < maxScore) {
      if (selectedIndex === 1) {
        setScore(score + 1);
      } else {
        setScore(currentScore);
      }
    } else if (selectedValue == 'Java' && score < maxScore) {
      if (selectedIndex === 1) {
        setScore(score + 1);
      } else {
        setScore(currentScore);
      }
    }
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
            testID={`navigate-to-${index}`}>
            <Text style={styles.navigationText}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {trackScore && <Text testID="score">Score: {score}</Text>}
      <Text style={{fontSize: 20, color: 'black'}} testID="questionID">
        {questionText}
      </Text>
      {options.map((option, index) => (
        <Pressable
          key={index}
          style={[
            styles.optionStyling,
            selectedIndex === index && styles.selectedOption,
          ]}
          onPress={() => handleOptionPress(index)}>
          <Text testID={`answer-${index}`}>{option.toString()}</Text>
        </Pressable>
      ))}
      <Button
        title="Answer"
        onPress={handleAnswerCheck}
        disabled={submitted}
        testID="answerButton"
      />
      {selectedIndex !== null && (
        <Button
          testID="question2"
          title="Next Question"
          onPress={() => navigation.navigate('Question 2')}
        />
      )}
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
