import React, { Component } from 'react';
import { Toast, NativeBaseProvider } from 'native-base'
import { View, Text, TextInput, TouchableOpacity, Alert, Dimensions,Keyboard,TouchableWithoutFeedback } from 'react-native'
import { Navigation } from 'react-native-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Transition from '../Transition/Transition';

export default class Authentication extends Component {

  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      userName: null,
      userPassword: null
    }

  }

  onAuthenticate = async () => {
    try {
      var user_name = await AsyncStorage.getItem("user_name")
      var user_password = await AsyncStorage.getItem("user_password")
    } catch (error) {

    }


    if (this.state.userName === user_name && this.state.userPassword === user_password) {
      Transition.go("AccountDetails", "homeStackID")

    } else {
      Alert.alert("Not authenticated")
    }
  }




  render() {
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    return (
      <NativeBaseProvider>
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
        <View style={{ backgroundColor: "#FFFFF0", width: screenWidth, height: screenHeight }}>
          <View style={{ alignSelf: "center", width: "100%", height: "10%", marginTop: "30%" }}>
            <TextInput onChangeText={(text) => { this.setState({ userName: text }) }} placeholder="User Name...." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
          </View>
          <View style={{ alignSelf: "center", width: "100%", height: "10%", margin: "5%" }}>
            <TextInput onChangeText={(text) => { this.setState({ userPassword: text }) }} placeholder="Password...." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
          </View>
          <TouchableOpacity onPress={() => this.onAuthenticate()+ Keyboard.dismiss()} style={{ elevation: 2, borderRadius: 10, backgroundColor: "#008080", alignSelf: "center", width: "50%", height: "8%", margin: "5%", alignItems: "center", justifyContent: "center" }}>
            <View >
              <Text style={{ fontSize: 25, color: "white" }}>SUBMIT</Text>
            </View>
          </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
      </NativeBaseProvider>

    );
  }
}
