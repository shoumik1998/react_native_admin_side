import React from "react";
import {View} from 'react-native'

const Circle=({additionalStyle})=>{ // This is a tiny green circle mentions the product is orderable.
    return(
        <View style={[{borderColor:'green',
        margin:2,
        alignSelf:'flex-start',
        borderWidth:2,backgroundColor:'green'},additionalStyle]}>

        </View>
    )
}


export default Circle;
