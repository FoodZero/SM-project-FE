import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert, Image, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';

const DetailCommunityScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, user, category, time, title, uri, status, userarea, AccessToken } = route.params;

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
    
    fetchPostDetails();
    fetchPostComments();
  }, [id]);

  const fetchPostComments = async (page = 0) => {
    const headers = {
      Authorization: `Bearer ${AccessToken}`,
      Accept: 'application/json',
    };

    try {
      const url = `http://www.sm-project-refrigerator.store/api/comment/${id}?page=${page}`;
      const response = await axios.get(url, { headers });
      
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

  const PostComment = async (comment) => {
    const headers = {
      Authorization: `Bearer ${AccessToken}`,
      'Content-Type': 'application/json'
    };
    const data = { content: comment };

    try {
      await axios.post(`http://www.sm-project-refrigerator.store/api/comment/${id}`, data, { headers });
      fetchPostComments(); // Refresh comments after posting
    } catch (error) {
      console.error('Error posting comment:', error.response ? error.response.data : error.message);
    }
  };

  const PostCommentChild = async (comment,id) => {
    const headers = {
      Authorization: `Bearer ${AccessToken}`,
      'Content-Type': 'application/json'
    };
    const data = { content: comment };

    try {
      await axios.post(`http://www.sm-project-refrigerator.store/api/comment/${id}/child`, data, { headers });
      fetchPostComments(); // Refresh comments after posting
    } catch (error) {
      console.error('Error posting child comment:', error.response ? error.response.data : error.message);
    }
  };

  const handleDeletePost = async (id) => {
    const headers = {
      Authorization: `Bearer ${AccessToken}`,
      Accept: 'application/json',
    };

    try {
      await axios.delete(`http://www.sm-project-refrigerator.store/api/post/delete/${id}`, { headers });
      Alert.alert('게시글 삭제', '게시글이 삭제되었습니다.', [{ text: '확인', onPress: () => navigation.navigate("CommunityScreen", { AccessToken }) }]);
    } catch (error) {
      console.error('Error deleting post:', error.response ? error.response.data : error.message);
      Alert.alert('삭제 오류', '게시글을 삭제하는 중 오류가 발생했습니다.');
    }
  };

  const updatePost = async (id, content, status) => {
    const headers = {
      Authorization: `Bearer ${AccessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const data = { content, status };

    try {
      await axios.patch(`http://www.sm-project-refrigerator.store/api/post/update/${id}`, data, { headers });
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
      await axios.patch(`http://www.sm-project-refrigerator.store/api/comment/${id}`, data, { headers });
      
    } catch (error) {
      console.error('Error updating post:', error.response ? error.response.data : error.message);
    }
  };  


  const fetchPostDetails = async () => {
    const headers = {
      Authorization: `Bearer ${AccessToken}`,
      Accept: 'application/json',
    };

    try {
      
      const response = await axios.get(`http://www.sm-project-refrigerator.store/api/post/${id}`, { headers });
      const postData = response.data.result;
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


  const handleCommentOptionSelect = (option, commentId, inputContent) => {
    console.log("Option selected:", option);
    console.log("Comment ID:", commentId);    
    switch (option) {
      
      case 'edit':
        handleOpenCommentEditModal(selectedCommentId, inputContent);
        break;
      case 'alarm':
        Alert.alert('알림켜기', '대댓글 알림이 켜졌습니다');
        break;
      case 'delete':
        handleDeleteComment(id);
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

  const close = () => navigation.navigate("CommunityScreen", { AccessToken: AccessToken });

  const renderComment = (comment) => (
    <View key={comment.commentId} style={styles.comment}>
      <View style={styles.commentHeader}>
        <Text style={styles.user}>
          {comment.writerName} <Text style={styles.area}>{comment.address || userarea}</Text>
        </Text>
        <Text style={styles.time}>{comment.createdAt}</Text>
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
    <View style={styles.container}>
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
        <View style={styles.postHeader}>
          <Text style={styles.user}>
            {user} <Text style={styles.area}>{post?.address}</Text>
          </Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={styles.postTitle}>{title}</Text>
        <Text style={styles.postContent}>{post?.content}</Text>
        {uri && <Image source={{ uri }} style={styles.image} />}
      </View>
      <FlatList
        data={comments}
        renderItem={({ item }) => renderComment(item)}
        keyExtractor={item => item.commentId}
      />
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.input}
          value={newComment}
          onChangeText={setNewComment}
          placeholder="댓글을 입력하세요."
        />
        <TouchableOpacity onPress={handlePostComment} style={styles.sendButton}>
        <Text style={styles.buttonText}>등록</Text>
        </TouchableOpacity>
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





    </View>
  );
};

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
    fontSize: 20,
    fontWeight: 'bold',
  },
  post: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  user: {
    fontWeight: 'bold',
  },
  area: {
    fontWeight: 'normal',
    color: '#888',
  },
  time: {
    color: '#888',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 0,
  },
  commentInputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    height:40,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  comment: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default DetailCommunityScreen;
