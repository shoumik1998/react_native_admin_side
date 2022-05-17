import React from "react";
import { View ,Dimensions, Text } from "react-native";


const OrderedProChild=({data})=>{
const {number_of_product,description,address,imagepath}=data
    const screenWidth=Dimensions.get('window').width
    const screenHeight=Dimensions.get('window').height
    

    return(
        <View style={{height:screenHeight/5, width:screenWidth*0.95,flexDirection:'row',backgroundColor:'#e6e6fa',margin:'1%',borderRadius:12}}>
            <View style={{flexDirection:'column',justifyContent:'center',margin:'2%'}}>
                <Text>
                    {description}
                </Text>
                <Text>
                    {number_of_product}
                </Text>
                <Text>
                    {address}
                </Text>

            </View>


        </View>
    )
}

export default OrderedProChild