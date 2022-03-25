import { Navigation } from "react-native-navigation";



const go = (componentName, componentId,props) => {

    Navigation.push(componentId, {
        
        component: {
            name: componentName,
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


const setRoot = (componentName) => {
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