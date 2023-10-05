import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



function HomeScreen({ navigation }: any) {
    return (
      <LinearGradient colors={['blue', 'red']} style={styles.container}>
        <Button 
          title="Timer" 
          onPress={() => navigation.navigate('TimerClock')}
          color="white" 
        />
        <Button 
          title="SetTimer" 
          onPress={() => navigation.navigate('TimerSetScreen')} 
          color="white"
        />
      </LinearGradient>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HomeScreen;
