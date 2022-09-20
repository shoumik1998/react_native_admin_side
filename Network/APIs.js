import API_Client from "./API_Client";
import AsyncStorage from "@react-native-async-storage/async-storage";


// This file holds all the functions those communicate with REST API (Backend)


const register = async (country, district, subdistrict, region, location,
    shop_name, user_name, password, currency, cell_number, selector_code) => {

    var response = null

    try {
        await API_Client.post("/register", {
            country: country, district: district, subdistrict: subdistrict,
            region: region, location: location, shop_name: shop_name,
            user_name: user_name, password: password, currency: currency,
            cell_number: cell_number, selector_code: selector_code
        }).then((json_response) => {
            response = json_response.data
            console.log(response)
        })

    } catch (error) {

    }
    return response


}


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



const fetchAllProducts = async (user_name, deletion_status) => {
    var response = null;

    try {
        await API_Client.post("/data_fetching", {
            user_name: user_name,
            deletion_status: deletion_status


        }).then((json_response) => {
            response = json_response.data
            console.log(response)



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
            user_name: user_name,
            user_password: user_password
        }).then((json_response) => {
            response = json_response.data;

        })

    } catch (error) {

    }

    return response;
}

const stockoutProduct = async (selected_ids) => {
    var response = null;

    try {
        await API_Client.post("/markstockoutproducts", {
            ids: selected_ids
        }).then((json_response) => {
            response = json_response.data
        })

    } catch (error) {
    }
    return response;
}

const deleteProducts = async (selected_ids) => {
    var response = null;
    try {
        await API_Client.post("/delete_products", {
            ids: selected_ids
        }).then((json_response) => {
            response = json_response.data
        })
    } catch (error) {

    }

    return response;

}

const uploadImage = async (title, price, orderableStatus, imageData, userName) => {
    var response = null

    try {
        await API_Client.post("/upload", {
            images: imageData,
            title: title,
            price: price,
            orderable_status: orderableStatus,
            user_name: userName
        }).then((json_response) => {
            response = json_response.data;
        })

    } catch (error) {

    }
    return response;
}

const deleteAccountForever = async (user_name) => {
    var response = null
    try {

        await API_Client.post("/account_delete", {
            user_name: user_name
        }).then((json_response) => {
            response = json_response.data
        })

    } catch (error) {

    }
    return response

}

const orderedProducts = async (user_name, status_code) => {
    var response = null;
    try {
        await API_Client.post("/order", {
            user_name: user_name,
            status_code: status_code
        }).then((json_response) => {
            response = json_response.data
        })
    } catch (error) {

    }
    return response;
}

const orderReceive = async (product_id, status_code, delivering_date, phn_gmail, issue_date, date, user_name) => {
    var response = null;
    try {
        await API_Client.post("/order_receive", {
            product_id: product_id,
            status_code: status_code,
            delivering_date: delivering_date,
            phn_gmail: phn_gmail,
            issue_date: issue_date,
            date: date,
            user_name: user_name
        }).then((json_response) => {
            response = json_response.data
            console.log(response)
        })
    } catch (error) {

    }

    return response;
}

export default {
    fetchAllProducts, login, fetchDetails, uploadImage,
    deleteAccountForever, register, stockoutProduct, orderedProducts, orderReceive, deleteProducts
};