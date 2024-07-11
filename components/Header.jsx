import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import services from '../utils/services'
import Colors from '../utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import Icon from '../assets/images/icon.png'


export default function Header() {
    const [user,setUser]=useState();

    useEffect(()=>{
        getUserData();
    },[])
    /**
     * Used to get User Data
     */
    const getUserData=async()=>{
      const userData = await services.getData('user')
      const user=JSON.parse(userData);
        
      setUser(user);
    }
  return (
    <View style={{
        display:'flex',
        flexDirection:'row',
        gap:8,
        alignItems:'center'
    }}>
      <Image source={{uri:`https://www.ekilie.com/php/images/${user?.img}`}}
      style={{
        width:50,
        height:50,
        borderRadius:99
      }}
      />
      <View style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'85%'
      }}>
        <View>
            <Text style={{color:Colors.WHITE,fontSize:16,
            fontFamily:'outfit'}}>Welcome,</Text>
            <Text style={{color:Colors.WHITE,
              fontSize:20,fontFamily:'outfit-bold'}}>{user?.fname} {user?.lname}</Text>
        </View>
        <Image source={Icon}
        style={{
          width:40,
          height:40,
        }}
        />
      </View>
    </View>
  )
}