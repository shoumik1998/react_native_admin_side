import React, { Component } from 'react';
import {
    Text, View, StyleSheet, Image, TextInput,
    KeyboardAvoidingView, FlatList,
    TouchableOpacity,
    Alert, ActivityIndicator
} from 'react-native'
import { NativeBaseProvider, Toast } from "native-base"
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import APIs from '../Network/APIs';
import { Navigation } from 'react-native-navigation';
import ProductChildView from '../Components/ProductChildView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';

export default class AllProducts extends Component {

    constructor(props) {
        super(props)
        Navigation.events().bindComponent(this)
        this.state = {
            all_data: [],
            name: '',
            selected_id: [],
            refresh: false
        }
    }

    componentDidMount() {
        this.fetch_all_products()
    }

    async onDeleteProduct() {
        try {
            var delete_response = await APIs.deleteProduct(this.state.selected_id)
            if (delete_response.response === "ok") {

               this.setState({all_data:this.state.all_data.filter(item=>item.id !== this.state.selected_id)})
               this.setState({refresh:!this.state.refresh})

                Toast.show({ title: "Product deleted successfully" })

            } else {
                Toast.show({ title: "Failed to delete product" })
            }
            console.log(delete_response.response)

        } catch (error) {

        }
    }

    async fetch_all_products() {

        try {
            var user_name = await AsyncStorage.getItem("user_name")

            const response = await APIs.fetchAllProducts(user_name)

            this.setState({ all_data: response })
            this.setState({ name: response[0].name })
            console.log(this.state.name)

        } catch (error) {

        }
    }

    getSelected = (item) => this.state.selected_id.includes(item.id)

    render() {
        const screenWidth=Dimensions.get('window').width
        const screenHeight=Dimensions.get('window').height

        return (
            <NativeBaseProvider>
                <View style={{height:screenHeight,width : screenWidth}}>
                    <View style={{}}>
                        <Text style={{ fontSize: 18, alignSelf: "center", color: '#4682b4', margin: '2%', flex: 1 }}>{this.state.name}</Text>
                    </View>

                    {
                        this.state.all_data.length <= 0 &&
                        <View style={{
                            justifyContent: "center", alignItems: "center",
                            top: 0, bottom: 0, left: 0, right: 0
                            , position: 'absolute'
                        }}>
                            <ActivityIndicator style={{ alignSelf: 'center', position: 'absolute' }} size={'large'} />
                        </View>

                    }
                    {
                        this.state.selected_id.length > 0 &&
                        <TouchableOpacity onPress={() => {
                            this.onDeleteProduct()
                        }} style={{ width: 50, height: 50, alignSelf: 'flex-end', elevation: 10 }}>
                            <Image source={require("../Assets/delete.png")} style={{ width: "100%", height: "100%", tintColor: "red" }} />
                        </TouchableOpacity>
                    }
                    <View style={{ }}>
                        <FlatList
                        showsVerticalScrollIndicator={false}
                            extraData={!this.state.refresh}
                            keyExtractor={(item, index) => index.toString()}
                            style={{ alignSelf: 'center' }}
                            numColumns={2}
                            data={this.state.all_data}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {
                                    if (this.state.selected_id.length > 0) {
                                        if (this.state.selected_id.includes(item.id)) {
                                            const new_selectedId = this.state.selected_id.filter((newID) => newID !== item.id)
                                            this.setState({ selected_id: [...new_selectedId] })


                                        } else {
                                            this.setState({ selected_id: [...this.state.selected_id, item.id] })
                                        }
                                    }

                                }} onLongPress={() => {

                                    this.setState({ selected_id: [...this.state.selected_id, item.id] })
                                }}>
                                    <ProductChildView selectedId={this.getSelected(item)} data={item} />

                                </TouchableOpacity>

                            )}
                        />
                    </View>
                </View>
            </NativeBaseProvider>
        );
    }

   
}
