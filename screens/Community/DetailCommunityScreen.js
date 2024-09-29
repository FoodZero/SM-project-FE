import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert, Image, Modal,ScrollView,Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from "react-native-safe-area-context";

import Send from '../../assets/Icons/Send.svg';

const DetailCommunityScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, user, category, time, title, uri, status ,userarea, AccessToken } = route.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [updatedContent, setUpdatedContent] = useState('');
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [inputContent, setInputContent] = useState('');
  const [CommentModalVisible, setCommentModalVisible] = useState(false);
  const [CommetInputModalVisible, setCommetInputModalVisible] = useState(false);


  useEffect(() => {
    console.log(status);
    fetchPostDetails();
    fetchPostComments();
  }, [id,status]);

  const gotoCommunity = () => {
    navigation.reset({
      index: 1, // 두 번째 화면이 포커스되도록 설정
      routes: [
          { name: '커뮤니티' }, // Top2 스택을 초기화하여 '레시피'의 초기 화면으로 만듦
          { name: '커뮤니티', params: { screen: 'CommunityScreen'} }
      ],
  });
  };

  const fetchPostComments = async (page = 0) => {

    try {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      const url = `http://www.sm-project-refrigerator.store/api/comment/${id}?page=${page}`;
      const response = await axios.get(url, {
        headers: {
        Authorization: `Bearer ${AccessToken}`,
        Accept: 'application/json',
      }, });
      
      if (response.status === 200) {
        const postCommentData = response.data.result;
        console.log('postCommentData:', postCommentData);
        setComments(postCommentData.commentDTOList || []);
      } else {
        console.error(`Error: Received status code ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const PostComment = async () => {
    const data = {
      content: newComment,  // Check if 'newComment' is properly set
      isPrivate: false,  // Adjust this if needed
    };
  
    try {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      const response = await axios.post(`http://www.sm-project-refrigerator.store/api/comment/${id}`, data, {
        headers: {
          'Authorization': `Bearer ${AccessToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Post comment response:', response.data);
      fetchPostComments(); // Refresh the comments after posting
  
      // Clear input after successful post
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error.response ? error.response.data : error.message);
    }
  };

  const DeletComment = async (commentId) => {
    const headers = {
      Authorization: `Bearer ${AccessToken}`,
      'Content-Type': 'application/json'
    };

    try {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      await axios.delete(`http://www.sm-project-refrigerator.store/api/comment/${commentId}`, {
        headers: {
          'Authorization': `Bearer ${AccessToken}`,
          'Content-Type': 'application/json',
        },
      });
      fetchPostComments(); // Refresh comments after posting
    } catch (error) {
      console.error('Error posting comment:', error.response ? error.response.data : error.message);
    }
  };

  const DeletCommentChild = async (commentId) => {
    try {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      // Pass headers as a separate argument
      await axios.patch(`http://www.sm-project-refrigerator.store/api/comment/parent/${commentId}`,{
        headers: {
          'Authorization': `Bearer ${AccessToken}`,
          'Content-Type': 'application/json',
        },
      });
      fetchPostComments(); // Refresh comments after deletion
    } catch (error) {
      console.error('Error deleting comment:', error.response ? error.response.data : error.message);
    }
  };


  const PostCommentChild = async (comment, parentId) => {
    const data = {
      content: comment,
    };
  
    try {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      const response = await axios.post(`http://www.sm-project-refrigerator.store/api/comment/${parentId}/child`, data, {
        headers: {
          'Authorization': `Bearer ${AccessToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Post child comment response:', response.data);
      fetchPostComments(); // Refresh comments after posting a reply
  
      // Clear input after successful post
      setNewComment('');
      setSelectedCommentId(null);
    } catch (error) {
      console.error('Error posting child comment:', error.response ? error.response.data : error.message);
    }
  };

  const handleDeletePost = async (id) => {

    try {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      await axios.delete(`http://www.sm-project-refrigerator.store/api/post/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${AccessToken}`,
          'Content-Type': 'application/json',
        },
      });
      Alert.alert('게시글 삭제', '게시글이 삭제되었습니다.', [{ text: '확인', onPress: () => gotoCommunity() }]);
    } catch (error) {
      console.error('Error deleting post:', error.response ? error.response.data : error.message);
      Alert.alert('삭제 오류', '게시글을 삭제하는 중 오류가 발생했습니다.');
    }
  };

  const updatePost = async (id, content, status) => {
    const data = { content, status };

    try {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      await axios.patch(`http://www.sm-project-refrigerator.store/api/post/update/${id}`, data, {
        headers: {
          'Authorization': `Bearer ${AccessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      fetchPostDetails();
    } catch (error) {
      console.error('Error updating post:', error.response ? error.response.data : error.message);
    }
  };

  const EditComment = async (id, content) => {
    const headers = {
      Authorization: `Bearer ${AccessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const data = { content };

    try {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      await axios.patch(`http://www.sm-project-refrigerator.store/api/comment/${id}`, data, {
        headers: {
          'Authorization': `Bearer ${AccessToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
    } catch (error) {
      console.error('Error updating post:', error.response ? error.response.data : error.message);
    }
  };  


  const fetchPostDetails = async () => {


    try {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      const response = await axios.get(`http://www.sm-project-refrigerator.store/api/post/${id}`, {
        headers: {
          'Authorization': `Bearer ${AccessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const postData = response.data.result;
      console.log('Post details:', postData);
      setPost(postData);
      setUpdatedContent(postData.content || '');
      console.log('Post details:', response.data);
      
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${date} ${hours}:${minutes}`;
  };

  const handlePostComment = () => {
    if (newComment.trim()) {
      if (selectedCommentId) {
        const updatedComments = comments.map(comment => {
          if (comment.commentId === selectedCommentId) {
            return {
              ...comment,
              childList: [
                ...(comment.childList || []), 
                { 
                  commentId: `${comment.commentId}-${(comment.childList || []).length + 1}`, 
                  writerName: user, 
                  content: newComment, 
                  createdAt: getCurrentTime() 
                }
              ]
            };
          }
          return comment;
        });
        setComments(updatedComments);
        setSelectedCommentId(null);
        PostCommentChild(newComment,selectedCommentId);
      } else {
        setComments([
          ...comments,
          { 
            commentId: (comments.length + 1).toString(), 
            writerName: user, 
            content: newComment, 
            createdAt: getCurrentTime(), 
            childList: []
          }
        ]);
        PostComment(newComment);
      }
      setNewComment('');
    }
  };

  const handleReply = (commentId) => {
    Alert.alert(
      "답글 작성",
      "이 댓글에 답글을 작성하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        { text: "확인", onPress: () => setSelectedCommentId(commentId) }
      ]
    );
  };



  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const handleOpenEditModal = () => handleEditPostEnd();
  const handleCloseEditModal = () => setEditModalVisible(false);

  const handleOpenInputModal = () => setInputModalVisible(true);
  const handleCloseInputModal = () => setInputModalVisible(false);

  const handleOpenCommentModal = (commentId) => {setSelectedCommentId(commentId); 
    setCommentModalVisible(true);
  };
  const handleCloseCommentModal = () => setCommentModalVisible(false);

  const handleOpenCommentEditModal = (commentId, currentContent) => {
    console.log("Opening comment edit modal for commentId:", commentId);
    setSelectedCommentId(commentId); // Ensure this is being set correctly
    setInputContent(currentContent); // Ensure the current content is also set correctly
    setCommetInputModalVisible(true);
  };
  const handleCloseCommentEditModal = () => setCommetInputModalVisible(false);






  const handleOptionSelect = (option) => {
    switch (option) {
      case 'edit':
        handleOpenInputModal();
        break;
      case 'block':
        Alert.alert('차단하기', 'User will be blocked.');
        break;
      case 'end':
        handleOpenEditModal();
        break;
      case 'delete':
        handleDeletePost(id);
        break;  
      default:
        break;
    }
    handleCloseModal();
  };


  const handleCommentOptionSelect = (option) => {
    console.log("Option selected:", option);
    console.log("Comment ID:", selectedCommentId);    
  
    const comment = comments.find(c => c.commentId === selectedCommentId);
    const hasChildren = comment && comment.childList && comment.childList.length > 0;
  
    switch (option) {
      case 'edit':
        handleOpenCommentEditModal(selectedCommentId, comment.content);
        break;
      case 'alarm':
        Alert.alert('알림켜기', '대댓글 알림이 켜졌습니다');
        break;
      case 'delete':
        if (hasChildren) {
          DeletCommentChild(selectedCommentId); // Ensure this function handles the delete correctly
        } else {
          DeletComment(selectedCommentId);
        }
        break;  
      default:
        break;
    }
    handleCloseCommentModal();
  };

  const handleEditComment = async () => {
    if (inputContent.trim() && selectedCommentId) {
      try {
        console.log("Editing comment with ID:", selectedCommentId);
        await EditComment(selectedCommentId, inputContent);  // Server update
        fetchPostComments();  // Refresh comments after editing
        handleCloseCommentEditModal();  // Close modal
        setSelectedCommentId(null);  // Clear selected comment ID
      } catch (error) {
        console.error('Error editing comment:', error);
      }
    } else {
      console.log("No content to update or no comment selected.");
    }
  };



  const handleEditPostEnd = async () => {
    if (updatedContent.trim()) {
      await updatePost(id, updatedContent, false);
      handleCloseEditModal();
    }
  };

  const handleSendInputContent = async () => {
    if (inputContent.trim()) {
      await updatePost(id, inputContent, true);
    }
    handleCloseInputModal();
  };

  const close =async() => {
    navigation.reset({
      routes: [
          { name: '커뮤니티' }, // Top2 스택을 초기화하여 '레시피'의 초기 화면으로 만듦
      ],
  });
  };

  const renderComment = (comment) => (
    <View key={comment.commentId} style={styles.comment}>
      
      <View style={styles.commentHeader}>
        <Text style={styles.user}>
          {comment.writerName}
        </Text>
        <View style={styles.commentActions}>
          <TouchableOpacity onPress={() => handleReply(comment.commentId)}>
          <Icon name="chatbubble-outline" size={15} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>handleOpenCommentModal(comment.commentId)}>
          <Entypo name="dots-three-vertical" size={15} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      {comment.uri && <Image source={{ uri: comment.uri }} style={styles.image} />}
      <Text style={styles.content}>{comment.content}</Text>
      <Text style={styles.area}>
          {comment.address || userarea} | <Text style={styles.time}>{comment.createdAt}</Text>
          </Text>
      {comment.childList && comment.childList.length > 0 && (
        <FlatList
          data={comment.childList}
          renderItem={({ item }) => renderComment(item)}
          keyExtractor={item => item.commentId}
          style={styles.childComments}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={close}>
          <Icon name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{category}</Text>
        <TouchableOpacity onPress={handleOpenModal}>
          <Icon name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.post}>
      <ScrollView>
      <Text style={styles.user}>
            {user}
          </Text>
        <View style={styles.postHeader}>
          <Text style={styles.area}>
            {post?.address} | <Text style={styles.time}>{time}</Text>
            </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.postTitle}>{title}</Text>
          <Text
            style={[
              styles.status,
              { color: status === '진행 중' ? '#FF3B30' : status === '마감' ? 'blue' : 'black' }
            ]}
          >
            {status}
          </Text>
        </View>

        <Text style={styles.postContent}>{post?.content}</Text>
        </ScrollView>
      </View>
      <FlatList
        data={comments}
        renderItem={({ item }) => renderComment(item)}
        keyExtractor={item => item.commentId}
      />

      <View style={styles.commentInputContainer}>
        <View style={styles.input}>
          <TextInput
            value={newComment}
            onChangeText={setNewComment}
            placeholder="댓글을 입력하세요."
            placeholderTextColor={'#808080'}
            style={styles.newinput}
          />
          <TouchableOpacity onPress={()=>handlePostComment()} style ={styles.sendButton}>
          <Send/>
          </TouchableOpacity>

        </View>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={handleCloseModal}>
          <View style={styles.modalContainer}>
          <Text style={styles.modalText}>게시글 옵션</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleOptionSelect('edit')}>
              <Text style={styles.modalText}>게시글 수정하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleOptionSelect('block')}>
              <Text style={styles.modalText}>차단하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleOptionSelect('end')}>
              <Text style={styles.modalText}>마감하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleOptionSelect('delete')}>
              <Text style={styles.modalText}>삭제</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#ccc' }]} onPress={handleCloseModal}>
            <Text style={styles.modalButtonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseEditModal}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={handleCloseEditModal}>
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.modalInput}
              value={updatedContent}
              onChangeText={setUpdatedContent}
              placeholder="내용을 수정하세요."
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleEditPostEnd}>
              <Text style={styles.modalButtonText}>수정 완료</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      
      <Modal
        visible={inputModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseInputModal}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={handleCloseInputModal}>
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.modalInput}
              value={inputContent}
              onChangeText={setInputContent}
              placeholder="수정 내용을 입력하세요."
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleSendInputContent}>
              <Text style={styles.modalButtonText}>수정하기</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={CommentModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseCommentModal}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={handleCloseCommentModal}>
          <View style={styles.modalContainer}>
          <Text style={styles.modalText}>댓글 옵션</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleCommentOptionSelect('edit') }>
              <Text style={styles.modalText}>댓글 수정하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleCommentOptionSelect('alarm')}>
              <Text style={styles.modalText}>대댓글 알림 켜기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleCommentOptionSelect('delete')}>
              <Text style={styles.modalText}>댓글 삭제하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#ccc' }]} onPress={handleCloseCommentModal}>
            <Text style={styles.modalButtonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
       visible={CommetInputModalVisible}
       animationType="slide"
       transparent={true}
       onRequestClose={handleCloseCommentEditModal}>
        <TouchableOpacity style={styles.modalOverlay} onPress={handleCloseCommentEditModal}>
          <View style={styles.modalContainer}>
            <TextInput
            style={styles.modalInput}
            value={inputContent}
            onChangeText={setInputContent}
            placeholder="수정 내용을 입력하세요."/>
            <TouchableOpacity style={styles.modalButton} onPress={handleEditComment}>
             <Text style={styles.modalButtonText}>수정하기</Text>
             </TouchableOpacity>
          </View>
       </TouchableOpacity>
    </Modal>




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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 19,
    color: '#000000',
    fontFamily: 'NotoSansKR-Bold',
    includeFontPadding: false,
  },
  post: {
    height: BasicHeight*329,
    paddingLeft: BasicWidth*34,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  postHeader: {
    flexDirection: 'row',
    marginBottom: BasicHeight *25,
  },
  user: {
    fontSize: 14,
        color: '#000000',
        fontFamily: 'NotoSansKR-SemiBold',
        includeFontPadding: false,
  },
  area: {
    fontSize: 13,
    color: '#808080',
    fontFamily: 'NotoSansKR-Regular',
    includeFontPadding: false,
  },
  time: {
    color: '#808080',
  },
  postTitle: {
    fontSize: 20,
    color: '#000000',
    fontFamily: 'NotoSansKR-SemiBold',
    includeFontPadding: false,
    marginBottom: BasicHeight*21,
  },
  postContent: {
    fontSize: 15,
    color: '#000000',
    fontFamily: 'NotoSansKR-Regular',
    includeFontPadding: false,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 0,
  },
  commentInputContainer: {

    marginBottom: BasicHeight*29,
  },
  input: {
    height: BasicHeight*50,
    width: BasicWidth*352,
    backgroundColor: '#E2E2E2',
    borderRadius: 20,
    marginLeft: BasicWidth*19,
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  sendButton: {
    position: 'absolute',
    marginLeft: BasicWidth*315,
    //marginTop: BasicHeight*10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  newinput: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'NotoSansKR-Regular',
    includeFontPadding: false,
    width: BasicWidth*250,
  },
  comment: {
    marginLeft: BasicWidth*29,
    marginBottom: BasicHeight*13,
  },
  commentHeader: {
    marginTop: BasicHeight*13,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Line:{
    width:BasicHeight*700,
    height:BasicHeight*3,
    marginTop: BasicHeight*25,
    backgroundColor: '#E2E2E2',
    alignSelf:'center'
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: BasicWidth*27,
  },
  content: {
    marginTop: 5,
    fontSize: 16,
  },
  childComments: {
    paddingLeft: 20,
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',  
    maxHeight: '70%',  
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalOption: {
    paddingVertical: 10,
   
    borderBottomColor: '#ddd',
  },
  modalText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  modalInput: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 60,
    marginBottom: 10,
    height:70,
  },
  modalButton: {
    width: '100%',
    padding: 8,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#3873EA',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  status: {
    color: 'red',
    fontSize: 11,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
    color: '#FF3B30',
    marginLeft:BasicWidth*5,
  },
});

export default DetailCommunityScreen;