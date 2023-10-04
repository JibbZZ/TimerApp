import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Button 
        title="Timer" 
        onPress={() => navigation.navigate('TimerClock')} 
      />
      <Button 
        title="SetTimer" 
        onPress={() => navigation.navigate('TimerSetScreen')} 
      />
    </View>
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
