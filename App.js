import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react'

export default function App() {
  const [name , setName ] = useState('Tachera Sasi')
  return (
    <View style={styles.container}>
      <Text>Welcome to budddy this is a budget app!</Text>
      <StatusBar style="auto" />
    </View>
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
