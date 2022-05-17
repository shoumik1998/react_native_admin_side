import React from "react";
import { Navigation } from "react-native-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

import App from "./App";
import Login from './Pages/Login'
import Registration from "./Pages/Registration";
import HomePage from "./Pages/HomePage"
import AllProducts from "./Pages/AllProducts"
import SideMenuPage from "./Components/SideMenuPage"
import Authentication from "./Pages/Authentication"
import AccountDetails from "./Pages/AccountDetails"
import OrderedProducts from "./Pages/OrderedProducts"



Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);
Navigation.registerComponent('Login', () =>Login);
Navigation.registerComponent('Registration', () => Registration);
Navigation.registerComponent('Home',()=>HomePage)
Navigation.registerComponent('AllProducts',()=>AllProducts)
Navigation.registerComponent('SideMenuPage',()=>SideMenuPage)
Navigation.registerComponent("Authentication",()=>Authentication)
Navigation.registerComponent("AccountDetails",()=>AccountDetails)
Navigation.registerComponent("OrderedProducts",()=>OrderedProducts)


Navigation.setDefaultOptions({
  animations:{
    push:{
      content:{
        translationX:{
          from:require('react-native').Dimensions.get('window').width,
          to:0,duration:250
        }
      }
    },
    pop:{
      content:{
        translationX:{
          to : require('react-native').Dimensions.get('window').width,
          from:0,duration:250
        }
      }
    }
  }
})

Navigation.events().registerAppLaunchedListener(async() => {


  try {
    var user_name = await AsyncStorage.getItem("user_name")
    var currency = await AsyncStorage.getItem("currency")

  } catch (error) {

  }

  if (user_name !== null && currency !== null) {

    Navigation.setRoot({
      root: {
        sideMenu: {
          left: {
            component: {
              name: "SideMenuPage"
            }
          },
          center: {
            stack: {
              id:"homeStackID",
              children: [
                {
                  component: {
                    name: 'Home',
                    id:"homeScreenID",
                    options: {
                      topBar: {
                        visible: false
                      }
                    }
                  }
                }
              ]
            }
          }
        }


      }
    });
  } else {
    Navigation.setRoot({
      root: {
        stack: {
          id:'homeStackID',
          children: [
            {
              component: {
                name: 'Login',
                options:{
                  topBar:{
                    visible:false
                  }
                }
              }
            }
          ]
        }
      }
   });

  }


   
});