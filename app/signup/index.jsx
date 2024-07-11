import { View, Text, Image, StyleSheet, TouchableOpacity, Linking,TextInput,KeyboardAvoidingView, Alert, ToastAndroid  } from 'react-native'
import React, { useState, useEffect} from 'react'
import loginBg from './../../assets/images/loginbg.jpeg';
import Vector from './../../assets/vector.jpg';
import Colors from '../../utils/Colors';
import {client} from './../../utils/KindeConfig'
import services from './../../utils/services'
import {useRouter} from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
export default function LoginScreen() {
    const [isProceedBtnClicked, setIsProceedBtnClicked] = useState(false);
    const [isAuth, setIsAuth] = useState(false)
    const [isLoad ,setIsLoad] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router=useRouter();
    const [isConnected, setIsConnected] = useState(null);

    useEffect(()=>{
        const isLoggedIn = services.getData('isLoggedIn')
        if(isLoggedIn == true){
            router.push('/')
        }
        

        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
          });
      
          // Check initial network state
          NetInfo.fetch().then(state => {
            setIsConnected(state.isConnected);
        });
      
        return () => {
          unsubscribe();
        };
    },[])

    const handleSignIn = async () => {
        setIsLoad(true);

        if(!isConnected){
            router.replace('/no-connection')
        }
    
        try {
            const response = await axios.post('https://api.ekilie.com/login-budddy.php', {
                email: email,
                password: password
            },
            {
              headers: {
                'Content-Type': 'application/json', // Setting the content type to JSON
              },
            });
    
            console.log(email, password);
    
            const data = response.data; // Extracting data from the response
    
            if (data.success) {
                // User authentication successful
                router.push('/');
                console.log('Login successful',JSON.stringify(data.user_data) );
    
                // Save user data to AsyncStorage
                await services.storeData('user', JSON.stringify(data.user_data));
                await services.storeData('isLoggedIn', JSON.stringify(data.success));
            } else {
                // User authentication failed
                console.log('Login failed', data.message);
                ToastAndroid.show(data.message,ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    
        setIsLoad(false);
    };
    
    
    const openEkilie = () => {
      Linking.openURL('https://ekilie.com');
    };

  return (
    <View style={{
        display:'flex',
        alignItems:'center'
    }}>
        {!isProceedBtnClicked&&
        <Image source={loginBg}
        style={styles.bgImage}
        />}
        {isProceedBtnClicked&&
        <Image source={Vector}
        style={styles.bgIcon}
        />}
        <KeyboardAvoidingView style={{
            backgroundColor:Colors.PRIMARY,
            width:'100%',
            height:'100%',
            padding:20,
            marginTop:isProceedBtnClicked?20:-30,
            borderTopLeftRadius:30,
            borderTopRightRadius:30
        }}>
            <Text
            style={{
                fontSize:35,
                fontWeight:'bold',
                textAlign:'center',
                color:Colors.WHITE
            }}
            >{isProceedBtnClicked?'Login':'BUDDDY'}</Text>

            <Text style={{
                fontSize:isProceedBtnClicked?12:18,
                textAlign:'center',
                color:Colors.WHITE,
                marginTop:isProceedBtnClicked?8:20
            }}>
              Sign in to BUDDDY with your ekilie account
              </Text>

            {!isProceedBtnClicked&&<>
            <TouchableOpacity style={styles.button}
            onPress={()=>{setIsProceedBtnClicked(true)}}>
                <Text style={{textAlign:'center',
            color:Colors.PRIMARY}} >Proceed</Text>
            </TouchableOpacity>
            <Text style={{textAlign:'center',fontSize:13,color:Colors.GRAY,marginTop:10}}>
                Login/signup implies agreement with our terms and policies.{' '}
                <TouchableOpacity onPress={openEkilie} style={{ textAlign:'center',alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                    <Text style={{ color: 'white' }}>Read</Text>
                </TouchableOpacity>
            </Text></>}
            {isProceedBtnClicked&&
            <>
                <View style={styles.inputView}>
                    <MaterialIcons name="email" size={24} color={Colors.GRAY} />
                    <TextInput placeholder='email on ekilie' 
                    onChangeText={(v)=>setEmail(v)}
                    style={{width:'100%',fontSize:17}} />
                </View>
                <View style={styles.inputView}>
                    <MaterialIcons name="password" size={24} color={Colors.GRAY} />
                    <TextInput placeholder='Password'
                    secureTextEntry={true} 
                    onChangeText={(v)=>setPassword(v)}
                    style={{width:'100%',fontSize:17}} />
                </View>

                <TouchableOpacity style={styles.buttonLogin}
                onPress={handleSignIn}>
                    <Text style={{textAlign:'center',
                color:'white'}} >{isLoad?'loading...':'Login'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonToSignup}
                onPress={()=>{
                    Linking.openURL('https://ekilie.com/auth/signup/?action=open-budddy')
                }}>
                    <Text style={{textAlign:'center',
                    color:'#033a2c'}} >
                    Signup instead
                   </Text>
                    
                </TouchableOpacity>
            
            </>
            }
        </KeyboardAvoidingView>
        
    </View>
  )
}

const styles = StyleSheet.create({
    bgImage:{
        width:200,
        height:400,
        marginTop:70,
        borderWidth:4,
        borderRadius:20,
        borderColor:Colors.BLACK
    },
    bgIcon:{
        width:120,
        height:120,
        marginTop:70,
        padding:3,
        borderWidth:1,
        borderRadius:20,
        borderColor:Colors.BLACK
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

    button:{
        backgroundColor:Colors.WHITE,
        padding:15,
        paddingHorizontal:5,
        borderRadius:99,
        marginTop:30
    },
    buttonLogin:{
        backgroundColor:'#033a2c',
        color:'#fff',
        padding:15,
        paddingHorizontal:5,
        borderRadius:99,
        marginTop:30
    },
    buttonToSignup:{
        backgroundColor:'#75ad9e',
        borderWidth:2,
        borderColor:'#033a2c',
        color:'#033a2c',
        padding:15,
        paddingHorizontal:5,
        borderRadius:99,
        marginTop:30,
        display:'flex',
        alignItems:'center',
    }
})