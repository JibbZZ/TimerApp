import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import { TimerClock } from './TimerClock';
import { TimerSetScreen } from './TimerSetScreen';
import { TimerProvider } from './TimerContext';
import { RootStackParamList } from './navigationTypes';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <TimerProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TimerSetScreen" component={TimerSetScreen} />
          <Stack.Screen name="TimerClock" component={TimerClock} />
        </Stack.Navigator>
      </NavigationContainer>
    </TimerProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
