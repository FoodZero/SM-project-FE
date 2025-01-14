import React, { useState,useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import CheckBox from 'expo-checkbox';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


import CheckboxOff from '../../assets/Icons/CheckboxOff.svg';
import CheckboxOn from '../../assets/Icons/CheckboxOn.svg';
import Back from '../../assets/Icons/back.svg';
import DropDown from '../../assets/Icons/drop-down.svg';
import CircleAdd from '../../assets/Icons/CircleAdd.svg';

const IngredientScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [RecipeModalVisible, setRecipeModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isSelectedAll, setisSelectedAll] = useState(true);
  const [isSelectedCold, setisSelectedCold] = useState(false);
  const [isSelectedFrozen, setisSelectedFrozen] = useState(false);
  const [isSelectedOutside, setIsSelected4] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [data, setData] = useState([
   
  ]);

  const {Id} = route.params;
  const {Name}= route.params;
  const refrigeratorId = Id;
  const refrigeratorName = Name;
  //const {params} = this.props.route;
  const filteredData = data.filter(item => item.name.includes(searchText));

  const filteredDatabytype = data.filter(item => {
    if (isSelectedAll) {
      return true;
    } else {
      return (
        (isSelectedCold && item.foodType === 'COLD') ||
        (isSelectedFrozen && item.foodType === 'FROZEN') ||
        (isSelectedOutside && item.foodType === 'OUTSIDE')
      );
    }
  }).filter(item => item.name.includes(searchText));

  let filteredDataToShow = [];
  if (isSelectedAll) {
    filteredDataToShow = filteredData;
  } else {
    filteredDataToShow = filteredDatabytype;
  }

  useEffect(() => {
    GetFoodData();
  }, []);
  
const GetFoodData = async () => {
  try {
    const AccessToken = await AsyncStorage.getItem('userAccessToken');
    console.log('AccessToken:', AccessToken);
    console.log('refrigeratorId:', refrigeratorId);
    const response = await axios.get(`http://www.sm-project-refrigerator.store/api/food/${refrigeratorId}`, {
      headers: { Authorization: `Bearer ${AccessToken}` }
    });
    console.log(response.data);
    const IngredientData = response.data.result.foodList;
    console.log(IngredientData);
     // Calculate daysLeft for each item
     const now = new Date();
     const updatedData = IngredientData.map(item => {
       const expireDate = new Date(item.expire);
       const timeDiff = expireDate - now;
       const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
       return { ...item, daysLeft };
     });

     setData(updatedData);
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 반환했으나, 2xx 범위에 있지 않은 경우
      console.log('Error response data:', error.response.data);
      console.log('Error response status:', error.response.status);
      console.log('Error response headers:', error.response.headers);
    } else if (error.request) {
      // 요청이 만들어졌으나, 응답을 받지 못한 경우
      console.log('Error request:', error.request);
    } else {
      // 요청을 설정하는 도중에 발생한 다른 에러
      console.log('Error message:', error.message);
    }
    console.log('Error config:', error.config);
  }
};

const DeleteFoodData = async (foodId) => {

  try {
    const AccessToken = await AsyncStorage.getItem('userAccessToken');
    console.log('refrigeratorId:', refrigeratorId);
    const response = await axios.delete(
      `http://www.sm-project-refrigerator.store/api/food/${foodId}/${refrigeratorId}`, 
      {
        headers: { Authorization: `Bearer ${AccessToken}` }
      });
    console.log(response.data);
    // Update data after successful deletion
    GetFoodData();
  } catch (error) {
    if (error.response) {
      console.log('Error response data:', error.response.data);
      console.log('Error response status:', error.response.status);
      console.log('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.log('Error request:', error.request);
    } else {
      console.log('Error message:', error.message);
    }
    console.log('Error config:', error.config);
  }
};



const handleItemPress = (id, name, expire, count, foodType) => {
  navigation.navigate('DetailIngredient', { 
    FoodId: id, 
    ingredient: name, 
    date: expire, 
    quantity: count, 
    foodType: foodType, 
  });
};


  const handleClose = async () => {
    try {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
        
        if (AccessToken) {
          navigation.navigate("HomeScreen");
        } else {
            console.log('fridgeId is not available');
        }
    } catch (error) {
        console.error('Error fetching fridgeId:', error);
    }
};

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleRecipeNavigation = () => {
    setRecipeModalVisible(true);
    //navigation.navigate('RecipeTab'); // Adjust this to your actual screen name
  };
  const handleMoveToRecipeConfirm = () => {
    // Extract the names of the selected items using their IDs from the selectedItems array
    const selectedFoodNames = selectedItems.map(id => {
      const selectedItem = data.find(item => item.id === id);
      return selectedItem ? selectedItem.name : null;
    }).filter(name => name !== null); // Remove null values just in case
  
    // Close the modal
    setRecipeModalVisible(false);
  
    // Navigate only if there are selected items
    if (selectedFoodNames.length > 0) {
      navigation.navigate('레시피', {
        screen: 'RecipeMain',
        params: { selectedFoodNames }
      });
  
      // Clear the selection after moving
      setSelectedItems([]);
    } else {
      // If no items are selected, alert the user
      alert("선택된 재료가 없습니다.");
    }
  };
  
  

  const toggleItemSelection = (id) => {
    setSelectedItems(prevSelectedItems =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter(item => item !== id)
        : [...prevSelectedItems, id]
    );
    
  };

  const handleDelete = () => {
    setDeleteModalVisible(true); // Show delete confirmation modal
  };

  const handleConfirmDelete = () => {
    selectedItems.forEach(itemId => {
      DeleteFoodData(itemId);
    });
    setSelectedItems([]);
    setEditMode(false);
    setDeleteModalVisible(false);
  };


  const Item = ({ id, name, expire, daysLeft, count, foodType }) => (
    <TouchableOpacity 
      style={styles.item} 
      onPress={() => handleItemPress(id, name, expire, count, foodType)} // 필요한 파라미터 전달
      disabled={editMode}
    >
      <Text style={styles.daysLeft}>D-{daysLeft}</Text>
      <View style={styles.itemText}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.expire}>유통기한: {expire}</Text>
      </View>
      {editMode && (
        <CheckBox
        value={selectedItems.includes(id)}
        onValueChange={() => toggleItemSelection(id)}
        style={{position: 'absolute', marginLeft:BasicWidth*290,marginTop:BasicHeight*10}}
      />
      )}
    </TouchableOpacity>
  );
  
  

  const handleSelect1 = () => {
    setisSelectedAll(!isSelectedAll);
    setisSelectedCold(false);
    setisSelectedFrozen(false);
    setIsSelected4(false);
    GetFoodData();
  };

  const handleSelect2 = () => {
    setisSelectedCold(!isSelectedCold);
    setisSelectedAll(false);
    setisSelectedFrozen(false);
    setIsSelected4(false);
  };

  const handleSelect3 = () => {
    setisSelectedFrozen(!isSelectedFrozen);
    setisSelectedAll(false);
    setisSelectedCold(false);
    setIsSelected4(false);
  };

  const handleSelect4 = () => {
    setIsSelected4(!isSelectedOutside);
    setisSelectedAll(false);
    setisSelectedCold(false);
    setisSelectedFrozen(false);
  };

  const handleSort = () => setModalVisible(true);

  const handleAddItem = () => {
    navigation.navigate('FoodInput', { refrigeratorId });
  };


  const sortByDaysLeftAsc = () => {
    const sortedData = [...data].sort((a, b) => a.daysLeft - b.daysLeft);
    setData(sortedData);
    setModalVisible(false);
  };

  const sortByDaysLeftDesc = () => {
    const sortedData = [...data].sort((a, b) => b.daysLeft - a.daysLeft);
    setData(sortedData);
    setModalVisible(false);
  };

  const sortByTitleAsc = () => {
    const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));
    setData(sortedData);
    setModalVisible(false);
  };

  const sortByDateAsc = () => {
    const sortedData = [...data].sort((a, b) => new Date(a.expire) - new Date(b.expire));
    setData(sortedData);
    setModalVisible(false);
  };

  const sortByDateDesc = () => {
    const sortedData = [...data].sort((a, b) => new Date(b.expire) - new Date(a.expire));
    setData(sortedData);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleClose}>
          <Back/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editModeButton} onPress={handleEdit}>
          <Text style={styles.editModeText}>{editMode ? '완료' : '편집'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.headerText}>{refrigeratorName}</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="이름으로 검색"
        value={searchText}
        onChangeText={setSearchText}
      />
     
      
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isSelectedAll ? '#3873EA' : 'white' }]}
          onPress={handleSelect1}
        >
          <Text style={[styles.buttonText, { color: isSelectedAll ? 'white' : '#3873EA' }]}>전체</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isSelectedCold ? '#3873EA' : 'white' }]}
          onPress={handleSelect2}
        >
          <Text style={[styles.buttonText, { color: isSelectedCold ? 'white' : '#3873EA' }]}>냉장</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isSelectedFrozen ? '#3873EA' : 'white' }]}
          onPress={handleSelect3}
        >
          <Text style={[styles.buttonText, { color: isSelectedFrozen ? 'white' : '#3873EA' }]}>냉동</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isSelectedOutside ? '#3873EA' : 'white' }]}
          onPress={handleSelect4}
        >
          <Text style={[styles.buttonText, { color: isSelectedOutside ? 'white' : '#3873EA' }]}>실외</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
        <Text style={styles.sortButtonText}>정렬</Text>
        <DropDown/>
      </TouchableOpacity>
      <FlatList
        style={styles.itemContainer}
        data={filteredDataToShow}
        renderItem={({ item }) => (
          <Item 
            id={item.id} 
            name={item.name} 
            expire={item.expire} 
            daysLeft={item.daysLeft} 
            count={item.count}   // 수량 데이터 추가
            foodType={item.foodType}   // foodType 데이터 추가
          />
        )}
        keyExtractor={(item) => item.id.toString()} // ID를 문자열로 변환
      />

            
           <Modal
        animationType="slide"
        transparent={true}
        visible={RecipeModalVisible}
        onRequestClose={() => {
          setRecipeModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>선택한 재료를 이동하시겠습니까?</Text>
            <View style={styles.RecipeMovemodalButtonContainer}>
              <TouchableOpacity style={[styles.RecipeMovemodalButton,{backgroundColor:'#E2E2E280', marginRight:BasicWidth*15}]} onPress={() => setRecipeModalVisible(false)}>
                <Text style={[styles.modalButtonText,{color:'#000000'}]}>아니오</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.RecipeMovemodalButton,{backgroundColor:'#3873EA'}]} onPress={handleMoveToRecipeConfirm}>
                <Text style={[styles.modalButtonText,,{color:'#FFFFFF'}]}>네</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={deleteModalVisible}
          onRequestClose={() => {
            setDeleteModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>선택한 항목을 삭제하시겠습니까?</Text>
              <View style={styles.RecipeMovemodalButtonContainer}>
                <TouchableOpacity style={[styles.RecipeMovemodalButton,{backgroundColor:'#E2E2E280', marginRight:BasicWidth*15}]} onPress={() => setDeleteModalVisible(false)}>
                  <Text style={[styles.modalButtonText,{color:'#000000'}]}>아니요</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.RecipeMovemodalButton,{backgroundColor:'#3873EA'}]} onPress={handleConfirmDelete}>
                  <Text style={[styles.modalButtonText,,{color:'#FFFFFF'}]}>네</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.filteredContainer}>
          <View style={styles.filteredmodalView}>
            <View style={{alignItems: 'center',justifyContent: 'center',height:BasicHeight*46.49,}}>
            <Text style={{color:'#838382', includeFontPadding: false, fontFamily: 'NotoSansKR-Light', fontSize:12}}>정렬 방식 선택</Text>
            </View>
            <TouchableOpacity style={styles.filteredmodalButton} onPress={sortByDaysLeftAsc}>
              <Text style={styles.filteredmodalButtonText}>유통기한 빠른 순</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filteredmodalButton} onPress={sortByDaysLeftDesc}>
              <Text style={styles.filteredmodalButtonText}>유통기한 느린 순</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filteredmodalButton} onPress={sortByTitleAsc}>
              <Text style={styles.filteredmodalButtonText}>이름 가나다 순</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filteredmodalButton} onPress={sortByDateAsc}>
              <Text style={styles.filteredmodalButtonText}>등록일 오래된 순</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filteredmodalButton, {borderWidth:0,borderBottomLeftRadius: 10, borderBottomRightRadius: 10}]} onPress={sortByDateDesc}>
              <Text style={styles.filteredmodalButtonText}>등록일 최신 순</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.filteredmodalButton2} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.filteredmodalButtonnone }>취소</Text>
            </TouchableOpacity>
        </View>
      </Modal>

      {editMode && (
      <View style={styles.ButtonArea}>

      <TouchableOpacity style={styles.Button} onPress={handleDelete}>
      <Text style={styles.ButtonText}>삭제</Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={styles.Button} onPress={handleRecipeNavigation}>
      <Text style={styles.ButtonText}>레시피로 이동</Text>
      </TouchableOpacity>
      </View>
      )}

      {!editMode && (
      <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
      <CircleAdd/>
    </TouchableOpacity>
     )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer:{
    height: BasicHeight*50,
    marginTop: BasicHeight*13,
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 30,
    fontFamily: 'NotoSansKR-Bold',
    includeFontPadding: false,
    color: '#000000',
    marginLeft: BasicWidth*30,
    marginTop: BasicHeight*24,
  },
  backButton: {
    marginLeft: BasicWidth*25,

  },
  editModeButton: {
    marginLeft: BasicWidth*287,
  },
  editModeText: {
    fontSize: 18,
    fontFamily: 'NotoSansKR-Regular',
    includeFontPadding: false,
    color: '#000000'
  },
  
  ButtonArea: {
    flexDirection: 'row',
    marginTop: BasicHeight * 21,
    marginLeft: BasicWidth * 10,
},
Button: {
    width: BasicWidth * 155,
    height: BasicHeight * 60,
    marginLeft: BasicWidth * 20,
    borderColor: '#3873EA',
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
},
ButtonText: {
    fontSize: 16,
    color: '#3873EA',
},
  
  recipeButton: {
    marginLeft: 10,
  },
  recipeButtonText: {
    fontSize: 16,
    color: '#3873EA',
  },
  deleteButton: {
    marginLeft: 10,
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#EA3838',
  },
  searchInput: {
    borderWidth: 1.5,
    borderColor: '#3873EA',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginLeft:BasicWidth*30,
    width: BasicWidth*330,
    marginTop: BasicHeight*25,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    includeFontPadding: false,
    paddingTop: BasicHeight*17,
    paddingLeft: BasicWidth*17,
  },
  sortButton: {
    marginTop: BasicHeight*18,
    marginLeft: BasicWidth*303,
    flexDirection: 'row',
  },
  sortButtonText: {
    color: '#000000',
    fontSize: 16,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
    
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: BasicHeight*20,
    marginLeft: BasicWidth*30,
    marginRight: BasicWidth*30,
  },
  button: {

    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3873EA',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'NotoSansKR-Light',
    includeFontPadding: false,
  },
  itemContainer: {
    flex: 1,
    width: BasicWidth*330,
    marginLeft: BasicWidth*30,
  },
  item: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: BasicHeight*20,
    paddingTop: BasicHeight*17,
    paddingBottom: BasicHeight*17,
  },
  daysLeft: {
    fontSize: 18,
    fontFamily: 'NotoSansKR-Bold',
    includeFontPadding: false,
    color: '#3873EA',
    marginTop: BasicHeight*11,
    marginBottom: BasicHeight*11,
    marginLeft: BasicWidth*32,
    marginRight: BasicWidth*32,
  },
  itemText: {
    position: 'absolute',
    marginLeft: BasicWidth*110,
    marginTop: BasicHeight*15,
  },
  name: {
    fontSize: 15,
    fontFamily: 'NotoSansKR-SemiBold',
    includeFontPadding: false,
    color: '#000000',
  },
  expire: {
    fontSize: 15,
    fontFamily: 'NotoSansKR-Regular',
    includeFontPadding: false,
    color: '#000000',
    marginTop: BasicHeight*10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: BasicWidth*305,
    height: BasicHeight*149,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
    marginBottom: BasicHeight*23,
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
    fontSize: 15,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
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

  RecipeMovemodalButtonContainer: {
    flexDirection: 'row',
    
  },
  RecipeMovemodalButton: {
    width:BasicWidth*120,
    height:BasicHeight*49,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,

  },
  filteredContainer:{
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  filteredmodalView: {
    height: BasicHeight*330,
    width: BasicWidth*370,
    marginTop: BasicHeight*336,
    marginLeft: BasicWidth*10,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    alignItems: 'center',
  },
  filteredmodalButton: {
    width: BasicWidth*370,
    height: BasicHeight*56.51,
    borderColor: '#B2B2B2',
    borderWidth: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
  },
  filteredmodalButtonText: {
    color: '#3873EA',
    fontSize: 20,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
  },

  filteredmodalButton2: {
    width: BasicWidth*370,
    height: BasicHeight*58,
    marginTop: BasicHeight*10,
    marginLeft: BasicWidth*10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: BasicHeight*33,
  },

  filteredmodalButtonnone: {
    color: '#3873EA',
    fontSize: 20,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
  },

});

export default IngredientScreen;