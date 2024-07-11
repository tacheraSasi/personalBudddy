import { View, Text, StyleSheet, Button, ScrollView, RefreshControl,StatusBar, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import {Link,useRouter} from 'expo-router'
import Header from '../../components/Header'
import Colors from './../../utils/Colors'
import Heading from '../../components/Heading'
import AiEmailSender from '../../components/AiEmailSender'
import { Feather } from '@expo/vector-icons';
import Quotes from '../../components/Quotes'



export default function Home() {

    const router=useRouter();
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        checkUserAuth();

    },[])

    /*
     * Used to check user Is already auth or not
     */
    const checkUserAuth=async()=>{
        const result=await JSON.parse(services.getData('isLoggedIn'));
        const user=await JSON.parse(services.getData('user'));
        
        if(result!=true || !user)
        {
            router.replace('/login')
        }
    }

    

  StatusBar.setBackgroundColor(Colors.PRIMARY);
  StatusBar.setBarStyle('light-content');
  return (
    <View style={{
      marginTop:20,
      flex:1
    }}>
      <ScrollView
      refreshControl={
        <RefreshControl
          onRefresh={()=>{console.log("refreshed")}}
          refreshing={loading}
          color={Colors.PRIMARY}
        />
      }
      >
          <View style={{
            
              padding:20,
              backgroundColor:Colors.PRIMARY,
              height:150
          }}>
             <Header/>
          </View>
             <View style={{
              padding:20,
              marginTop:-75
             }}>
              <Heading />
              <AiEmailSender />
              <Quotes />
             </View>
             
          
      </ScrollView>
      <Link href={'/sendMail'} style={styles.adBtnContainer}>
      <Feather name="feather" size={40} color={Colors.WHITE} />
    </Link>
    </View>
  )
}

const styles = StyleSheet.create({
    text:{
       fontSize:20 
    },
    adBtnContainer:{
      position:'absolute',
      bottom:16,
      right:16,
      backgroundColor:Colors.PRIMARY,
      borderRadius:100,
      padding:8
      
    }
})


