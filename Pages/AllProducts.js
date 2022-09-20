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

        }
    }

    componentDidMount() {

        this.fetch_all_products()
    }

    async onDeleteProduct() {
        try {
            var delete_response = await APIs.deleteProducts(this.state.selected_id)
            if (delete_response.response === "ok") {

                this.setState({ all_data: this.state.all_data.filter(item => item.id !== this.state.selected_id) })
                this.fetch_all_products() //Re-rendering items
                Toast.show({ title: "successfully deleted" })

            } else {
                Toast.show({ title: "Failed to " })
            }
            console.log(delete_response.response)

        } catch (error) {

        }
    }

    async onStockoutProduct() {
        try {
            var stockOut_response = await APIs.stockoutProduct(this.state.selected_id)
            if (stockOut_response.response === "ok") {

                this.setState({ all_data: this.state.all_data.filter(item => item.id !== this.state.selected_id) })

                this.fetch_all_products() //Re-rendering items
                

                Toast.show({ title: "successfully put  out of stock" })

            } else {
                Toast.show({ title: "Failed to put out of stock" })
            }


        } catch (error) {

        }
    }



    async fetch_all_products() {
        var deletion_status = this.props.selector_code;
        try {
            var user_name = await AsyncStorage.getItem("user_name")
            const response = await APIs.fetchAllProducts(user_name, deletion_status)

            this.setState({ all_data: response })
            this.setState({ name: response[0].name })
            console.log(deletion_status)

        } catch (error) {

        }
    }

    getSelected = (item) => this.state.selected_id.includes(item.id)

    render() {
        const screenWidth = Dimensions.get('window').width
        const screenHeight = Dimensions.get('window').height

        return (
            <NativeBaseProvider>
                <View style={{ height: screenHeight, width: screenWidth }}>
                    <View style={{ width: screenWidth, height: screenHeight * 0.08 }}>
                        {
                            this.props.selector_code == 0 ?
                                <Text style={{ fontSize: 18, alignSelf: "center", color: '#4682b4', margin: '2%', flex: 1 }}>{this.state.name}</Text> :
                                <Text style={{ fontSize: 18, alignSelf: "center", color: '#4682b4', margin: '2%', flex: 1 }}>Stock Out Products</Text>
                        }

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
                            if (this.props.selector_code == 0) {
                                this.onStockoutProduct()
                            } else if (this.props.selector_code == 1) {
                                this.onDeleteProduct()
                            }

                        }} style={{ width: 50, height: 50, alignSelf: 'flex-end', elevation: 10 }}>
                            <Image source={require("../Assets/delete.png")} style={{ width: "100%", height: "100%", tintColor: "red" }} />
                        </TouchableOpacity>
                    }
                    <View style={{}}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            style={{ alignSelf: 'center' }}
                            numColumns={2}
                            data={this.state.all_data}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {
                                    if (this.state.selected_id.length > 0) {
                                        if (this.state.selected_id.includes(item.id)) {
                                            const new_selectedId = this.state.selected_id.filter((newID) => newID !== item.id)//Deselecting selected items
                                            this.setState({ selected_id: [...new_selectedId] })


                                        } else {
                                            this.setState({ selected_id: [...this.state.selected_id, item.id] }) //Select items
                                        }
                                    }

                                }} onLongPress={() => {

                                    this.setState({ selected_id: [...this.state.selected_id, item.id] }) //selecting a single  item
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
