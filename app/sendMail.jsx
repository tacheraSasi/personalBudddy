import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Colors from './../utils/Colors'
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
export default function SendMail() {
    const [subject ,setSubject] = useState("ekilie Update")
    const [message , setMessage] = useState("")
    const [loading,setLoading] = useState(false);
    const router = useRouter();

    const sendMail = async () =>{
        console.log("sending the mail...")
        try {
            // Logging the message to check if it's set correctly
            console.log("Message:", message);
            setLoading(true)
      
            const response = await axios.post(
              "https://console.ekilie.com/api/email-sender.php",
              {
                emailText: message,
                emailSubject: subject
              },
              {
                headers: {
                  'Content-Type': 'application/json', // Setting the content type to JSON
                },
              })
      
            if (response.data.message) {
              setLoading(false)
              ToastAndroid.show("Sent successfully",ToastAndroid.LONG);
              setMessage(''); 
              setSubject('')
            } else {
              console.error("Error sending email");
              ToastAndroid.show("Error while sending the email",ToastAndroid.LONG);
              setLoading(false)
            }
          } catch (error) {
            console.error("Error sending email:", error);
            ToastAndroid.show("Error while sending the email",ToastAndroid.LONG);
          }
    }

  return (
    <View style={{marginTop:20,padding:20}}>
    
      <View style={styles.inputView}>
        <MaterialIcons name="local-offer" size={24} color={Colors.GRAY} />
        <TextInput placeholder='Subject' 
        value = {subject}
        onChangeText={(v)=>setSubject(v)}
        style={{width:'100%',fontSize:17}} />
      </View>

      <View style={styles.teatAreaView}>
      <Entypo name="new-message" size={24} color={Colors.GRAY} />
        <TextInput placeholder='Message' 
          value = {message}
          multiline={true}
          numberOfLines={5}
          onChangeText={(v)=>setMessage(v)}
        style={{width:'100%',fontSize:17}} />
      </View>
      
      <TouchableOpacity style={styles.button}
        disabled={!subject||!message||loading}
        onPress={()=>sendMail()}
      >
         {loading?
          <ActivityIndicator color={Colors.WHITE} /> 
        :
          <Text style={{textAlign:'center',
        fontSize:16,
        color:Colors.WHITE}}>Send</Text>}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  iconInput:{
    textAlign:'center',
    fontSize:30,
    padding:20,
    borderRadius:99,
    paddingHorizontal:28,
    color:Colors.WHITE
  },
  inputView:{
    borderWidth:1,
    display:'flex',
    flexDirection:'row',
    gap:5,
    padding:14,
    borderRadius:10,
    borderColor:Colors.GRAY,
    backgroundColor:Colors.WHITE,
    alignItems:'center',
    marginTop:20
  },
  teatAreaView:{
    borderWidth:1,
    display:'flex',
    flexDirection:'row',
    gap:5,
    padding:14,
    borderRadius:10,
    borderColor:Colors.GRAY,
    backgroundColor:Colors.WHITE,
    marginTop:20
  },
  button:{
    backgroundColor:Colors.PRIMARY,
    padding:15,
    borderRadius:10,
    marginTop:30
  }
})