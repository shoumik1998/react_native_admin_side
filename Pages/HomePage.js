import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'
import { NativeBaseProvider, Toast } from "native-base"
import { SafeAreaView } from 'react-native-safe-area-context';
import { Navigation } from 'react-native-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageCropPicker from 'react-native-image-crop-picker';
import APIs from '../Network/APIs';


export default class HomePage extends Component {
    constructor(props) {
        super(props)
        Navigation.events().bindComponent(this)
        this.state = {
            shopName: null,
            orderableStatus: 0,
            imageData: null,
            imageMime: null,
            title:'',
            price:'',
            user_name:null


        }
    }
    async componentDidMount() {
        this.setState({ shopName: await AsyncStorage.getItem("shop_name") })
        this.setState({user_name: await AsyncStorage.getItem("user_name")})
        
    }

    cropProductImage() {
        ImageCropPicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            includeBase64: true
        }).then(image => {
            this.setState({ imageData: image.data })
            this.setState({ imageMime: image.mime })

        })


    }

    async uploadProductImage(){
        if (!this.state.title.trim()) {
            Toast.show({title: "Title must needed"})

            
        }else if(!this.state.price.trim()){
            Toast.show({title:"Price must needed"})

        }else{
            const upResponse=await APIs.uploadImage(
            this.state.title,
            this.state.price,
            this.state.orderableStatus,
            this.state.imageData,
            this.state.user_name
            
        )
        console.log(upResponse)

        if (upResponse.response==="uploaded") {
            Toast.show({
                title:'Image uploded'
            }
                
            )
        }else{
            Toast.show({title:" Failed to upload"})
        }
        }

        

    }





    render() {
        return (
            <NativeBaseProvider>

                <SafeAreaView style={this.styles.rootStyle}>
                    <View style={{ alignContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                        <Text style={this.styles.shopNameStyle}>
                            {this.state.shopName}
                        </Text>
                    </View>

                    <View style={this.styles.nameTxtInput}>
                        <TextInput onChangeText={(text)=>{this.setState({title:text})}} style={{ padding: 5, alignSelf: 'flex-start', width: "100%", height: '100%' }} placeholder='Product Name with details...' />
                    </View>

                    <View style={this.styles.nameTxtInput}>
                        <TextInput onChangeText={(text)=>{this.setState({price:text})}} style={{ padding: 5, alignSelf: "flex-start", width: "100%", height: "100%" }} placeholder='Price...' />
                    </View>

                    <View style={this.styles.image}>
                        {
                            this.state.imageData !== null &&
                            <Image style={{ width: "100%", height: "100%" }} resizeMode={'contain'}
                                source={{ uri: `data:${this.state.imageMime};base64,${this.state.imageData}` }} />

                        }
                    </View>

                    <TouchableOpacity onPress={()=>this.uploadProductImage()} style={{ flexDirection: 'row', elevation: 10, borderRadius: 12, backgroundColor: "#6a5acd",
                     alignSelf: "center", width: "60%", height: "8%", margin: "5%", alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 18, color: "white" }}>UPLOAD IMAGE</Text>
                        <Image resizeMode={'contain'} source={require('../Assets/upload.png')} style={{ alignSelf: 'flex-end',
                         width: "15%", height: '90%', tintColor: 'white', marginLeft: "5%" }} />
                    </TouchableOpacity>
                    <View style={{ width: '100%', height: '10%', flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', elevation: 10, borderRadius: 12, backgroundColor: "#4169e1",
                         alignSelf: "center", width: "40%", height: "90%", margin: "5%", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontSize: 18, color: "white" }}>CAMERA</Text>
                            <Image resizeMode={'contain'} source={require('../Assets/camera.png')} style={{ alignSelf: 'flex-end', width:
                             "15%", height: '90%', tintColor: 'white', marginLeft: "5%" }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.cropProductImage()} style={{ flexDirection: 'row', elevation: 10, borderRadius: 12, backgroundColor: "#4169e1",
                         alignSelf: "center", width: "40%", height: "90%", margin: "5%", alignItems: "center", justifyContent: "center" }}>
                            
                            <Text style={{ fontSize: 18, color: "white" }}>GALLERY</Text>
                            <Image resizeMode={'contain'} source={require('../Assets/gallery.png')} style={{ alignSelf: 'flex-end', 
                            width: "15%", height: '90%', tintColor: 'white', marginLeft: "5%" }} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                    onPress={()=>{
                        this.state.orderableStatus===0 ?
                        this.setState({orderableStatus:1}) : this.setState({orderableStatus:0})
                    }} 
                     style={{
                        flexDirection: 'row', elevation: 10, borderRadius: 5, backgroundColor: "#4169e1",
                        alignSelf: "center", width: "40%", height: "5%", margin: "5%", alignItems: "center", justifyContent: "center"
                    }}>
                        
                          
                                {
                                    this.state.orderableStatus === 1 ?
                                        <Text style={{ fontSize: 18, color: "white" }}>Orderable</Text> :
                                        <Text style={{ fontSize: 18, color: "white" }}> Not Orderable</Text>
                                }
                            
        


                    </TouchableOpacity>

                </SafeAreaView>

            </NativeBaseProvider>



        );
    }

    styles = StyleSheet.create({
        rootStyle: {
            width: "100%",
            height: "100%"
        },
        shopNameStyle: {
            color: "#6897bb",
            fontSize: 19,
            marginBottom: "7%"

        },
        nameTxtInput: {
            width: "90%",
            height: "10%",
            borderRadius: 10,
            elevation: 3,
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: "white",
            marginBottom: "5%"

        },
        image: {
            width: "100%",
            height: "30%"

        }

    })

}
