import React , {useState}from "react";
import { View ,Dimensions, Text, Image } from "react-native";


const OrderedProChild=({data})=>{
    const screenWidth=Dimensions.get('window').width
    const screenHeight=Dimensions.get('window').height
const {number_of_product,description,address,imagepath,order_status}=data

    const getBackColor = () => {
        let color = "#e6e6fa";
        if (order_status === 0) {
            color = "#e6e6fa"
        } else if (order_status === 1) {
            color = "#20b2aa"
        } else if (order_status === 2) {
            color = "#66cccc"
        }
        return color;
    }

    return (
        <View style={{ height: screenHeight / 5, width: screenWidth * 0.95, flexDirection: 'row',
         backgroundColor: getBackColor(), margin: '1%', borderRadius: 12,justifyContent:'space-between'}}>

            <View style={{ flexDirection: 'column', justifyContent: 'center', margin: '2%' }}>
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
            <View style={{height:'100%',width:'40%'}}>
                <Image resizeMode="contain" style={{ height: "100%", width:"100%" }} source={{ uri: imagepath }} />
            </View>

        </View>
    )
}

export default OrderedProChild