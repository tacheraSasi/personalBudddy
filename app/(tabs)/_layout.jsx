import { View, Text } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from './../../utils/Colors'
export default function TabLayout() {
  return (
    <Tabs 
    screenOptions={{
        tabBarActiveTintColor:Colors.PRIMARY,
        headerShown:false,
        tabBarStyle: { 
          borderColor: Colors.PRIMARY, 
          borderTopWidth: 1,
          borderRightWidth: 1,
          borderLeftWidth: 1,
          // borderTopLeftRadius:30,
          // borderTopRightRadius:30
        },
    }}
    >
        <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={25} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'explore',
          tabBarIcon: ({ color }) => <FontAwesome size={25} name="compass" color={color} />,
        }}
      />
       <Tabs.Screen
        name="Send"
        options={{
          title: 'Send',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="email-send" size={24} color={color} />,
        }}
      />
       <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={25} name="user" color={color} />,
        }}
      />
    </Tabs>
  )
}