import { useState, useEffect, useRef } from 'react';
import { Text, View, Platform, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ComingSoon from '../../assets/coming-soon.jpeg'


export default function App() {
  const userData = AsyncStorage.getItem('user');

  useEffect(() => {
 
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image source={ComingSoon} style={{
          height:250,
          width:250,
          borderRadius:12,
          borderColor:'transparent'
        }}/>
        <Text style={{
          margin:20,
          fontSize:20,
          fontWeight:'bold',
          color:'gray',
          textAlign:'center'
        }}>
          This page is currently not available 😕
        </Text>
      </View>
    </View>
  );
}

