import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, KeyboardAvoidingView,
     TouchableOpacity, Alert, ActivityIndicator,Dimensions,TouchableWithoutFeedback,Keyboard } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NativeBaseProvider, ScrollView, Toast } from "native-base"
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
            imageData: '',
            imageMime: null,
            title: '',
            price: '',
            user_name: null,
            indigatorState: " "


        }
    }
    async componentDidMount() {
        this.setState({ shopName: await AsyncStorage.getItem("shop_name") })
        this.setState({ user_name: await AsyncStorage.getItem("user_name") })

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

    async uploadProductImage() {
        this.setState({ indigatorState: '' })
        if (!this.state.title.trim()) {
            Toast.show({ title: "Title must needed" })


        } else if (!this.state.price.trim()) {
            Toast.show({ title: "Price must needed" })

        } else if (!this.state.imageData.trim()) {
            Toast.show({ title: "Image must needed" })

        }

        else {
            const upResponse = await APIs.uploadImage(
                this.state.title,
                this.state.price,
                this.state.orderableStatus,
                this.state.imageData,
                this.state.user_name

            )
            console.log(upResponse)

            if (upResponse.response === "uploaded") {
                Toast.show({
                    title: 'Image uploded'
                }

                )
            } else if (upResponse.response === "exists") {
                Toast.show({ title: " This product exists, please try with different title" })
            } else {
                Toast.show({ title: " Something error occured" })
            }
            this.setState({ indigatorState: upResponse })
        }



    }

    render() {

        const screenWidth=Dimensions.get('window').width
        const screenHeight=Dimensions.get('window').height
        return (
            
            <NativeBaseProvider>
                <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
                    <View  style={{width:screenWidth,height:screenHeight,alignContent:'center',justifyContent:'center'}}>
                        <View style={{ justifyContent: 'center', flexDirection: 'row', flex: 2, width: "100%", height:"100%" ,alignItems:"center",alignContent:'center',alignSelf:"center"}}>
                            <TouchableOpacity onPress={() => {
                                Navigation.mergeOptions(this.props.componentId, {
                                    sideMenu: {
                                        left: {
                                            visible: true,
                                        },
                                    },
                                });

                            }} style={{ flex: 1.7,margin:'2%' }}>
                                <Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={require("../Assets/menu_512.png")} />
                            </TouchableOpacity>
                            <Text style={this.styles.shopNameStyle}>
                                {this.state.shopName}
                            </Text>
                        </View>

                        <View style={this.styles.nameTxtInput}>
                            <TextInput onChangeText={(text) => { this.setState({ title: text }) }} style={{ padding: 5, alignSelf: 'flex-start', width: "100%", height: '100%' }} placeholder='Product Name with details...' />
                        </View>

                        <View style={this.styles.nameTxtInput}>
                            <TextInput keyboardType='numeric' onChangeText={(text) => { this.setState({ price: text }) }} style={{ padding: 5, alignSelf: "flex-start", width: "100%", height: "100%" }} placeholder='Price...' />
                        </View>

                        <View style={this.styles.image}>
                            {
                                this.state.imageData !== null &&
                                <Image style={{ width: "100%", height: "100%" }} resizeMode={'contain'}
                                    source={{ uri: `data:${this.state.imageMime};base64,${this.state.imageData}` }} />

                            }
                        </View>

                        <TouchableOpacity onPress={() => this.uploadProductImage()} style={{
                            flexDirection: 'row', elevation: 10, borderRadius: 12, backgroundColor: "#6a5acd",
                            alignSelf: "center", width: "60%", height: "8%", margin: "5%", alignItems: "center", justifyContent: "center"
                        }}>

                            <Text style={{ fontSize: 18, color: "white" }}>UPLOAD IMAGE</Text>
                            {
                                this.state.indigatorState === '' && this.state.title != "" && this.state.price != "" ?
                                    <Text style={{ fontSize: 18, color: "white" }}>UPLOADING IMAGE</Text> &&
                                    <ActivityIndicator style={{ marginStart: 10 }} color={'white'} size={'small'} /> :

                                    <Image resizeMode={'contain'} source={require('../Assets/upload.png')} style={{
                                        alignSelf: 'flex-end',
                                        width: "15%", height: '90%', tintColor: 'white', marginLeft: "5%"
                                    }} />
                            }

                        </TouchableOpacity>
                        <View style={{ width: '100%', height: '10%', flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity style={{
                                flexDirection: 'row', elevation: 10, borderRadius: 12, backgroundColor: "#4169e1",
                                alignSelf: "center", width: "40%", height: "90%", margin: "5%", alignItems: "center", justifyContent: "center"
                            }}>
                                <Text style={{ fontSize: 18, color: "white" }}>CAMERA</Text>
                                <Image resizeMode={'contain'} source={require('../Assets/camera.png')} style={{
                                    alignSelf: 'flex-end', width:
                                        "15%", height: '90%', tintColor: 'white', marginLeft: "5%"
                                }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.cropProductImage()} style={{
                                flexDirection: 'row', elevation: 10, borderRadius: 12, backgroundColor: "#4169e1",
                                alignSelf: "center", width: "40%", height: "90%", margin: "5%", alignItems: "center", justifyContent: "center"
                            }}>

                                <Text style={{ fontSize: 18, color: "white" }}>GALLERY</Text>
                                <Image resizeMode={'contain'} source={require('../Assets/gallery.png')} style={{
                                    alignSelf: 'flex-end',
                                    width: "15%", height: '90%', tintColor: 'white', marginLeft: "5%"
                                }} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                this.state.orderableStatus == 0 ?
                                    this.setState({ orderableStatus: 1 }) : this.setState({ orderableStatus: 0 })
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

                    </View>
                    </TouchableWithoutFeedback>
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
            marginStart:"18%",
            fontSize: 19,
            flex: 9,
         alignSelf: 'center'

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
