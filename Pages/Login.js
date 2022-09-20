import React, { Component } from 'react';
import { Toast, NativeBaseProvider, KeyboardAvoidingView } from 'native-base'
import {
  View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator,
  ScrollView, SafeAreaView, ScrollViewBase, Dimensions, Keyboard, TouchableWithoutFeedback
} from 'react-native'
import { Navigation } from 'react-native-navigation';
import APIs from '../Network/APIs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Transition from '../Transition/Transition';


export default class Login extends Component {

  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      userName: null,
      userPassword: null,
      indigatorState: 'init'
    }

  }



  login = async () => {
    this.setState({ indigatorState: '' })
    const response = await APIs.login(this.state.userName, this.state.userPassword)
    this.setState({ indigatorState: response.response })

    try { // Saves required info in the app
      await AsyncStorage.setItem("user_name", this.state.userName)
      await AsyncStorage.setItem("user_password", this.state.userPassword)
      await AsyncStorage.setItem("currency", response.currency)
      await AsyncStorage.setItem("shop_name", response.name)
      Transition.setRoot("Home")


    } catch (error) {

    }

  }

  render() {
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    return (
      <NativeBaseProvider>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
          <SafeAreaView style={{ height: screenHeight, width: screenWidth }}>
            <View style={{ alignSelf: "center", width: "100%", height: "10%", marginTop: "30%" }}>
              <TextInput onChangeText={(text) => { this.setState({ userName: text }) }} placeholder="User Name......" style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", alignSelf: "center", backgroundColor: "white", flex: 1 }} />
            </View>
            <View style={{ alignSelf: "center", width: "100%", height: "10%", margin: "5%" }}>
              <TextInput onChangeText={(text) => { this.setState({ userPassword: text }) }} placeholder="Password......" style={{ elevation: 2, borderRadius: 10, width: "85%", height: "100%", alignSelf: "center", backgroundColor: "white", flex: 1 }} />
            </View>
            <TouchableOpacity onPress={() => this.login() + Keyboard.dismiss()} style={{ elevation: 2, borderRadius: 10, backgroundColor: "#c71585", alignSelf: "center", width: "50%", height: "8%", margin: "5%", alignItems: "center", justifyContent: "center" }}>
              {
                this.state.indigatorState === '' ? <ActivityIndicator color={"white"} /> :
                  <View >
                    <Text style={{ fontSize: 25, color: "white" }}>LOGIN</Text>
                  </View>
              }

            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              Transition.go("Registration", "homeStackID", 0) // Navigate to Registration Page
            }}>
              <Text style={{ color: 'blue', fontSize: 14, marginBottom: "10%", alignSelf: 'center' }}>I have no account</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </TouchableWithoutFeedback>


      </NativeBaseProvider>

    );
  }
}
