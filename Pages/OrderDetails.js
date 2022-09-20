import React, { Component } from 'react';
import { Text, Dimensions, View, Image, TouchableOpacity, Alert } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { Navigation } from 'react-native-navigation';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import APIs from '../Network/APIs';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class OrderDetails extends Component {

    constructor(props) {
        super(props)
        Navigation.events().bindComponent(this)
        this.state = {
            delivering_date_color: "#133337",
            rejectColor: '#ff0000',
            receiveColor: '#065535',
            deliverColor: '#0000ff',
            ddBtnDisable: false,
            rejectBtnDisable: false,
            receiveBtnDisable: false,
            deliveringBtnDisable: false,
            deliveringDateBtnDisable: false,
            btnGroupEnable: "flex",
            delivering_date: "",
            receiveTxt: "Receive",
            rejectTxt: "Reject",
            deliverTxt: "Deliver",
            open_DT_picker: false,
            mydate: new Date(),
            displaymode: 'date'
        }
    }

    componentDidMount() {
        this.setState({ delivering_date: this.props.data.delivering_date })
        this.setButtonActivity()
    }

   

    async onAllButtonTask(status_code) {  // Controls all the buttons activity like when each  button will be enabled or disabled or  changes color after 
        // receiving response from server
        try {
            var user_name = await AsyncStorage.getItem("user_name")
            const { product_id, phn_gmail, issue_date } = this.props.data


            var response = await APIs.orderReceive(product_id, status_code,
                this.state.delivering_date, phn_gmail, issue_date,
                moment(new Date()).format("DD-MM-YYYY   h:mm:ss a").toString(), user_name)
            if (response.response == "received") {
                this.setState({ receiveTxt: "Received" })
                this.setState({ receiveBtnDisable: true })
                this.setState({ receiveColor: "#699985" })
                this.setState({ rejectBtnDisable: true })
                this.setState({ rejectColor: "#ff6666" })

            } else if (response.response == "delivered") {
                this.setState({ receiveBtnDisable: true })
                this.setState({ rejectBtnDisable: true })
                this.setState({ deliveringBtnDisable: true })
                this.setState({ receiveColor: "#699985" })
                this.setState({ rejectColor: "#ff6666" })
                this.setState({ rejectColor: "#7f7fff" })

            }
            else if (response.response == "rejected") {
                this.setState({ receiveBtnDisable: true })
                this.setState({ rejectBtnDisable: true })
                this.setState({ deliveringBtnDisable: true })
                this.setState({ receiveColor: "#699985" })
                this.setState({ rejectColor: "#ff6666" })
                this.setState({ rejectColor: "#7f7fff" })
                this.setState({ rejectTxt: "Rejected" })

            } else if (response.response == "failed") {

            }
        } catch (error) {

        }
    }

    setButtonActivity() { // Controls all the buttons activity like when each  button will be enabled or disabled or  changes color initially
        var status_code = this.props.selector_code
        var order_status = this.props.data.order_status

        if (status_code == 4 || status_code == 3) {
            this.setState({ btnGroupEnable: "none" })
        } else {
            if (this.state.delivering_date == "") {
                this.setState({ receiveBtnDisable: true })
                this.setState({ receiveColor: "#699985" })
            }

            if (order_status == 0) { //pending
                this.setState({ receiveBtnDisable: true })
                this.setState({ deliveringBtnDisable: true })
                this.setState({ rejectBtnDisable: false })
                this.setState({ receiveColor: "#699985" })
                this.setState({ deliverColor: "#7f7fff" })
                this.setState({ rejectColor: "#ff0000" })

            } else if (order_status == 1) { // received
                this.setState({ receiveBtnDisable: true })
                this.setState({ rejectBtnDisable: true })
                this.setState({ deliveringDateBtnDisable: true })
                this.setState({ receiveColor: "#699985" })
                this.setState({ rejectColor: "#ff6666" })
                this.setState({ delivering_date_color: "#133300" })
                this.setState({ receiveTxt: "Received" })
            } else if (order_status == 2) { // client acknowledgement
                this.setState({ receiveBtnDisable: true })
                this.setState({ rejectBtnDisable: true })
                this.setState({ deliveringBtnDisable: true })
                this.setState({ receiveColor: "#699985" })
                this.setState({ rejectColor: "#ff6666" })
                this.setState({ rejectColor: "#7f7fff" })
            } else if (order_status == 3) { // rejected
                this.setState({ receiveBtnDisable: true })
                this.setState({ rejectBtnDisable: true })
                this.setState({ deliveringBtnDisable: true })
                this.setState({ receiveColor: "#699985" })
                this.setState({ rejectColor: "#ff6666" })
                this.setState({ rejectColor: "#7f7fff" })
                this.setState({ rejectTxt: "Rejected" })

            } else if (order_status == 4) { //Delivered
                this.setState({ receiveBtnDisable: true })
                this.setState({ rejectBtnDisable: true })
                this.setState({ deliveringBtnDisable: true })
                this.setState({ receiveColor: "#699985" })
                this.setState({ rejectColor: "#ff6666" })
                this.setState({ rejectColor: "#7f7fff" })
                this.setState({ deliverTxt: "Delivered" })
            }

        }

    }


    render() {
        const screenWidth = Dimensions.get('window').width
        const screenHeight = Dimensions.get('window').height
        const { address, client_name, contact_no, imagepath, number_of_product, product_price,
            issue_date, delivering_date, order_status } = this.props.data

        return (
            <NativeBaseProvider>
                {
                    this.state.open_DT_picker && (
                        <DateTimePicker                 // Sets delivering date and time 
                            testID="dateTimePicker"
                            value={this.state.mydate}
                            mode={this.state.displaymode} 
                            is24Hour={true}
                            display="default"
                            onChange={(event, selected_date) => {
                                this.setState({ delivering_date: moment(selected_date).format("DD-MM-YYYY   h:mm:ss a").toString() })
                                this.setState({ displaymode: "time" })

                                if (this.state.displaymode == "time") {
                                    this.setState({ open_DT_picker: false })
                                    this.setState({ displaymode: "date" })
                                    this.setState({ receiveBtnDisable: false })
                                    this.setState({ receiveColor: "#065535" })
                                }
                            }}

                        />) 
                }
                <View style={{ width: screenWidth, height: screenHeight }}>
                    <View style={{ height: screenHeight / 3, width: screenWidth, margin: '2%' }}>
                        <Image source={{ uri: imagepath }} resizeMode='contain' style={{ height: "100%", width: "100%" }} />
                    </View>
                    <View style={{ alignItems: 'center', margin: '3%' }}>
                        <Text>{ }</Text>
                    </View>
                    <View style={{ flexDirection: 'row', margin: '5%', justifyContent: 'space-between' }}>
                        <Text>{number_of_product} </Text>
                        <Text> {product_price}</Text>
                        <Text>{number_of_product * product_price}</Text>

                    </View>
                    <View style={{ flexDirection: 'column', margin: '3%', justifyContent: 'space-between' }}>
                        <Text style={{ margin: '1%' }}>{client_name}</Text>
                        <Text style={{ margin: '1%' }}>{contact_no}</Text>
                        <Text style={{ margin: '1%' }}>{address}</Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: '30%', justifyContent: 'space-between', margin: "3%" }}>
                        <Text>{issue_date}</Text>
                        <Text>{this.state.delivering_date}</Text>
                    </View>
                    <View style={{ display: this.state.btnGroupEnable, height: '20%', justifyContent: 'space-evenly', flexDirection: 'column', margin: '5%' }}>
                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', height: '50%' }}>
                            <TouchableOpacity disabled={this.state.deliveringDateBtnDisable} style={{
                                justifyContent: 'center', alignItems: 'center',
                                backgroundColor: this.state.delivering_date_color, borderRadius: 6, height: '60%', width: '40%'
                            }} onPress={() => { this.setState({ open_DT_picker: true }) }}>
                                <Text style={{ color: "white" }}>Delivering Date</Text>

                            </TouchableOpacity >
                            <TouchableOpacity disabled={this.state.rejectBtnDisable} style={{
                                justifyContent: 'center', alignItems: 'center',
                                backgroundColor: this.state.rejectColor, borderRadius: 6, height: '60%', width: '40%'
                            }} onPress={() => { this.onAllButtonTask(3) }}>
                                <Text style={{ color: "white" }}>{this.state.rejectTxt}</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', height: '50%' }}>
                            <TouchableOpacity disabled={this.state.receiveBtnDisable} style={{
                                justifyContent: 'center', alignItems: 'center',
                                backgroundColor: this.state.receiveColor, borderRadius: 6, height: '60%', width: '40%'
                            }} onPress={async () => { this.onAllButtonTask() }}>
                                <Text style={{ color: "white" }}>{this.state.receiveTxt}</Text>

                            </TouchableOpacity >
                            <TouchableOpacity disabled={this.state.deliveringBtnDisable} style={{
                                justifyContent: 'center', alignItems: 'center',
                                backgroundColor: this.state.deliverColor, height: '60%', width: '40%', borderRadius: 6
                            }} onPress={() => { this.onAllButtonTask(2) }}>
                                <Text style={{ color: "white" }}>{this.state.deliverTxt}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </NativeBaseProvider>
        );
    }
}
