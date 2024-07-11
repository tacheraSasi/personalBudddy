import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, ToastAndroid } from 'react-native'
import {useState, useEffect} from 'react'
import Colors from '../utils/Colors'
import { useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
export default function AiEmailSender() {
    const [topic, setTopic] = useState("")
    const [isConnected, setIsConnected] = useState(null);
    const [loading, setLoading] = useState(false)
    const router=useRouter();

    const aiSend = async ()=>{
        console.log(topic)
        setLoading(true)
        if(!isConnected){
            ToastAndroid.show("No internet connection",ToastAndroid.LONG);
            setLoading(false)
            return
        }

        try {
            const response = await fetch(`https://ekilie.onrender.com/api/assistant/sendmails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: `${topic}` }),
            })
            if(response){
                setLoading(false)
                setTopic("")
                ToastAndroid.show("sent successfully",ToastAndroid.LONG);
                console.log(response)
            }
        } catch (error) {
            
        }
    }
    
    useEffect(() => {
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
    }, [])
    

  return (
    <View style={{
        marginTop:20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:25,
        marginBottom:0
      }}>AI Email sender 🟤⚫</Text>
      <View style={{padding:6}}>
      
        <View style={styles.inputView}>
            <MaterialIcons name="local-offer" size={24} color={Colors.GRAY} />
            <TextInput placeholder='Topic 🤔' 
            onChangeText={(v)=>setTopic(v)}
            value = {topic}
            style={{width:'90%',fontSize:17}} />
        </View>

        
        <TouchableOpacity style={styles.button}
            disabled={!topic||loading}
            onPress={()=>aiSend()}
        >
            {loading?
            <ActivityIndicator  color={Colors.WHITE} /> 
            :
            <Text style={{textAlign:'center',
            fontSize:16,
            color:Colors.WHITE}}>Send</Text>}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginBottom:5,
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        backgroundColor:Colors.WHITE,
        // padding:10,
        borderRadius:15,
       
    },
    iconContainer:{
        justifyContent:'center',
        alignItems:'baseline',
       
    },
    iconText:{
        fontSize:35,
        padding:16,
        borderRadius:15,
        width:80,
        textAlign:'center'
    },
    categoryText:{
        fontFamily:'outfit-bold',
        fontSize:20,

    },
    itemCount:{
        fontFamily:'outfit',

    },
    subContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'70%'
    },
    totalAmountText:{
        fontFamily:'outfit-bold',
        fontSize:17
    },
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
      marginTop:20,
      width:"100%"
    },
    button:{
      backgroundColor:Colors.PRIMARY,
      padding:15,
      borderRadius:10,
      marginTop:15
    }
})