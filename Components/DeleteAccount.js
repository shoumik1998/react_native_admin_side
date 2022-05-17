import React, { useState, useEffect } from "react";
import { Center, NativeBaseProvider, Modal, Button ,Toast,_backdrop,_dark} from 'native-base'
import APIs from "../Network/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Transition from "../Transition/Transition";



const DeleteAccount =  ({visibilityStatus}) => {
    const [showModal, setShowModal] = useState(visibilityStatus)

    useEffect(() => { setShowModal(visibilityStatus) }, [visibilityStatus])




    return (
        <NativeBaseProvider>
            <Center>
                <Modal back isOpen={showModal > 0} onClose={() => setShowModal(0)} _backdrop={{
                    _dark: {
                        bg: "coolGray.800"
                    },
                    bg: "warmGray.50"
                }}>
                    <Modal.Content maxWidth="350" maxH="212">
                        <Modal.CloseButton />
                        <Modal.Header>Delete Account Forever</Modal.Header>
                        <Modal.Body>
                            Do you really delete your account ? All the information and data will be deleted 
                            if you do that.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button variant="ghost" colorScheme="blueGray" onPress={async() => {
                                    var user_name = await AsyncStorage.getItem("user_name")
                                    var deleteresponse = await APIs.deleteAccountForever(user_name)
                                    if (deleteresponse.response==="deleted") {
                                        Toast.show({title:"Deleted"})
                                        Transition.setRoot("Login")

                                    }
                                    setShowModal(false);
                                }}>
                                    Cancel
                                </Button>
                                <Button onPress={() => {
                                    setShowModal(false);
                                }}>
                                    DELETE
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Center>
        </NativeBaseProvider>
    )
}

export default DeleteAccount;