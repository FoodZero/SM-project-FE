import React, { useState, useEffect, useLayoutEffect,useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  Pressable
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmailModal from './Emailmodal'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Add from '../../assets/Icons/Add.svg';
import Bell from '../../assets/Icons/Bell.svg';
import People from '../../assets/Icons/people.svg';
import Trash from '../../assets/Icons/Trash.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeleteModal from '../Home/DeleteModal';
import { TextInput } from 'react-native-gesture-handler';
import Dropdownmodal from '../Dropdownmodal';

const HomeScreen = ({ route, navigation }) => {
  // Local state for refrigerators and active index
  const [refrigerators, setRefrigerators] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0); // 현재 슬라이드 인덱스 상태
  const [editOn, setEditOn] = useState(false);
  const [isVisible, setModalVisible] = useState(false);
  const [isDropVisible, setDropModalVisible]= useState(false);
  const [ItemNow, setItemNow] = useState('');
  const [Email, setEmail] = useState('');



  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold:50,
    
  });
  
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    // viewableItems 배열에서 key 값만 추출
    const keys = viewableItems.map(item => item.key);
  
    // 추출한 key 값을 문자열로 변환 (배열의 [ ] 제거)
    const keysString = keys.join(''); 
    
    // 변환한 문자열을 AsyncStorage에 저장
    AsyncStorage.setItem('userRefId', keysString);
  
    // 로그로 key 값 확인
    console.log('Keys:', keysString);
  });
  

  // Fetch refrigerators data on component mount
  useEffect(() => {
    fetchRefrigerators();
  }, []);

  // Function to fetch refrigerators data
  const fetchRefrigerators = async () => {
    try {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      const response = await axios.get('http://www.sm-project-refrigerator.store/api/refrigerator', {
        headers: { Authorization: `Bearer ${AccessToken}` }
      });
      const refrigeratorsData = response.data.result.refrigeratorList;
      setRefrigerators(refrigeratorsData);
      console.log('냉장고 목록:', refrigerators);
    } catch (error) {
      console.error('Error fetching refrigerators:', error);
    }
  };

  // Function to add a refrigerator
  const addRefrigerator = async () => {
    try {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      const newId = refrigerators.length ? refrigerators[refrigerators.length - 1].id + 1 : 1;
      const data = {
        name: `냉장고 ${newId}`
      };
      const response = await axios.post('http://www.sm-project-refrigerator.store/api/refrigerator', data, {
        headers: { Authorization: `Bearer ${AccessToken}` }
      });
      if (response.status === 200) {
        console.log('냉장고 추가 성공:', response.data);
        setRefrigerators([...refrigerators, { id: newId, name: data.name }]);
      }
    } catch (error) {
      console.error('Error adding refrigerator:', error);
    }
  };

  // Function to delete a refrigerator
  const deleteRefrigerator = async (id) => {
    setRefrigerators(refrigerators.filter(fridge => fridge.id !== id));
    try {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      const result = await axios.delete(`http://www.sm-project-refrigerator.store/api/refrigerator/${id}`, {
        headers: { Authorization: `Bearer ${AccessToken}` }
      });
      if(result.status === 200) {
        console.log('냉장고 삭제 성공:', result.data);
      }
    } catch (error) {
      console.error('Error deleting refrigerator:', error);
    }
  };

  const handleIngredientNameChange = (index, value) => {
    const updatedRefrigerators = [...refrigerators];
    updatedRefrigerators[index].name = value;
    setRefrigerators(updatedRefrigerators);
  };
  
  const editRefrigerator = async (id, newName) => {
    try {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      data = {
        name: newName
      };
      const response = await axios.put(`http://www.sm-project-refrigerator.store/api/refrigerator/${id}`, data,{
        headers: { Authorization: `Bearer ${AccessToken}` }
      });
      
      if (response.status === 200) {
        console.log('냉장고 이름 변경 성공:', response.data);
      }
    } catch (error) {
      console.error('Error updating refrigerator name:', error);
    }
  };
  
  

  // Function to handle deletion confirmation
  const handleDelete = (id) => {
    setModalVisible(true);
    return(
      <DeleteModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />
    );
  };

  // Function to handle image press navigation
  const handleImagePress = (id) => {
    AsyncStorage.setItem('userRefId', id.toString());
    AsyncStorage.setItem('userRefName', refrigerators.find(ref => ref.id === id).name);
    //navigation.navigate('Food',{screen: 'Ingredient', params: { Id: id , Name: refrigerators.find(ref => ref.id === id).name}});
    navigation.navigate("Ingredient", { Id: id , Name: refrigerators.find(ref => ref.id === id).name});
  };

  // FlatList에서 스크롤할 때 호출되는 함수
  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / AllWidth);
    setActiveIndex(slideIndex); // 현재 슬라이드 인덱스 업데이트
  };


  // Function to handle sharing alert
  const showSharingAlert = () => {
    setDropModalVisible(true);
  };

  // Function to handle showing sharing screen
  const handleShowSharing = () => {
    setDropModalVisible(false);
    navigation.navigate('SharingPeople', { screen: 'SharingPeople' });
  };

  // Function to handle inviting by email
  const handleInviteByEmail = () => {
    setDropModalVisible(false);
    setModalVisible(true);
  };


  const handleEdit = () => {
    setEditOn(!editOn);
  };

  return (
    <SafeAreaView style={styles.container}>
      {editOn? (
        <>
        <View style={styles.editHeader}>
        <TouchableOpacity
          style={{marginLeft:BasicWidth*287}}
          onPress={showSharingAlert}
        >
          <People />
        </TouchableOpacity>
        <TouchableOpacity 
          style={{marginLeft:BasicWidth*10}}
          onPress={handleEdit}
        >
          <Text style={styles.headerText}>완료</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.refTop}>
      <FlatList
        data={refrigerators}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled // 슬라이드를 한 페이지씩 넘기게 설정
        showsHorizontalScrollIndicator={false} // 기본 가로 스크롤 인디케이터 제거
        onScroll={handleScroll} // 스크롤할 때 호출되는 함수
        renderItem={({ item }) => (
          <View style={styles.smallrefrigerator}>
            <TextInput
                style={styles.refrigeratorName}
                placeholder=" "
                value={item.name}
                onChangeText={(text) => handleIngredientNameChange(index, text)}
              />
            <TouchableOpacity
              onPress={() => deleteRefrigerator(item.id)}>
              <Image
                source={require('../../assets/SmallRefrigerator.png')} // 이미지 경로 확인 필요
                blurRadius={1}
              />
              <Trash style={{position: 'absolute', marginTop: BasicHeight*128, marginLeft:BasicWidth*68}}/>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.smallfooterrefrigerator}>
            <Text style={styles.refrigeratorName2}>새 냉장고 추가</Text>
            <TouchableOpacity onPress={addRefrigerator}>
              <Image source={require('../../assets/SmallRefrigerator.png')} blurRadius={2} />
              <Add style={{position: 'absolute', marginTop: BasicHeight*128, marginLeft: BasicWidth*68}}/>
            </TouchableOpacity>
          </View>
        }
      />
      </View>

      {/* Dot Indicator */}
      <View style={styles.pagination}>
        {refrigerators.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: activeIndex === index ? '#000000' : '#FFFFFF' } // 현재 슬라이드에 맞는 dot만 활성화
            ]}
          />
        ))}
        {/* + 버튼과 동일한 스타일로 렌더링 */}
        <Text style={styles.addDot}>+</Text>
      </View>
        </>
      ):(
        <>
        <View style={styles.Header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AlertPage')}
        >
          <Bell />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginLeft:BasicWidth*231}}
          onPress={showSharingAlert}
        >
          <People />
        </TouchableOpacity>

        <Modal
        visible={isDropVisible}
        transparent={true}
        animationType="none"
        onRequestClose={()=>setDropModalVisible(false)} // Android back button을 눌렀을 때 모달 닫기
        onPress={()=>setDropModalVisible(false)}
      >
        <Pressable style ={{flex:1, backgroundColor:'transparent'}}onPress={() => setDropModalVisible(false)}>
            <View  style={styles.Dropcontainer}>
                <TouchableOpacity style={{marginLeft: BasicWidth*18, marginTop:BasicHeight*10}}
                onPress={() => handleShowSharing()}>
                    <Text style={styles.DropmodalText}>공유인원 보기</Text>
                </TouchableOpacity>
                <View style={styles.Line}/>
                <TouchableOpacity style={{marginLeft: BasicWidth*18, marginTop:BasicHeight*10}}
                onPress={()=> handleInviteByEmail()}>
                    <Text style={styles.DropmodalText}>이메일로 친구초대</Text>
                </TouchableOpacity>
            </View>
            </Pressable>
      </Modal>
        <EmailModal isVisible={isVisible} onClose={() => setModalVisible(false)} />
        <TouchableOpacity 
          style={{marginLeft:BasicWidth*10}}
          onPress={handleEdit}
        >
          <Text style={styles.headerText}>편집</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={refrigerators}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({ item, index }) => (
          <View style={styles.refrigerator}>
            <TextInput
              style={styles.refrigeratorName}
              placeholder=" "
              value={item.name}
              onChangeText={(text) => handleIngredientNameChange(index, text)}
              onEndEditing={() => editRefrigerator(item.id, item.name)} // Update name in the backend
            />
            <TouchableOpacity onPress={() => handleImagePress(item.id)}>
              <Image
                source={require('../../assets/BigRefrigerator.png')}
              />
            </TouchableOpacity>
          </View>
        )}
      />


      {/* Dot Indicator */}
      <View style={styles.pagination2}>
        {refrigerators.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: activeIndex === index ? '#000000' : '#FFFFFF' } // 현재 슬라이드에 맞는 dot만 활성화
            ]}
          />
        ))}
      </View>
        </>
      ) }
    </SafeAreaView>
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

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardSize:{
    width: AllWidth-194,
  },
  Header:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: BasicHeight*13,
    paddingLeft: BasicWidth*33,
  },
  editHeader:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: BasicHeight*13,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'NotoSansKR-Regular',
    includeFontPadding: false,
    color: '#000000',
  },
  refrigerator: {
    alignItems: 'center',
    marginTop:BasicHeight*50,
    marginLeft: BasicWidth*80,
    marginRight: BasicWidth*80,
    padding: 0,
  },
  refTop:{
    marginTop:BasicHeight*74,
    marginBottom:BasicHeight*80,

  },
  smallrefrigerator: {
    marginLeft: BasicWidth*107,
    marginRight: BasicWidth*96.5,
    paddingTop: 0,
    marginTop: BasicHeight*-30,
    alignContent: 'center',
    alignItems: 'center',
  },
  smallfooterrefrigerator: {
    alignItems: 'center',
    alignContent: 'center',
    marginLeft: BasicWidth*97,
    marginRight: BasicWidth*96.5,

  },
  smallrefrigeratoradd: {
    alignItems: 'center',
    marginTop:BasicHeight*74,
    padding: 0,
  },
  refrigeratorName: {
    fontSize: 30,
    fontFamily: 'NotoSansKR-Bold',
    includeFontPadding: false,
    color: '#000000',
    marginBottom: BasicHeight*40,
  },
  refrigeratorName2: {
    fontSize: 30,
    fontFamily: 'NotoSansKR-Regular',
    includeFontPadding: false,
    color: '#000000',
    padding:0,
    marginBottom: BasicHeight*76.5,
  },
  /*
  refrigeratorImage: {
  },
  deleteButton: {
    color: 'red',
    fontSize: 18,
    marginTop: 10,
  },
  */
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: BasicHeight*79,
    marginLeft: BasicWidth*133,
    backgroundColor: '#D9D9D97A',
    width: BasicWidth*124,
    height: BasicHeight*41,
    borderRadius: 20,
  },
  pagination2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: BasicHeight*79,
    //marginTop: BasicHeight*,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000000',
    marginHorizontal: 5,
    backgroundColor: '#E0E0E0',
  },
  addDot: {
    fontSize: 20,       // +의 크기를 Dot 내부에 맞게 조정
    color: '#000000',  // +의 색상
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regualr',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#3873EA',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },

  DeletemodalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    
  },
  DeletemodalButton: {
    width: '40%',
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#3873EA',
  },
  Dropcontainer:{
    width: BasicWidth*160,
    height: BasicHeight*88,
    backgroundColor: '#31313173',
    borderRadius: 10,
    marginTop: BasicHeight*41,
    marginLeft: BasicWidth*155,
},
  DropmodalText: {
    fontSize: 16,
    fontFamily: 'NotoSansKR-Regular',
    color: '#FFFFFF',
    includeFontPadding: false,

  },
  Line:{
    width:BasicWidth*160,
    height:BasicHeight*0.4,
    backgroundColor: '#FFFFFF',
    marginTop: BasicHeight*10,
  },
});

export default HomeScreen;
