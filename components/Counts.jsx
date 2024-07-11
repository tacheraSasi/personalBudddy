import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Modal, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../utils/Colors'; // Make sure to adjust the path as necessary

export default function Counts() {
  const [userCount, setUserCount] = useState(0);
  const [insightsCount, setInsightsCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const animatedUserCount = new Animated.Value(0);
  const animatedInsightsCount = new Animated.Value(0);

  useEffect(() => {
    // Simulate fetching counts from an API
    const fetchedUserCount = 100; // Example number
    const fetchedInsightsCount = 50; // Example number

    Animated.timing(animatedUserCount, {
      toValue: fetchedUserCount,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    Animated.timing(animatedInsightsCount, {
      toValue: fetchedInsightsCount,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    animatedUserCount.addListener(({ value }) => {
      setUserCount(Math.floor(value));
    });

    animatedInsightsCount.addListener(({ value }) => {
      setInsightsCount(Math.floor(value));
    });

    return () => {
      animatedUserCount.removeAllListeners();
      animatedInsightsCount.removeAllListeners();
    };
  }, []);

  const handlePress = (message) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button1}
        onPress={() => handlePress('User Count Button Pressed')}
      >
        <MaterialIcons name="person" size={24} color="#5f9c6c" />
        <Text style={styles.text1}>
          {userCount} Users
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button2}
        onPress={() => handlePress('Insights Count Button Pressed')}
      >
        <MaterialIcons name="insights" size={24} color="#705f9c" />
        <Text style={styles.text2}>
          {insightsCount} Insights
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
    height: 100,
    width: '100%',
    padding: 10,
  },
  button1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#5f9c6c",
    backgroundColor: "#cafdbfc5",
    width: '50%',
  },
  button2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#705f9c",
    backgroundColor: "#b9aee9b0",
    width: '50%',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  text1: {
    marginLeft: 10,
    color: "#5f9c6c",
    fontSize: 18,
  },
  text2: {
    marginLeft: 10,
    color: "#705f9c",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    height: '40%',
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    padding: 10,
    width: '50%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
  },
});
