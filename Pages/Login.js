import React, { Component } from 'react';
import {Toast,NativeBaseProvider} from 'native-base'
import {View,Text,TextInput,TouchableOpacity} from 'react-native'
import { Navigation } from 'react-native-navigation';
import APIs from '../Network/APIs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Transition from '../Transition/Transition';

export default class Login extends Component {

  constructor(props){
    super(props)
    Navigation.events().bindComponent(this)
    this.state={
      userName:null,
      userPassword:null
    }
    
  }


  login=async()=>{
    const response= await APIs.login(this.state.userName,this.state.userPassword)

    try {

      await AsyncStorage.setItem("user_name" , this.state.userName)
      await AsyncStorage.setItem("user_password",this.state.userPassword)
      await AsyncStorage.setItem("currency", response.currency)
      await AsyncStorage.setItem("shop_name", response.name)
      Transition.setRoot("Home")

      
    } catch (error) {
      
    }


    

  }
  
  render() {
    return (
        <NativeBaseProvider>
            <View style={{ alignItems: "center", flex: 1, backgroundColor: "#FFFFF0" }}>
        <View style={{ alignSelf: "center", width: "100%", height: "10%", marginTop: "30%" }}>
          <TextInput onChangeText={(text) => { this.setState({ userName: text }) }} placeholder="User Name...." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
        </View>
        <View style={{ alignSelf: "center", width: "100%", height: "10%", margin: "5%" }}>
          <TextInput onChangeText={(text) => { this.setState({ userPassword: text }) }} placeholder="Password...." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
        </View>
        <TouchableOpacity onPress={()=>this.login()} style={{ elevation: 2, borderRadius: 10, backgroundColor: "#c71585", alignSelf: "center", width: "50%", height: "8%", margin: "5%", alignItems: "center", justifyContent: "center" }}>
          <View >
            <Text style={{ fontSize: 25, color: "white" }}>LOGIN</Text>
          </View>
        </TouchableOpacity>
        


        <View>
          <Text  style={{ color: 'blue', fontSize: 18 }}>I have no account</Text>
        </View>
      </View>
        </NativeBaseProvider>
      
    );
  }
}
