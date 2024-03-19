import React from "react";
import {
    PERMISSIONS,
    RESULTS,
    request
} from "react-native-permissions";
import { Modal } from "react-native-web";

const PermissionModal = ({ isVisible, onClose})=>{
    return(
        <Modal>
            <View>
                <Text>권한 설정 안내</Text>
            </View>
        </Modal>
    );
};