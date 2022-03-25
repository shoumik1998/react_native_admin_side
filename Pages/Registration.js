import React, { Component } from 'react';
import { Toast, NativeBaseProvider, Center } from 'native-base'
import {
  View, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingViewComponent,
  KeyboardAvoidingView, SafeAreaView, ScrollView, Alert, ImageBackground
} from 'react-native'

export default class Registration extends Component {
  render() {
    const image = ""
    return (
      <NativeBaseProvider>

        <SafeAreaView style={{ alignItems: "center", flex: 1, justifyContent: "center", backgroundColor: "#FFFFF0" }}>
          {/* <ImageBackground style={{flex:1,justifyContent:'space-evenly',width:"100%",height:"100%"}} resizeMode='cover' source={require("../Assets/back_main1.png")}> */}
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent:"space-around"}}  style={{ width: "100%", height: "100%"}}>
            <View style={{ alignSelf: "center", width: "100%", height: "8%", margin: "5%" }}>
              <TextInput placeholder="Country/State..." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
            </View>
            <View style={{ alignSelf: "center", width: "100%", height: "8%" }}>
              <TextInput placeholder="District..." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
            </View>
            <View style={{ alignSelf: "center", width: "100%", height: "8%", margin: "5%" }}>
              <TextInput placeholder="Subdistrict/Thana..." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
            </View>
            <View style={{ alignSelf: "center", width: "100%", height: "8%", margin: "5%" }}>
              <TextInput placeholder="Shop Region..." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
            </View>
            <View style={{ alignSelf: "center", width: "100%", height: "8%", margin: "5%" }}>
              <TextInput placeholder="Shop Location..." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
            </View>
            <View style={{ alignSelf: "center", width: "100%", height: "8%", margin: "5%" }}>
              <TextInput placeholder="Shop Name..." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
            </View>
            <View style={{ alignSelf: "center", width: "100%", height: "8%", margin: "5%" }}>
              <TextInput placeholder="Currency" style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
            </View>
            <View style={{ alignSelf: "center", width: "100%", height: "8%", margin: "5%" }}>
              <TextInput placeholder="Mobile No. with Country Code.." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
            </View>
            <View style={{ alignSelf: "center", width: "100%", height: "8%", margin: "5%" }}>
              <TextInput placeholder="Email/Phone..." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
            </View>
            <View style={{ alignSelf: "center", width: "100%", height: "8%", margin: "5%" }}>
              <TextInput placeholder="Password...." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
            </View>

          </ScrollView>

          <View style={{ elevation: 2, borderRadius: 12, backgroundColor: "#1e90ff", alignSelf: "center", width: "50%", height: "8%", margin: "5%", alignItems: "center", justifyContent: "center" }}>
            <Text onPress={() => {
              Toast.show({
                title: "hmmm"
              })
            }} style={{ fontSize: 23, color: "white" }}>REGISTER</Text>
          </View>


          {/* </ImageBackground> */}
        </SafeAreaView>
      </NativeBaseProvider>

    );
  }
}
