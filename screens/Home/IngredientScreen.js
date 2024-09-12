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
import CheckBox from "expo-checkbox";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Back from '../../assets/Icons/back.svg';

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
  const refrigeratorId = Id;
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

const AddFoodData = async (name, expire, foodType) => {
  const data = {
    name: name,
    expire: expire,
    count: 1,
    foodType: foodType,
  };

  try {
    const AccessToken = await AsyncStorage.getItem('userAccessToken');
    const response = await axios.post(`http://www.sm-project-refrigerator.store/api/food/${refrigeratorId}`, data, {
      headers: { 
        Authorization: `Bearer ${AccessToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);
    GetFoodData(); // Refresh data after adding new food item
  } catch (error) {
    handleError(error);
  }
};


  const handleItemPress = (id ,name, expire) => {
    navigation.navigate('DetailIngredient', { FoodId:id, ingredient: name, date: expire ,refrigeratorId: refrigeratorId});
  };

  const handleClose = async () => {
    try {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
        
        if (AccessToken) {
          navigation.navigate("HomeMain", { AccessToken: AccessToken });
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
    // 선택된 항목들의 이름을 추출
    const selectedFoodNames = selectedItems.map(id => {
      const selectedItem = data.find(item => item.id === id);
      return selectedItem ? selectedItem.name : null;
    }).filter(name => name !== null); // null 값은 제거
  
    setRecipeModalVisible(false);
  
    // 선택된 항목의 이름 배열을 RecipeMain으로 
    navigation.navigate('레시피', {screen: 'RecipeMain', params: { selectedFoodNames }});
    
    setSelectedItems([]); // 선택 항목 초기화
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


  const Item = ({ id, name, expire, daysLeft }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleItemPress(id,name, expire)} disabled={editMode}>
      {editMode && (
        <CheckBox
          value={selectedItems.includes(id)}
          onValueChange={() => toggleItemSelection(id)}
        />
      )}
      <Text style={styles.daysLeft}>D-{daysLeft}</Text>
      <View style={styles.itemText}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.expire}>유통기한: {expire}</Text>
      </View>
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
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const name = `새 항목 ${data.length + 1}`;
    const expire = `${year}-${month}-${day}`;
    const foodType = "COLD";

    // Adding arbitrary data
    AddFoodData(name, expire, foodType);
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
          <Text >{editMode ? '완료' : '편집'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.headerText}>냉장고 {refrigeratorId}</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="이름으로 검색"
        value={searchText}
        onChangeText={setSearchText}
      />
       <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
        <Text style={styles.sortButtonText}>정렬</Text>
      </TouchableOpacity>
      <View style={styles.EditButtonContainer}>
         {editMode && (
      <TouchableOpacity style={styles.EditButton} onPress={handleDelete}>
      <Text style={styles.EditButtonText}>삭제</Text>
      </TouchableOpacity>
            )}
       {editMode && (
      <TouchableOpacity style={styles.EditButton} onPress={handleRecipeNavigation}>
      <Text style={styles.EditButtonText}>레시피로 이동</Text>
      </TouchableOpacity>
     )}
     
      </View>
     
      
      
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
      <FlatList
        style={styles.itemContainer}
        data={filteredDataToShow}
        renderItem={({ item }) => <Item id={item.id} name={item.name} expire={item.expire} daysLeft={item.daysLeft} />}
        keyExtractor={(item) => item.id}
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
            <Text style={styles.modalText}>선택한 항목을 레시피 탭으로 이동하시겠습니까?</Text>
            <View style={styles.RecipeMovemodalButtonContainer}>
              <TouchableOpacity style={styles.RecipeMovemodalButton} onPress={handleMoveToRecipeConfirm}>
                <Text style={styles.modalButtonText}>네</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.RecipeMovemodalButton} onPress={() => setRecipeModalVisible(false)}>
                <Text style={styles.modalButtonText}>아니오</Text>
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
              <View style={styles.DeletemodalButtonContainer}>
                <TouchableOpacity style={styles.DeletemodalButton} onPress={handleConfirmDelete}>
                  <Text style={styles.modalButtonText}>네</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.DeletemodalButton} onPress={() => setDeleteModalVisible(false)}>
                  <Text style={styles.modalButtonText}>아니요</Text>
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>정렬 방식 선택</Text>
            <TouchableOpacity style={styles.modalButton} onPress={sortByDaysLeftAsc}>
              <Text style={styles.modalButtonText}>유통기한 빠른 순</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={sortByDaysLeftDesc}>
              <Text style={styles.modalButtonText}>유통기한 느린 순</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={sortByTitleAsc}>
              <Text style={styles.modalButtonText}>이름 가나다 순</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={sortByDateAsc}>
              <Text style={styles.modalButtonText}>등록일 오래된 순</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={sortByDateDesc}>
              <Text style={styles.modalButtonText}>등록일 최신 순</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.modalButtonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerContainer:{
    height: BasicHeight*50,
    width: AllWidth,
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  backButton: {
    position: 'absolute',
    marginLeft: BasicWidth*25,
    marginTop: BasicHeight*13,
  },
  editModeButton: {
    marginLeft: BasicWidth*287,
    marginTop: BasicHeight*13,
    fontSize: 16,
  },
  /*
  EditButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  EditButton: {
    flex: 1,
    backgroundColor: '#3873EA',
    paddingVertical:10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 2,
    
  },
  EditButtonText: {
    color: 'white',
    fontSize: 16,
  },
  */
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
    borderWidth: 1,
    borderColor: '#3873EA',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  sortButton: {
    backgroundColor: '#3873EA',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  sortButtonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  button: {
    padding: 10,
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
    fontSize: 14,
  },
  itemContainer: {
    flex: 1,
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginVertical: 5,
  },
  daysLeft: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3873EA',
    marginRight: 16,
  },
  itemText: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expire: {
    fontSize: 14,
    color: '#555',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3873EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 30,
    color: 'white',
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

  RecipeMovemodalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    
  },
  RecipeMovemodalButton: {
    width: '40%',
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#3873EA',
  },

});

export default IngredientScreen;