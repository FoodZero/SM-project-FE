import React, {useState, useEffect} from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Alert,
} from "react-native";


const DeleteModal = ({ isVisible, onClose})=>{
    const [includeFontPadding, setIncludeFontPadding] = useState(false);
   
    return(
        <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal} // Android back button을 눌렀을 때 모달 닫기
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>정말 삭제하시겠습니까?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDelete} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>삭제</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
};


const AllWidth = Dimensions.get("window").width;
const AllHeight = Dimensions.get("window").height;

const FigmaWidth = 390;
const FigmaHeight = 844;

const BasicWidth =(
    AllWidth / FigmaWidth
).toFixed(2);

const BasicHeight =(
    AllHeight / FigmaHeight
).toFixed(2);

const styles = StyleSheet.create({
    modalcontainer:{
        width: AllWidth,
        height: AllHeight,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    container:{
        width: BasicWidth*325,
        height: BasicHeight*615,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        justifyContent: 'flex-end',
        alignSelf: 'center',
    },
    Title:{
        width: BasicWidth*150,
        height: BasicHeight*45,
        marginLeft: BasicWidth*20,
        marginTop: BasicHeight*50,
        color: '#000000',
        fontSize: 25,
        fontFamily: 'NotoSansKR-SemiBold',
        includeFontPadding: false,
    },
    Minititle: {
        width: BasicWidth*195,
        height: BasicHeight*26,
        marginLeft: BasicWidth*20,
        fontSize: 18,
        marginBottom: BasicHeight*71,
        fontFamily: 'NotoSansKR-SemiBold',
        includeFontPadding: false,
    },
    Pearea:{
        width:BasicWidth*177,
        height: BasicHeight*49,
        marginLeft: BasicWidth*21,
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: BasicHeight*25,
    },
    explarea:{
        width: BasicWidth*237,
        height: BasicHeight*49,
        marginLeft: BasicWidth*18,
    },
    exptitle:{
        width: BasicWidth*113,
        height: BasicHeight*26,
        fontSize: 18,
        color: '#000000',
        fontFamily: 'NotoSansKR-SemiBold',
        includeFontPadding: false,
    },
    expmin:{
        width: BasicWidth*191,
        height: BasicHeight*23,
        fontSize: 16,
        fontFamily: 'NotoSansKR-Regular',
        includeFontPadding: false,
    },
    ButtonArea:{
        width: BasicWidth*325,
        height: BasicHeight*65,
        marginTop: BasicHeight*64,
        backgroundColor: '#3873EA',
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: 'end',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    Pearea1:{
        width:BasicWidth*177,
        height: BasicHeight*72,
        marginLeft: BasicWidth*21,
        flexDirection: 'row',
        alignItems: "center",
    },
    explarea1:{
        width: BasicWidth*237,
        height: BasicHeight*72,
        marginLeft: BasicWidth*18,
    },
    expmin1:{
        width: BasicWidth*211,
        height: BasicHeight*46,
        fontSize: 16,
        fontFamily: 'NotoSansKR-Regular',
        includeFontPadding: false,
    },
    buttontext:{
        fontFamily: 'NotoSansKR-Bold',
        includeFontPadding: false,
        fontSize: 20,
        color: '#FFFFFF',
    }
});

export default DeleteModal;
