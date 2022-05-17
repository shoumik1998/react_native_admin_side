import React, { useEffect, useState } from "react";
import { Center, NativeBaseProvider,Toast } from "native-base";
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";
import Transition from "../Transition/Transition";
import AsyncStorage from "@react-native-async-storage/async-storage";



const SideMenuPage=()=>{
    return(
        <NativeBaseProvider>
            <View style={{flex:10,marginRight:"10%",backgroundColor:"white"}}>
                <View style={{flex:3,backgroundColor:"red",justifyContent:"center",alignItems:"center",
            borderBottomEndRadius:100}}>
                    
                </View>

                <View style={{flex:7,justifyContent:'space-evenly',backgroundColor:"white"}}>
                    <TouchableOpacity onPress={()=>{Transition.go("AllProducts","homeScreenID")}}>
                        <View style={styles.viewStyles}>
                             <Image source={require('../Assets/product.png')} style={styles.imageStyles}/> 
                            <Text style={styles.textStyles}>My Products</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{Transition.go("OrderedProducts","homeScreenID",1)}}>
                        <View style={styles.viewStyles}>
                            <Image source={require('../Assets/mobile_order.png')} style={styles.imageStyles}/>
                            <Text style={styles.textStyles}>Orders</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{Transition.go("Authentication","homeScreenID")}}>
                        <View style={styles.viewStyles}>
                            <Image source={require('../Assets/account.png')} style={styles.imageStyles}/>
                            <Text style={styles.textStyles}>My Account</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{Alert.alert("Out of Stock")}}>
                        <View style={styles.viewStyles}>
                            <Image source={require('../Assets/out_of_stock.png')} style={styles.imageStyles}/>
                            <Text style={styles.textStyles}>Stock Out Products</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{Transition.go("OrderedProducts","homeScreenID",4)}}>
                        <View style={styles.viewStyles}>
                            <Image source={require('../Assets/history.png')} style={styles.imageStyles}/>
                            <Text style={styles.textStyles}>History</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={async()=>{
                        try {
                            await AsyncStorage.clear()
                            Toast.show({title:"You are logged out"})
                            Transition.setRoot("Login")
                            
                        } catch (error) {
                            
                        }

                    }}>
                        <View style={styles.viewStyles}>
                            <Image source={require('../Assets/logout.png')} style={styles.imageStyles}/>
                            <Text style={styles.textStyles}>Log Out</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                
            </View>
        </NativeBaseProvider>
    )
}

const styles=StyleSheet.create({
    imageStyles:{
        height:30,width:30,marginRight:10

    },
    textStyles:{
        color:"black",fontSize:18

    },
    viewStyles:{
        flexDirection:'row',marginLeft:"10%"

    }
})

export default SideMenuPage;
