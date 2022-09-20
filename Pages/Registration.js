import React, { Component } from 'react';
import { Toast, NativeBaseProvider, Center } from 'native-base'
import {
  View, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingViewComponent,
  KeyboardAvoidingView, SafeAreaView, ScrollView, Alert, ImageBackground, ActivityIndicator, Dimensions, Keyboard
} from 'react-native'
import { Navigation } from 'react-native-navigation';
import APIs from '../Network/APIs';
import Transition from '../Transition/Transition';

export default class Registration extends Component {

  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      country: '', district: '', subdistrict: '', region: '', location: '', shop_name: '', user_name: '', password: '', currency: '',
      cell_number: '', selector_code: 0,
      response: " "
    }
  }

  componentDidMount() {
    this.setState({ selector_code: this.props.selector_code }, () => {


      if (this.state.selector_code == 1) {  // If selector code is 1 then this page will act as update page
        this.setState({ country: this.props.data.country })
        this.setState({ district: this.props.data.district })
        this.setState({ subdistrict: this.props.data.subdistrict })
        this.setState({ region: this.props.data.region })
        this.setState({ location: this.props.data.Location })
        this.setState({ user_name: this.props.data.user_name })
        this.setState({ password: this.props.data.user_password })
        this.setState({ shop_name: this.props.data.name })
        this.setState({ currency: this.props.data.currency })
        this.setState({ cell_number: this.props.data.cell_number })
      }
    })

  }

  async onRegister() {
    if (!this.state.country.trim()) {
      Toast.show({ title: "Country name is missed" })

    } else if (!this.state.district.trim()) {
      Toast.show({ title: "District name is missed" })
    }
    else if (!this.state.subdistrict.trim()) {
      Toast.show({ title: "Subdistrict name is missed" })
    } else if (!this.state.region.trim()) {
      Toast.show({ title: "Region name is missed" })
    } else if (!this.state.location.trim()) {
      Toast.show({ title: "Shop location name is missed" })
    } else if (!this.state.shop_name.trim()) {
      Toast.show({ title: "Shop name is missed" })
    } else if (!this.state.user_name.trim()) {
      Toast.show({ title: "User  name is missed" })
    } else if (!this.state.password.trim()) {
      Toast.show({ title: "Password  is missed" })
    } else if (!this.state.currency.trim()) {
      Toast.show({ title: "Cirrency is missed" })
    } else if (!this.state.cell_number.trim()) {
      Toast.show({ title: "Cell number is missed" })
    } else {
      this.setState({ response: "" })
      try {
        const registerResponse = await APIs.register(
          this.state.country, this.state.district, this.state.subdistrict, this.state.region, this.state.location,
          this.state.shop_name, this.state.user_name, this.state.password, this.state.currency,
          this.state.cell_number, this.state.selector_code
        )
        this.setState({ response: registerResponse }, () => {
          if (registerResponse.response === "inserted") {
            Toast.show({ title: "Congratulations, Account created successfully" })
            Transition.setRoot("Login")

          } else if (registerResponse.response === "updated") {
            Toast.show({ title: "Account updated successfully" })
            Transition.setRoot("Login")

          } else if (registerResponse.response === "exists") {
            Toast.show({ title: "Account already exists, please try with another user name" })

          } else {
            Toast.show({ title: "Failed to execute task , please try later" })
          }
        })


      } catch (error) {

      }
    }

  }



  render() {
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    return (
      <NativeBaseProvider>

        <SafeAreaView style={{ alignItems: "center", flex: 1, justifyContent: "center", backgroundColor: "#FFFFF0" }}>
          {/* <ImageBackground style={{flex:1,justifyContent:'space-evenly',width:"100%",height:"100%"}} resizeMode='cover' source={require("../Assets/back_main1.png")}> */}
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent: "space-around" }} style={{ width: "100%", height: "100%" }}>
            <View style={{ alignSelf: "center", width: "100%", height: "8%", margin: "5%" }}>
              <TextInput editable={true} value={this.state.country} onChangeText={(text) => this.setState({ country: text })} placeholder="Country/State..." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
            </View>
            <View style={{ alignSelf: "center", width: "100%", height: "8%" }}>
              <TextInput value={this.state.district} onChangeText={(text) => this.setState({ district: text })} placeholder="District..." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
            </View>
            <View style={{ alignSelf: "center", width: "100%", height: "8%", margin: "5%" }}>
              <TextInput value={this.state.subdistrict} onChangeText={(text) => this.setState({ subdistrict: text })} placeholder="Subdistrict/Thana..." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
            </View>
            <View style={{ alignSelf: "center", width: "100%", height: "8%", margin: "5%" }}>
              <TextInput value={this.state.region} onChangeText={(text) => this.setState({ region: text })} placeholder="Shop Region..." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
            </View>
            <View style={{ alignSelf: "center", width: "100%", height: "8%", margin: "5%" }}>
              <TextInput value={this.state.location} onChangeText={(text) => this.setState({ location: text })} placeholder="Shop Location..." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
            </View>
            <View style={{ alignSelf: "center", width: "100%", height: "8%", margin: "5%" }}>
              <TextInput value={this.state.shop_name} onChangeText={(text) => this.setState({ shop_name: text })} placeholder="Shop Name..." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
            </View>
            <View style={{ alignSelf: "center", width: "100%", height: "8%", margin: "5%" }}>
              <TextInput value={this.state.currency} onChangeText={(text) => this.setState({ currency: text })} placeholder="Currency" style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
            </View>
            <View style={{ alignSelf: "center", width: "100%", height: "8%", margin: "5%" }}>
              <TextInput value={this.state.cell_number} onChangeText={(text) => this.setState({ cell_number: text })} placeholder="Mobile No. with Country Code.." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
            </View>
            {
              this.state.selector_code === 0 ?
                <View style={{ alignSelf: "center", width: "100%", height: "8%", margin: "5%" }}>
                  <TextInput onChangeText={(text) => this.setState({ user_name: text })} placeholder="Email/Phone..." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
                </View> : null
            }

            <View style={{ alignSelf: "center", width: "100%", height: "8%", margin: "5%" }}>
              <TextInput value={this.state.password} onChangeText={(text) => this.setState({ password: text })} placeholder="Password...." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
            </View>

          </ScrollView>

          <TouchableOpacity onPress={() => {

            this.onRegister() + Keyboard.dismiss()


          }}
            style={{ elevation: 2, borderRadius: 12, backgroundColor: "#1e90ff", alignSelf: "center", width: "50%", height: "8%", margin: "5%", alignItems: "center", justifyContent: "center" }}>
            {
              this.state.response == '' ? <ActivityIndicator color={"white"} /> : (
                this.state.selector_code === 0 ?
                  <Text style={{ fontSize: 23, color: "white" }}>REGISTER</Text> :
                  <Text style={{ fontSize: 23, color: "white" }}>UPDATE</Text>
              )



            }

          </TouchableOpacity>


          {/* </ImageBackground> */}
        </SafeAreaView>
      </NativeBaseProvider>

    );
  }
}
