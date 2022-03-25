import API_Client from "./API_Client";
import AsyncStorage from "@react-native-async-storage/async-storage";


const login = async (user_name, user_password) => {
    var response = null;

    try {
        await API_Client.post("/login", {
            user_name: user_name,
            user_password: user_password

        }).then((json_response) => {
            response = json_response.data

        })

    } catch (error) {

    }

    return response;

}



const fetchAllProducts = async (user_name) => {
    var response = null;

    try {
        await API_Client.post("/data_fetching", {
            user_name: user_name


        }).then((json_response) => {
            response = json_response.data



        })

    } catch (error) {
        console.log(error)
    }

    return response;

}

const fetchDetails = async (user_name, user_password) => {
    var response = null;
    try {
        await API_Client.post("/details_fetching", {
            user_name: "Mizan@1999",
            user_password: "p"
        }).then((json_response) => {
            response = json_response.data;

        })

    } catch (error) {

    }

    return response;


}

const uploadImage=async(title,price,orderableStatus,imageData,userName)=>{
    var response=null

    try {
        await API_Client.post("/upload",{
      images: imageData,
      title: title,
      price: price,
      orderable_status: orderableStatus,
      user_name: userName
        }).then((json_response)=>{
            response=json_response.data;
        })
        
    } catch (error) {
        
    }
    return response;


}

export default { fetchAllProducts, login, fetchDetails,uploadImage };