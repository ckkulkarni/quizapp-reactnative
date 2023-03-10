import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import Base from './Apps/Base';
import Question1 from './Apps/Question1';
import Question2 from './Apps/Question2';
import Question3 from './Apps/Question3';
import Question4 from './Apps/Question4';
import Question5 from './Apps/Question5';
import {QuizContext} from './Apps/QuizContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SubmitScreen from './Apps/SubmitScreen';
function App(): JSX.Element {
  const stack = createNativeStackNavigator();
  const [score, setScore] = useState(0);
  const [name, setName] = useState('');
  const [email, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedValue, setSelected] = useState('');
  const [trackScore, setTracker] = useState(false);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <QuizContext.Provider
          value={{
            score,
            setScore,
            name,
            setName,
            email,
            setMail,
            phone,
            setPhone,
            selectedValue,
            setSelected,
            trackScore,
            setTracker,
          }}>
          <stack.Navigator>
            <stack.Screen name="Home" component={Base} />
            <stack.Screen name="Question 1" component={Question1} />
            <stack.Screen name="Question 2" component={Question2} />
            <stack.Screen name="Question 3" component={Question3} />
            <stack.Screen name="Question 4" component={Question4} />
            <stack.Screen name="Question 5" component={Question5} />
            <stack.Screen name="Final Score" component={SubmitScreen} />
          </stack.Navigator>
        </QuizContext.Provider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
