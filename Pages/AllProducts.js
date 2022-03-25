import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput,
     KeyboardAvoidingView,FlatList,
    TouchableOpacity } from 'react-native'
import { NativeBaseProvider, Toast } from "native-base"
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import APIs from '../Network/APIs';
import { Navigation } from 'react-native-navigation';
import ProductChildView from '../Components/ProductChildView';

export default class AllProducts extends Component {

    constructor(props){
        super(props)
        Navigation.events().bindComponent(this)
        this.state={
            all_data:[],
            name:null

        }
    }

    componentDidMount(){
        this.fetch_all_products()
    }

    async fetch_all_products(){
        try {
            var user_name = await AsyncStorage.getItem("user_name")  
        } catch (error) {
            
        }
        const response=await APIs.fetchAllProducts(user_name)

        this.setState({all_data:response})
        this.setState({name:response[0].name})
        console.log(this.state.name)

    }

  render() {

      return (

          <View style={this.styles.rootView}>


              <Text style={{ fontSize: 18, alignSelf: "center", color: '#4682b4', margin: '2%', flex: 1 }}>{this.state.name}</Text>




              <View style={{ flex: 19 }}>
                  <FlatList
                      keyExtractor={(item, index) => index.toString()}
                      style={{ alignSelf: 'center' }}
                      numColumns={2}
                      data={this.state.all_data}
                      renderItem={({ item }) => (
                          <TouchableOpacity>
                      <ProductChildView data={item}/>
                      
                  </TouchableOpacity>
                  
                  
              )}
              />  
              </View>
              
         
          
      </View>
    );
  }

  styles=StyleSheet.create({
      rootView:{
          width:"100%",
          height:"100%",
          flex:20
        

      }
  })
}
