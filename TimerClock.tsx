import React, { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { RootStackParamList } from './navigationTypes';
import sunsetVibes from './assets/sounds/sunset-vibes-lo-fichillhop-9503.mp3';
import { useTimer } from './TimerContext';

type TimerClockProps = {
  route: RouteProp<RootStackParamList, 'TimerClock'>;
  navigation: NavigationProp<RootStackParamList, 'TimerClock'>;
};

export const TimerClock = ({ route, navigation }: TimerClockProps) => {
  const { sekunder, aktiverad, startTimer, stoppTimer, återställTimer } = useTimer();

  const [soundObj, setSoundObj] = useState<Audio.Sound | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const playSound = async () => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(sunsetVibes);
      await sound.playAsync();
      setSoundObj(sound);
    } catch (error) {
      console.log("Error loading or playing sound:", error);
    }
  };

  const stopSound = async () => {
    if (soundObj) {
      try {
        await soundObj.stopAsync();
        setSoundObj(null);
      } catch (error) {
        console.log("Error stopping sound:", error);
      }
    }
  };

  useEffect(() => {
    if (sekunder <= 0 && aktiverad) {
      playSound();
      visaNotifikation();
      setModalVisible(true);
    }
  }, [aktiverad, sekunder]);

  const växla = () => {
    if (aktiverad && soundObj) {
      stopSound();
    }
    aktiverad ? stoppTimer() : startTimer();
  };

  const återställ = () => {
    // Användaren har redan valt timmen, minuten och sekunden via ruttens parameter, så vi använder dem här.
    återställTimer(route.params.hours, route.params.minutes, route.params.seconds);
  };

  const formateraTid = () => {
    const fåSekunder = `0${(sekunder % 60)}`.slice(-2);
    const minuter: number = Math.floor(sekunder / 60);
    const fåMinuter = `0${minuter % 60}`.slice(-2);
    const fåTimmar = `0${Math.floor(sekunder / 3600)}`.slice(-2);

    return `${fåTimmar} : ${fåMinuter} : ${fåSekunder}`;
  };

  const visaNotifikation = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Timern är klar!",
        body: 'Tryck här för att gå tillbaka till appen.',
        sound: true, // Har ljud när notifikationen visas
        priority: Notifications.AndroidNotificationPriority.HIGH,
        vibrate: [0, 250, 250, 250],
      },
      trigger: null,
    });
  };

  const closeModal = () => {
    stopSound();
    setModalVisible(false);
    återställ();
  };

  return (
    <View style={stilar.container}>
      <Text>{formateraTid()}</Text>
      <Button title={aktiverad ? 'Stoppa' : 'Starta'} onPress={växla} />
      <Button title="Återställ" onPress={återställ} />
      
      <Modal isVisible={isModalVisible}>
        <View style={stilar.modalContainer}>
          <Text>Timern är klar!</Text>
          <Button title="Stäng av ljudet" onPress={closeModal} />
        </View>
      </Modal>
    </View>
  );
};

const stilar = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: { 
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});