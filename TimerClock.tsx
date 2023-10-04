import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './navigationTypes';
import sunsetVibes from './assets/sunset-vibes-lo-fichillhop-9503.mp3';


type TimerClockProps = {
  route: RouteProp<RootStackParamList, 'TimerClock'>;
  navigation: NavigationProp<RootStackParamList, 'TimerClock'>;
};

export const TimerClock = ({ route, navigation }: TimerClockProps) => {
  const { hours = 0, minutes = 0, seconds = 0 } = route.params || {};

  // Starta med den tid användaren har valt
  const [sekunder, setSekunder] = useState<number>(hours * 3600 + minutes * 60 + seconds);
  const [aktiverad, setAktiverad] = useState<boolean>(false);

  const playSound = async () => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(sunsetVibes);
      await sound.playAsync();
    } catch (error) {
      console.log("Error loading or playing sound:", error);
    }
  };

  useEffect(() => {
    let intervall: ReturnType<typeof setInterval> | null = null;

    if (sekunder <= 0 && aktiverad) {
      setAktiverad(false);
      playSound();
    } else if (aktiverad) {
      intervall = setInterval(() => {
        setSekunder((prevSekunder) => prevSekunder - 1);
      }, 1000);
    }

    return () => {
      if (intervall) {
        clearInterval(intervall);
      }
    };
  }, [aktiverad, sekunder]);

  const växla = () => {
    setAktiverad(!aktiverad);
  };

  const återställ = () => {
    setAktiverad(false);
    setSekunder(hours * 3600 + minutes * 60 + seconds);
  };

  const formateraTid = () => {
    const fåSekunder = `0${(sekunder % 60)}`.slice(-2);
    const minuter: number = Math.floor(sekunder / 60);
    const fåMinuter = `0${minuter % 60}`.slice(-2);
    const fåTimmar = `0${Math.floor(sekunder / 3600)}`.slice(-2);

    return `${fåTimmar} : ${fåMinuter} : ${fåSekunder}`;
  };

  return (
    <View style={stilar.container}>
      <Text>{formateraTid()}</Text>
      <Button title={aktiverad ? 'Stoppa' : 'Starta'} onPress={växla} />
      <Button title="Återställ" onPress={återställ} />
    </View>
  );
};

const stilar = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
