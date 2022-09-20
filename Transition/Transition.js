import { Navigation } from "react-native-navigation";



const go = (componentName, componentId,prop1,prop2) => { // A common function to Navigate from one to another page with some props

    Navigation.push(componentId, {
        
        component: {
            name: componentName,
            passProps:{
                selector_code:prop1,
                data:prop2
            },
            options: {
                sideMenu: {
                    left: {
                        visible: false
                    }
                },
                topBar: {
                    visible: false
                }
            }
        }
    })

}


const setRoot = (componentName) => { // Sets a Root Page after Loged In 
    Navigation.setRoot({
        root: {
            sideMenu: {
                left: {
                    component: {
                        name: "SideMenuPage"
                    }

                }, center: {
                    stack: {
                        id: "homeStackID",
                        children: [
                            {
                                component: {
                                    name: componentName,
                                    id: "homeScreenID",
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
    })

}


export default { go, setRoot }