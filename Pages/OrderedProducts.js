import React, { Component } from 'react';
import { FlatList, Text ,TouchableOpacity,View ,Alert } from 'react-native';
import { NativeBaseProvider ,Toast } from 'native-base';
import { Navigation } from 'react-native-navigation';
import OrderdProChild from '../Components/OrderdProChild';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIs from '../Network/APIs';
import Transition from '../Transition/Transition';
import {
    Pusher,
    PusherMember,
    PusherChannel,
    PusherEvent,
  } from '@pusher/pusher-websocket-react-native';

  
 


export default class OrderedProducts extends Component {

     


    constructor(props){
        super(props)
        Navigation.events().bindComponent(this)
        this.state={
            all_data:[],
        }
    }

    

    async componentDidMount(){
        
        try {
            var user_name=await AsyncStorage.getItem("user_name")
        } catch (error) {
            
        }
        this.fetchOrderedProducts()
        const pusher = Pusher.getInstance();

await pusher.init({
apiKey: "f4294e0ad72b1a26ebb2",
cluster: "ap2"
})

await pusher.connect();
await pusher.subscribe({
channelName: user_name, 
onEvent: async (event) => {
    console.log(event.data)
    this.setState({all_data:[]})
    await this.fetchOrderedProducts()
} 
});

    }

    async fetchOrderedProducts(){
        try {
            var user_name=await AsyncStorage.getItem("user_name")
            var response=await APIs.orderedProducts(user_name,this.props.selector_code)
            this.setState({all_data: response})
        } catch (error) {
            
        }
    }

    


    render() {
        var status_code= this.props.selector_code
        return (
            <NativeBaseProvider>
                <View style={{justifyContent:'center',margin:'1%',alignItems:'center'}}>
                {
                   status_code ==1 ? 
                    <Text>Your Ordered Products</Text> : 
                    <Text>History</Text>
                }
                    <FlatList
                        showsVerticalScrollIndicator={false}

                        keyExtractor={(item, index) => index.toString()}
                        style={{ alignSelf: 'center' }}
                        numColumns={1}
                        data={this.state.all_data}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={async() => { 
                                Transition.go("OrderDetails","homeScreenID",status_code,item)
                              
                            }
                                }>
                                <OrderdProChild data={item} />

                            </TouchableOpacity>
                        )}
                    />
                </View>
            </NativeBaseProvider>

        );
    }
}
