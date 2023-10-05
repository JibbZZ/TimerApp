import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './navigationTypes';
import * as Notifications from 'expo-notifications';
import { useTimer } from './TimerContext';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

type TimerSetScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'TimerSetScreen'>;
};

export const TimerSetScreen = ({ navigation }: TimerSetScreenProps) => {
    const { setSekunder } = useTimer();
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);


  const startTimer = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    const permission = await askForNotificationPermission();
    if(permission) {
        setSekunder(hours * 3600 + minutes * 60 + seconds);  // Sätt sekunder innan navigation
        navigation.navigate('TimerClock', { hours, minutes, seconds });
    }
};

  
  
  const askForNotificationPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
          alert('Du måste tillåta notifikationer för att kunna använda denna funktion.');
          return false;
        }
        return true;
    };
  

  return (
    <LinearGradient colors={['red', 'blue']} style={styles.container}>
      <Text style={styles.label}>Timmar</Text>
      <Picker
        selectedValue={hours}
        onValueChange={(itemValue) => setHours(itemValue)}
        style={styles.picker}
        
        
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <Picker.Item key={i} label={String(i)} value={i} />
        ))}
      </Picker>

      <Text style={styles.label}>Minuter</Text>
      <Picker
        selectedValue={minutes}
        onValueChange={(itemValue) => setMinutes(itemValue)}
        style={styles.picker}
      >
        {Array.from({ length: 60 }).map((_, i) => (
          <Picker.Item key={i} label={String(i)} value={i} />
        ))}
      </Picker>

      <Text style={styles.label}>Sekunder</Text>
      <Picker
        selectedValue={seconds}
        onValueChange={(itemValue) => setSeconds(itemValue)}
        style={styles.picker}
      >
        {Array.from({ length: 60 }).map((_, i) => (
          <Picker.Item key={i} label={String(i)} value={i} />
        ))}
      </Picker>

      <Button title="Starta Timer" onPress={startTimer} />
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  picker: {
    width: 100,
    height: 150,
  },
});
