import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialData = [];

const CommunityScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { AccessToken } = route.params || {};
  const [selectedCategory, setSelectedCategory] = useState('');
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [address, setAddress] = useState(''); // State for address
  const [lastIndex, setLastIndex] = useState(null); // Initialize lastIndex for pagination

  useEffect(() => {
      FetchPost();
      FetchLocationHandler(); // Fetch location on component mount

  }, [selectedCategory]); // Refetch data when AccessToken or selectedCategory changes


  const FetchPost = async () => {

    try {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      const response = await axios.get('http://www.sm-project-refrigerator.store/api/post/', {
        headers: {
          'Authorization': `Bearer ${AccessToken}`,
          'Content-Type': 'application/json',
        },
        params:{
          lastIndex,
          postType: selectedCategory || undefined,
          locationId: null,
        }
      });
      console.log('API response:', response.data.result);

      const posts = response.data.result.postDTOList.map(post => ({
        id: String(post.id),
        area: post.address,
        title: post.title,
        category: selectedCategory,
        status: post.status === 'PROCEEDING' ? '진행 중' : '마감',
        time: new Date(post.createdAt).toLocaleString(), // Adjust date formatting as needed
        user: post.nickname,
        comments: post.commentCount,
      }));

      setData(posts);
    } catch (error) {
      if (error.response) {
        console.error('Error fetching posts:', error.response.data);
      } else if (error.request) {
        console.error('Error fetching posts:', error.request);
      } else {
        console.error('Error fetching posts:', error.message);
      }
    }
  };

  async function FetchLocationHandler() {
    try {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      const response = await axios.get(
        'http://www.sm-project-refrigerator.store/api/post/location',
        {
          headers: {
            'Authorization': `Bearer ${AccessToken}`,
            'Content-Type': 'application/json',
          },
        }
      ); 

      console.log('API Response:', response.result); // Log the entire response object

      if (response.status === 200) {
        const locationList = response.data?.result?.locationList || []; // Use optional chaining and default to an empty array
        if (locationList.length > 0) {
          const savedLocation = locationList[0];
          const fetchedAddress = savedLocation.address; // Extract the address

          console.log('Saved Location:', savedLocation);
          console.log('Fetched Address:', fetchedAddress);

          // Update address state
          setAddress(fetchedAddress);
        } else {
          Alert.alert('저장된 위치가 없습니다', '위치인증을 해주세요.');
        }
      } else {
        Alert.alert('Error', 'Failed to retrieve saved location.');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'An error occurred while retrieving saved location.');
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => PostPress(item)}>
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <Text style={styles.title}>{item.title}</Text>
          {item.status && (
            <Text style={[styles.status, item.status === '진행 중' ? styles.inProgress : styles.completed]}>
              {item.status}
            </Text>
          )}
        </View>
        <Text style={styles.details}>{item.area} | {item.time}</Text>
        <Text style={styles.comments}>{item.user}</Text>
      </View>
    </TouchableOpacity>
  );
  

  const filterData = () => {
    let filteredData = data;
    if (searchQuery) {
      filteredData = filteredData.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return filteredData;
  };

  const CreatePostPress = () => {
    navigation.navigate("CreatePostScreen", { AccessToken: AccessToken, address: address });
  };

  const PostPress = (item) => {
    navigation.navigate("DetailCommunityScreen", {
      area: item.area,
      id: item.id,
      title: item.title,
      category: item.category,
      status: item.status,
      time: item.time,
      user: item.user,
      AccessToken: AccessToken, 
      userarea: address,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("GeoLocationAPI")}>
          <Text style={styles.headerTitle}>{address || '주소를 로딩 중...'}<Icon name="chevron-down" size={20} /></Text>
        </TouchableOpacity>
        <View style={styles.icons}>
          <TouchableOpacity style={styles.icon} onPress={() => setIsSearching(!isSearching)}>
            <Icon name="search-outline" size={25} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Icon name="notifications-outline" size={25} />
          </TouchableOpacity>
        </View>
      </View>
      {isSearching && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="검색"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, selectedCategory === '' && styles.selectedTab]}
          onPress={() => setSelectedCategory('')}
        >
          <Text style={styles.tabText}>전체</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedCategory === 'SHARE' && styles.selectedTab]}
          onPress={() => setSelectedCategory('SHARE')}
        >
          <Text style={styles.tabText}>나눔</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedCategory === 'RECIPE' && styles.selectedTab]}
          onPress={() => setSelectedCategory('RECIPE')}
        >
          <Text style={styles.tabText}>레시피</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.writeButton} onPress={CreatePostPress}>
          <Text style={styles.writeButtonText}>+ 글쓰기</Text>
        </TouchableOpacity>
      </View>
      <FlatList 
        data={filterData()}
        renderItem={renderItem}
        keyExtractor={item => item.id} // Ensure 'id' is unique
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const AllWidth = Dimensions.get("window").width;
const AllHeight = Dimensions.get("window").height;

const FigmaWidth = 390;
const FigmaHeight = 844;

const BasicWidth = (AllWidth / FigmaWidth).toFixed(2);
const BasicHeight = (AllHeight / FigmaHeight).toFixed(2);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  headerTitle: {
    fontSize: 19,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Bold',
    color: '#000000',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    height: 40,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  tabs: {
    flexDirection: 'row',
    marginLeft: BasicWidth*19,
    marginTop: BasicHeight*5,
  },
  tab: {
    height:BasicHeight* 40,
    width:BasicWidth*70,
    borderRadius: 10,
    backgroundColor: '#E6E6E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: BasicWidth*16,
  },
  selectedTab: {
    borderRadius: 10,
    backgroundColor: '#CAF6FF',
  },
  tabText: {
    fontSize: 14,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Light',
    color: '#000000',
  },
  writeButton: {
    height:BasicHeight* 40,
    width:BasicWidth*90,
    borderRadius: 10,
    backgroundColor: '#F26D228F',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA500',
  },
  writeButtonText: {
    fontSize: 14,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Light',
    color: '#000000',
  },
  list: {
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  itemContent: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',

  },
  title: {
    fontSize: 18,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
    color: '#000000',
  },
  status: {
    color: 'red',
    fontSize: 11,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
    color: '#FF3B30',
    marginLeft:BasicWidth*5,
  },
  details: {
    marginTop: BasicHeight*5,
    color: '#808080',
    fontSize: 13,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Light',
  },
  comments: {
    marginTop: BasicHeight*5,
    color: '#000000',
    fontSize: 13,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Light',
  },
  status: {
    fontSize: 11,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
    marginLeft: BasicWidth * 5,
  },
  inProgress: {
    color: '#FF3B30', // Red color for '진행 중'
  },
  completed: {
    color: '#3873EA', // Blue color for '마감'
  },
});

export default CommunityScreen;
