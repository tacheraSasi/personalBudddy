import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, FlatList, Image, StyleSheet, ActivityIndicator, Modal, Pressable, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from './../../utils/Colors';
import Icon from '../../assets/images/icon.png'

const Explore = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchData = async () => {
    try {
      let response = await fetch('https://console.ekilie.com/api/usersList.php');
      let json = await response.json();
      setUsers(json);
      await cacheImages(json);
      await AsyncStorage.setItem('users', JSON.stringify(json));
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const cacheImages = async (data) => {
    const imageUrls = data.map(user => `https://www.ekilie.com/php/images/${user.img}`);
    const tasks = imageUrls.map(url => {
      return Image.prefetch(url);
    });
    await Promise.all(tasks);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  const keyExtractor = useCallback((item) => item.user_id.toString(), []);

  const renderItem = useCallback(({ item }) => (
    <Pressable
      onPress={() => openModal(item)}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#ddd' : '#fff',
        },
        styles.userCard,
      ]}
    >
      <Image source={{ uri: `https://www.ekilie.com/php/images/${item?.img}` }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.fname} {item.lname}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>
    </Pressable>
  ), []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>

        <View style={styles.header}>
          <Image source={Icon}
          style={{
            width:35,
            height:35,
          }}
          />
          <Text style={styles.title}>Ekilie Users</Text>
          <MaterialIcons name="search" size={24} color="#fff" />
        </View>
      <View style={styles.container}>
        <FlatList
          data={users}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Image source={require('../../assets/coming-soon.jpeg')} style={styles.image} />
              <Text style={styles.emptyText}>
                This page is currently not available 😕
              </Text>
            </View>
          }
          initialNumToRender={10}
          getItemLayout={(data, index) => (
            { length: 70, offset: 70 * index, index }
          )}
        />
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedUser && (
                <>
                  <Image source={{ uri: `https://www.ekilie.com/php/images/${selectedUser?.img}` }} style={styles.modalAvatar} />
                  <Text style={styles.modalUserName}>{selectedUser.fname} {selectedUser.lname}</Text>
                  <Text style={styles.modalUserEmail}>{selectedUser.email}</Text>
                  <Pressable style={styles.closeButton} onPress={closeModal}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    paddingTop:20,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    width:"100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: 'gray',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 250,
    width: 250,
    borderRadius: 12,
  },
  emptyText: {
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalAvatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 15,
  },
  modalUserName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalUserEmail: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 15,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Explore;
