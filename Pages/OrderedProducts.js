import React, { Component } from 'react';
import { FlatList, Text ,TouchableOpacity,View ,Alert } from 'react-native';
import { NativeBaseProvider ,Toast } from 'native-base';
import { Navigation } from 'react-native-navigation';
import OrderdProChild from '../Components/OrderdProChild';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIs from '../Network/APIs';

export default class OrderedProducts extends Component {


    constructor(props){
        super(props)
        Navigation.events().bindComponent(this)
        this.state={
            all_data:[]
        }

    }

    async componentDidMount(){
        
        this.fetchOrderedProducts()

    }

    async fetchOrderedProducts(){
        try {
            var user_name=await AsyncStorage.getItem("user_name")
            var response=await APIs.orderedProducts(user_name,this.props.selector_code)
            this.setState({all_data: response})
            console.log(response)

        } catch (error) {
            
        }
    }

    


    render() {
        return (
            <NativeBaseProvider>
                <View style={{justifyContent:'center',margin:'1%',alignItems:'center'}}>
                {
                    this.props.selector_code==1 ? 
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
                            <TouchableOpacity onPress={() => { Alert.alert("details....") }}>
                                <OrderdProChild data={item} />

                            </TouchableOpacity>
                        )}
                    />
                </View>
            </NativeBaseProvider>

        );
    }
}
