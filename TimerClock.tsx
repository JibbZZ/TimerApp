import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';


export const TimerClock = () => {
  const [sekunder, setSekunder] = useState<number>(0);
  const [aktiverad, setAktiverad] = useState<boolean>(false);
  let intervall: ReturnType<typeof setInterval> | null = null;

  const playSound = async () => {
    const sound = new Audio.Sound();
  try {
    await sound.loadAsync(require('./path_to_your_audio_file.mp3'));
    await sound.playAsync();
  } catch (error) {
    console.log("Error loading or playing sound:", error);
  }
};
  

  useEffect(() => {
    if (aktiverad) {
      intervall = setInterval(() => {
        setSekunder((prevSekunder) => prevSekunder + 1);
      }, 1000);
    } else {
      if (intervall) {
        clearInterval(intervall);
      }
    }
    return () => {
      if (intervall) {
        clearInterval(intervall);
      }
    };
  }, [aktiverad]);

  const växla = () => {
    setAktiverad(!aktiverad);
  };

  const återställ = () => {
    setAktiverad(false);
    setSekunder(0);
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
