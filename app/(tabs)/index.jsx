import { View, Text, StyleSheet, Button, ScrollView, RefreshControl,StatusBar, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import {Link,useRouter} from 'expo-router'
import {supabase} from './../../utils/SupabaseConfig'
import services from './../../utils/services'
import { client } from './../../utils/KindeConfig';
import Header from '../../components/Header'
import Colors from './../../utils/Colors'
import CircularChart from '../../components/CircularChart'
import { Ionicons } from '@expo/vector-icons';
import CategoryList from '../../components/CategoryList'
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Counts from '../../components/Counts'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Home() {

    const router=useRouter();
    const [categoryList,setCategoryList]=useState();
    const [currentUser, setCurrentUser] = useState({})
    const [loading,setLoading]=useState(false);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [pushToken, setPushToken] = useState(null)

    useEffect(()=>{
        checkUserAuth();
        getCategoryList();

        registerForPushNotificationsAsync(currentUser).then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
      
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
      
        // Schedule notification on app start
        scheduleMorningPushNotification();
      
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };

    },[])

    /*
     * Used to check user Is already auth or not
     */
    const checkUserAuth=async()=>{
        const result=await JSON.parse(services.getData('isLoggedIn'));
        const userData = await services.getData('user')
        const user=JSON.parse(userData);
        if(user){
          setCurrentUser(user)
          // console.log(currentUser)
        }
        if(result!=true || !user)
        {
            router.replace('/login')
        }
    }

    

  const getCategoryList=async()=>{
    setLoading(true)
    const user=JSON.parse(await services.getData('user'));
    setCurrentUser(user)
    console.log(currentUser.fname)
    
    const {data,error}=await supabase.from('Category')
    .select('*,CategoryItems(*)')
    .eq('created_by',user.email)
    .order(['id'],{ascending:false})
    ;

    // console.log("Data",data) 
    setCategoryList(data);
    data&&setLoading(false)
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
          onRefresh={()=>getCategoryList()}
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
              <CircularChart categoryList={categoryList} />
              <Counts />
              <CategoryList categoryList={categoryList} />
             </View>
             
          
      </ScrollView>
    <Link href={'/add-new-category'} style={styles.adBtnContainer}>
     <Ionicons name="add-circle" size={64} color={Colors.PRIMARY} />
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
      
    }
})


//notifications
async function scheduleMorningPushNotification() {
  const notifications = [
    { 
      title: "Morning Memoir", 
      message: "Good morning! Start your day right by reviewing yesterday's expenses with Budddy. Reflect on your spending habits and plan for a financially successful day ahead. 🌅" 
    },
    { 
      title: "Rise and Shine Reminder", 
      message: "Rise and shine! Budddy is here to help you stay on top of your finances. Take a moment to set your financial goals for the day and prioritize your expenses. ☀️" 
    },
    { 
      title: "New Day, New Finances", 
      message: "Hello! It's a new day to track your expenses with Budddy. Let's make every penny count! Start your day with a positive financial mindset and make smart financial decisions. 💰" 
    },
    { 
      title: "Daily Budget Review", 
      message: "Good morning! Begin your day by reviewing your daily budget in Budddy. Set realistic spending limits and monitor your expenses to achieve financial stability. 💳" 
    },
    { 
      title: "Financial Goal Setting", 
      message: "Hello there! Take a moment to set specific financial goals for today in Budddy. Whether it's saving for a future expense or paying off debts, every step counts towards financial success. 🎯" 
    },
    { 
      title: "Expense Planning", 
      message: "Greetings! Plan your expenses for the day in Budddy. Allocate funds for essentials, savings, and discretionary spending to maintain a balanced budget. 📅" 
    }
  ];

  const randomIndex = Math.floor(Math.random() * notifications.length);
  const randomNotification = notifications[randomIndex];

  await Notifications.scheduleNotificationAsync({
    content: {
      title: randomNotification.title,
      body: randomNotification.message,
      data: { data: 'goes here' },
    },
    trigger: { 
      hour: 11,
      minute: 20,
      repeats: true,
    },
  });
}



async function registerForPushNotificationsAsync(currentUser) {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    
    // Sending the token to your backend
    await fetch('https://api.ekilie.com/send-token.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        userId: currentUser.unique_id // You can pass the user ID if needed
      }),
    });
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
}
