import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {QuizContext} from './QuizContext';
import PieChart from 'react-native-pie-chart';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
const SubmitScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {score, setScore, selectedValue, name, email, phone} =
    useContext(QuizContext);
  const wrongAnswers = 9 - score;
  const chartData = [wrongAnswers, score];
  const chartColors = ['#A20021', '#B0FF92'];
  function restartQuiz() {
    setScore(0);
    navigation.navigate('Home');
  }
  return (
    <View style={styles.container} testID="scoreContainer">
      <View style={styles.pieStyling}>
        <PieChart
          widthAndHeight={200}
          series={chartData}
          sliceColor={chartColors}
        />
      </View>
      <View style={styles.statsView}>
        <Text style={styles.textStyle} testID="score">
          Score: {score}
        </Text>
        <Text style={styles.textStyle} testID="selectedStream">
          Quiz Stream: {selectedValue}
        </Text>
        <Text style={styles.textStyle} testID="name">
          Name: {name}
        </Text>
        <Text style={styles.textStyle} testID="mail">
          Mail: {email}
        </Text>
        <Text style={styles.textStyle} testID="phoneNo">
          Phone Number: {phone}
        </Text>
      </View>
      <View style={styles.buttonStyling}>
        <View style={{marginHorizontal: 10}}>
          <Button
            title="Re-enter Details"
            onPress={restartQuiz}
            testID="restartQuiz"
          />
        </View>
      </View>
    </View>
  );
};
export default SubmitScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'black',
    fontSize: 19,
    textAlign: 'center',
    backgroundColor: '#0496FF',
    padding: 5,
    marginTop: 15,
  },
  pieStyling: {
    position: 'absolute',
    top: 20,
  },
  statsView: {
    position: 'relative',
    top: 50,
  },
  buttonStyling: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
  },
});
