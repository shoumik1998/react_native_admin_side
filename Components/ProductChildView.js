import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import Circle from './Circle';

const ProductChildView = ({ data, selectedId }) => { // Child View of Product in HomePage
  const { imagepath, price, description, currency } = data

  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height


  return (
    <View style={{
      shadowRadius: 10,
      elevation: 5,
      margin: 5,
      borderRadius: 5,
      backgroundColor: selectedId ? "gray" : "white",
      shadowOpacity: 2,
      width: screenWidth / 2.2,
      height: screenHeight / 3.5,
    }}>
      <View style={{ margin: 10, alignSelf: "flex-start" }}>
        <Circle style_add={{ width: 5, height: 5, borderRadius: 2 }} />

      </View>

      <View style={{ alignSelf: "center" }}>
        <Image style={{ width: 100, height: 100 }} resizeMode={'contain'} source={{ uri: imagepath }} />
      </View>

      <View style={{ marginTop: "auto", padding: "5%", alignItems: "center" }}>
        <Text style={{ color: "blue", fontSize: 12 }}>{description}</Text>
      </View>

      <View style={{ marginTop: "auto", padding: "5%", alignItems: "center" }}>
        <Text>{price + " " + currency}</Text>
      </View>



    </View>
  );

}



export default ProductChildView;