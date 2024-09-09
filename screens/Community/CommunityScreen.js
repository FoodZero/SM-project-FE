import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const initialData = [];

const Community = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { AccessToken } = route.params || {};
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [address, setAddress] = useState(''); // State for address
  const [lastIndex, setLastIndex] = useState(null); // Initialize lastIndex for pagination

  useEffect(() => {

    if (AccessToken) {
     
      FetchPost();
      FetchLocationHandler(); // Fetch location on component mount
    }
  }, [AccessToken, selectedCategory]); // Refetch data when AccessToken or selectedCategory changes

  const FetchPost = async () => {
    if (!AccessToken) {
      console.error('Error fetching posts: AccessToken is missing or invalid');
      return;
    }

    const headers = {
      Authorization: `Bearer ${AccessToken}`,
      Accept: 'application/json'
    };

    // Determine postType based on selectedCategory
    let postType = '';
    if (selectedCategory === '나눔') {
      postType = 'SHARE';
    } else if (selectedCategory === '레시피') {
      postType = 'RECIPE';
    }

    const params = {
      lastIndex,
      postType: postType || undefined, // Send postType only if it is set
      locationId: null // Adjust if you have a specific locationId
    };

    try {
      const response = await axios.get('http://www.sm-project-refrigerator.store/api/post/', { headers, params });
      console.log('API response:', response.data);

      const posts = response.data.result.postDTOList.map(post => ({
        id: String(post.id),
        area: post.address,
        title: post.title,
        category: selectedCategory,
        status: post.status === 'PROCEEDING' ? '진행 중' : '마감',
        time: new Date(post.createdAt).toLocaleString(), // Adjust date formatting as needed
        user: post.nickname,
        comments: post.commentCount,
        uri: post.itemImgUrlList[0]?.itemImgUrl || 'https://example.com/default.jpg' // Default image if none provided
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
    const response = await axios.get(
      'http://www.sm-project-refrigerator.store/api/post/location',
      {
        headers: {
          'Authorization': `Bearer ${AccessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('API Response:', response); // Log the entire response object

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
        Alert.alert('No Saved Locations', 'No location data found.');
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
      <Image source={{ uri: item.uri }} style={styles.image} />
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <Text style={styles.title}>{item.title}</Text>
          {item.status && <Text style={styles.status}>{item.status}</Text>}
        </View>
        <Text style={styles.details}>{item.user} • {item.area} • {item.time}</Text>
        <Text style={styles.comments}>댓글 {item.comments}</Text>
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
      uri: item.uri,
      AccessToken: AccessToken, 
      userarea: address,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("LocationScreen", { AccessToken: AccessToken })}>
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
          style={[styles.tab, selectedCategory === '전체' && styles.selectedTab]}
          onPress={() => setSelectedCategory('전체')}
        >
          <Text style={styles.tabText}>전체</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedCategory === '나눔' && styles.selectedTab]}
          onPress={() => setSelectedCategory('나눔')}
        >
          <Text style={styles.tabText}>나눔</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedCategory === '레시피' && styles.selectedTab]}
          onPress={() => setSelectedCategory('레시피')}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    fontSize: 20,
    fontWeight: 'bold',
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
    backgroundColor: '#FFFFFF',
    padding: 10,
    justifyContent: 'space-between',
  },
  tab: {
    padding: 10,
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFA500',
  },
  tabText: {
    fontSize: 16,
  },
  writeButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
  },
  writeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  itemContent: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    color: 'red',
  },
  details: {
    marginTop: 5,
    color: '#888888',
  },
  comments: {
    marginTop: 5,
    color: '#888888',
  },
});

export default Community;
