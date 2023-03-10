import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  UIManager,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import {QuizContext} from './QuizContext';
import Draggable from 'react-native-draggable';
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Question5() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {score, trackScore, setScore, selectedValue} = useContext(QuizContext);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const maxScore = 9;
  let questionPositions: number[] = [];
  if (selectedValue === 'ReactJS' || selectedValue === 'Java') {
    questionPositions = [350, 410, 450, 500, 650];
  } else if (selectedValue === 'React Native') {
    questionPositions = [360, 440, 515, 570, 650];
  } else if (selectedValue === 'JavaScript') {
    questionPositions = [350, 410, 450, 500, 650];
  }
  const [questions, setQuestions] = useState(() => {
    if (selectedValue === 'ReactJS') {
      return [
        '_ is used to avoid prop-drilling.',
        'ReactJS is a _ of Javascript.',
        '_ are created using ReactJS.',
        '_ is a third party ReactJS library called that is used to make API calls.',
        'ReactJS uses _ DOM.',
      ];
    } else if (selectedValue === 'React Native') {
      return [
        'React Native is primarily used to make _ applications.',
        '_ CLI is the other option to make React Native Applications.',
        'A popular option to navigate between the screens is _',
        "React Native CLI's Android testing is done on _ primarily.",
        'Aside from React Native we can also use _ for mobile app development.',
      ];
    } else if (selectedValue === 'JavaScript') {
      return [
        'Javascript is an _ language',
        'var and _ are the keywords used to define a variable in Javascript',
        '_ can be used to access HTML elements using Javascript.',
        '_ can be used to display data in some form using Javascript.',
        'What keyword is used to check whether a given property is valid or not? _',
      ];
    } else if (selectedValue === 'Java') {
      return [
        'JVM stands for _',
        'Number of primitive data types in Java are _',
        'An Array is an _ in Java',
        'toString() is defined in _.',
        "'_' keyword cannot be used for constructor.",
      ];
    } else {
      return [];
    }
  });
  const [answers, setAnswers] = useState(() => {
    if (selectedValue === 'ReactJS') {
      return [
        {id: 1, text: 'Library'},
        {id: 2, text: 'Virtual'},
        {id: 3, text: 'Axios'},
        {id: 4, text: 'User Interfaces'},
        {id: 5, text: 'Context API'},
      ];
    } else if (selectedValue === 'React Native') {
      return [
        {id: 1, text: 'React Native Navigate'},
        {id: 2, text: 'Flutter'},
        {id: 3, text: 'Mobile'},
        {id: 4, text: 'Android Studio'},
        {id: 5, text: 'Expo'},
      ];
    } else if (selectedValue === 'JavaScript') {
      return [
        {id: 1, text: 'let'},
        {id: 2, text: 'in'},
        {id: 3, text: 'document.write()'},
        {id: 4, text: 'Object-Oriented'},
        {id: 5, text: 'getElementById()'},
      ];
    } else if (selectedValue === 'Java') {
      return [
        {id: 1, text: 'Object'},
        {id: 2, text: 'Java Virtual Machine'},
        {id: 3, text: 'static'},
        {id: 4, text: '8'},
        {id: 5, text: 'java.util.Object'},
      ];
    } else {
      return [];
    }
  });
  const handleAnswerDrop = (answerId: number, questionIndex: number) => {
    let correctAnswer: any;
    if (selectedValue === 'ReactJS') {
      if (questionIndex === 0) {
        correctAnswer = answers[4];
      } else if (questionIndex === 1) {
        correctAnswer = answers[0];
      } else if (questionIndex === 2) {
        correctAnswer = answers[3];
      } else if (questionIndex === 3) {
        correctAnswer = answers[2];
      } else if (questionIndex === 4) {
        correctAnswer = answers[1];
      }
    } else if (selectedValue === 'React Native') {
      if (questionIndex === 0) {
        correctAnswer = answers[2];
      } else if (questionIndex === 1) {
        correctAnswer = answers[4];
      } else if (questionIndex === 2) {
        correctAnswer = answers[0];
      } else if (questionIndex === 3) {
        correctAnswer = answers[3];
      } else if (questionIndex === 4) {
        correctAnswer = answers[1];
      }
    } else if (selectedValue === 'JavaScript') {
      if (questionIndex === 0) {
        correctAnswer = answers[3];
      } else if (questionIndex === 1) {
        correctAnswer = answers[0];
      } else if (questionIndex === 2) {
        correctAnswer = answers[4];
      } else if (questionIndex === 3) {
        correctAnswer = answers[2];
      } else if (questionIndex === 4) {
        correctAnswer = answers[1];
      }
    } else if (selectedValue === 'Java') {
      if (questionIndex === 0) {
        correctAnswer = answers[1];
      } else if (questionIndex === 1) {
        correctAnswer = answers[3];
      } else if (questionIndex === 2) {
        correctAnswer = answers[0];
      } else if (questionIndex === 3) {
        correctAnswer = answers[4];
      } else if (questionIndex === 4) {
        correctAnswer = answers[2];
      }
    }

    if (answerId === correctAnswer.id) {
      const newQuestions = [...questions];
      const question = newQuestions[questionIndex];
      const index = question.indexOf('_');
      if (index !== -1) {
        newQuestions[questionIndex] =
          question.substring(0, index) +
          correctAnswer.text +
          question.substring(index + 1);
        setQuestions(newQuestions);
        if (score < maxScore) {
          setScore(score + 1);
        }
      }
      setSelectedAnswer(null);
    } else {
      setSelectedAnswer(null);
    }
  };
  return (
    <View style={styles.container} testID="question5-container">
      {trackScore && (
        <Text
          style={{position: 'absolute', top: 80, color: 'black'}}
          testID="score">
          Score: {score}
        </Text>
      )}

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

      <View style={styles.questionsList}>
        {questions.map((question, index) => (
          <View key={index}>
            <Text style={styles.qNaText} testID={`question-${index}`}>
              {question}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.answersList}>
        {answers.map(answer => (
          <View key={answer.id} testID={`answer-${answer.id}`}>
            <Draggable
              x={200}
              y={answer.id * 40}
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
                } else {
                  setSelectedAnswer(null);
                }
              }}
              onDrag={() => setSelectedAnswer(answer.id)}
              shouldReverse>
              <Text style={styles.AnQText}>{answer.text}</Text>
            </Draggable>
          </View>
        ))}
      </View>
      <View style={styles.buttonsStyling}>
        <Button
          onPress={() => navigation.goBack()}
          title="Go Back"
          testID="previousQuestion"
        />
        <Button
          onPress={() => navigation.navigate('Final Score')}
          title="Submit"
          testID="submitButton"
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
  questionsList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    padding: 9,
    justifyContent: 'center',
    top: 210,
  },
  answersList: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    top: 0,
    left: -195,
    overflow: 'visible',
  },
  qNaText: {
    fontFamily: 'Roboto',
    color: 'black',
    fontSize: 18,
    marginTop: 25,
  },
  AnQText: {
    fontFamily: 'Roboto',
    fontSize: 15,
    backgroundColor: '#66C7F4',
    color: 'white',
    padding: 5,
  },
  buttonsStyling: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
  },
});
