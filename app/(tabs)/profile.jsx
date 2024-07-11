import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Linking, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../utils/Colors';
import services from '../../utils/services';

export default function Profile() {
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await services.getData('user');
    const user = JSON.parse(userData);
    setUser(user);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    router.replace('/login');
    await AsyncStorage.removeItem('isLoggedIn');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://www.ekilie.com/php/images/${user?.img}` }}
        style={styles.profileImage}
        resizeMode="cover"
      />
      <View style={styles.profileCard}>
        <Text style={styles.nameText}>{user?.fname} {user?.lname}</Text>
        <Text style={styles.emailText}>{user?.email}</Text>
        <ScrollView style={styles.bioSection}>
          <Text style={styles.bioTitle}>BIO</Text>
          <Text style={styles.bioText}>{user?.bio}</Text>
        </ScrollView>
      </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonEdit} onPress={() => { Linking.openURL(`https://ekilie.com/room.php?user_id=${user?.unique_id}`)}}>
              <Text style={styles.buttonText}>Edit Profile ✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonLogout} onPress={logout}>
              <Text style={styles.buttonText}>Logout 🚮</Text>
            </TouchableOpacity>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND,
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: Colors.PRIMARY,
    marginTop: 30,
  },
  profileCard: {
    backgroundColor: Colors.PRIMARY,
    width: '100%',
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nameText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.WHITE,
    textAlign: 'center',
  },
  emailText: {
    fontSize: 15,
    color: Colors.WHITE,
    textAlign: 'center',
    marginBottom: 10,
  },
  bioSection: {
    marginTop: 10,
  },
  bioTitle: {
    fontSize: 15,
    color: Colors.WHITE,
  },
  bioText: {
    fontSize: 15,
    color: Colors.WHITE,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#a7d19cd5",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonEdit: {
    backgroundColor: '#7a82c5',
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 8,
    flex: 1,
  },
  buttonLogout: {
    backgroundColor: '#c79890',
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 8,
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.WHITE,
  },
});

