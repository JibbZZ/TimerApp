import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './navigationTypes';

type TimerSetScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'TimerSetScreen'>;
};

export const TimerSetScreen = ({ navigation }: TimerSetScreenProps) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const startTimer = () => {
    navigation.navigate('TimerClock', { hours, minutes, seconds });
  };

  return (
    <View style={styles.container}>
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
    </View>
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
