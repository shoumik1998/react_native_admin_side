import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { Navigation } from 'react-native-navigation';
import APIs from '../Network/APIs';
import { NativeBaseProvider } from 'native-base'
import DeleteAccount from '../Components/DeleteAccount';
import Transition from '../Transition/Transition';

export default class AccountDetails extends Component {
    constructor(props) {
        super(props)
        Navigation.events().bindComponent(this)
        this.state = {
            all_info: {},
            modal_visibility_status: 0

        }
    }

    async componentDidMount() {
        this.getDetails()
    }



    getDetails = async () => {

        try {
            var user_name = await AsyncStorage.getItem("user_name")
            var user_password = await AsyncStorage.getItem("user_password")

            const detailsInfo = await APIs.fetchDetails(user_name, user_password)
            this.setState({ all_info: detailsInfo })


        } catch (error) {

        }

    }


    render() {
        const { name, user_name, country, district, subdistrict, region, Location, currency, cell_number } = this.state.all_info

        return (
            <NativeBaseProvider>
                {
                    this.state.modal_visibility_status > 0 && <DeleteAccount visibilityStatus={this.state.modal_visibility_status} />
                }
                <View style={this.styles.rootView}>

                    <View style={this.styles.infoStyles}>

                        <View style={{ flexDirection: 'row', width: "100%" }}>
                            <Text style={this.styles.titleStyles}>Shop Name </Text>
                            <Text style={this.styles.dataStyles}>{name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={this.styles.titleStyles}> User Name</Text>
                            <Text style={this.styles.dataStyles}>{user_name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={this.styles.titleStyles}>Country </Text>
                            <Text style={this.styles.dataStyles}>{country}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={this.styles.titleStyles}>District </Text>
                            <Text style={this.styles.dataStyles}>{district}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={this.styles.titleStyles}>Subdistrict </Text>
                            <Text style={this.styles.dataStyles}>{subdistrict}</Text>
                        </View>

                        {
                            Object.keys(this.state.all_info).length <= 0 && <ActivityIndicator color={"red"} />
                        }
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={this.styles.titleStyles}>Region </Text>
                            <Text style={this.styles.dataStyles}>{region}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={this.styles.titleStyles}>Location </Text>
                            <Text style={this.styles.dataStyles}>{Location}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={this.styles.titleStyles}>Currency </Text>
                            <Text style={this.styles.dataStyles}>{currency}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={this.styles.titleStyles}>Cell Number </Text>
                            <Text style={this.styles.dataStyles}>{cell_number}</Text>
                        </View>


                    </View>

                    <View style={this.styles.buttonsStyle}>
                        <TouchableOpacity onPress={() => {
                            Transition.go("Registration", "homeStackID", 1, this.state.all_info) // Go to registrtion page as to update info

                        }} style={{
                            alignItems: "center", backgroundColor: "#468499",
                            width: "60%", height: "40%", borderRadius: 10,
                            alignItems: "center", justifyContent: "center"
                        }}>
                            <Text style={this.styles.buttonText}>UPDATE ACCOUNT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ modal_visibility_status: this.state.modal_visibility_status + 1 })} // modal will be visible for each increament of 1
                        style={{
                            alignItems: "center", backgroundColor: "#ff0000",
                            width: "60%", height: "40%", borderRadius: 10,
                            alignItems: "center", justifyContent: "center"
                        }}>
                            <Text style={this.styles.buttonText}>DELETE ACCOUNT</Text>
                        </TouchableOpacity>
                        <View>

                        </View>
                    </View>
                </View>
            </NativeBaseProvider>
        );
    }

    styles = StyleSheet.create({
        rootView: {
            height: "100%", width: "100%", justifyContent: "space-evenly", alignItems: "center"
        },
        infoStyles: {
            height: "80%", width: "95%", justifyContent: "space-evenly",
            height: "70%", borderRadius: 20, backgroundColor: "white", elevation: 6

        },
        buttonsStyle: {
            height: "20%", width: "100%", justifyContent: "space-evenly", alignItems: "center", width: "100%", marginTop: "20%"

        },
        titleStyles: {
            color: "red", alignSelf: "flex-start", marginStart: "5%"

        },
        dataStyles: {
            color: "blue", marginStart: 'auto', marginEnd: "10%"

        },
        buttonText: {
            fontSize: 18, color: "white", alignSelf: "center"
        }

    })
}
