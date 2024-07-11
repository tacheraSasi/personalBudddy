import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native'


const storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
      ToastAndroid.show('Something went wrong',ToastAndroid.SHORT);
    }
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
        // value previously stored
      }
    } catch (e) {
      // error reading value
      ToastAndroid.show('Something went wrong',ToastAndroid.SHORT);
    }
  };

  export default{
    storeData,
    getData
  }
  
  