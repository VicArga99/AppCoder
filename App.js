import { StyleSheet, Text, TextInput, Button, View, FlatList, Modal, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';


export default function App() {
  const [Text, setText] = useState ("");
  const[list, setList] = useState ([]);
  const[itemSelected, setItemSelected] = useState ({});
  const[modalVisible, setModalVisible] = useState (false);
  
  const handleOnChangeText = (Text) => {
setText(Text);
  };

  const addItem = () => {
    if (Text !== "") {
    setList((currentList) => 
    [...currentList,{id: Math.random(), value: Text},
    ]);
    setText("");
  }
   };

    const renderItem = ({item}) => (
      <view style={styles.containerItemList}>
  <Text style={styles.itemList}>{item.value}</Text>
  <TouchableOpacity 
  onPress= {() => onHandlerModal(item.id)} 
  style={styles.deleteButton}>
  <Text style={styles.deleteButtonText} >X</Text>
  
  </TouchableOpacity>
</view>
    );

    const keyExtractor = (item) => item.id.toString();

    const onHandlerDelete= (id) => {
    setList ((currentList) => currentList.filter ((item) => item.id !== id));
    setItemSelected({});
    setModalVisible (modalVisible);
};
    const onHandlerModal = (id) => {
      setItemSelected(list.filter(item => item.id = id )[0]);
      setModalVisible (modalVisible);
    };

  return (
    <View style={styles.container}>
      <View style={styles.content}> 
<TextInput 
placeholder='new task'
style={styles.input}
placeholderTextColor= "#9ABCA7"
value={Text}
onChangeText={(text) => handleOnChangeText (text)}
/>
<Button title='ADD' onPress = {() => addItem()} color = "#F7B2AD"  />
     </View>

<FlatList 
data={list}
renderItem={renderItem}
keyExtractor= {keyExtractor}
style={styles.containerList}
/>
<Modal
animationType='slide'
visible =  {modalVisible}
onRequestClose =  {() => null}>

<view style={styles.modalContent}>
<view style={styles.modalTitleContainer}>
  <text style={styles.modalTitle}>Delete Item </text>
  <TouchableOpacity 
  style= {styles.deleteButton} 
  onPress={() => setModalVisible(modalVisible)}>
    <Text style={styles.deleteButtonText}>x</Text>
  </TouchableOpacity>
</view>
<text style={styles.modalText}> Are you sure? </text>
<text style={styles.modalMessage}>{itemSelected.value} </text>
<button 
title='Okay' 
onPress={() => onHandlerDelete (itemSelected.id)} > </button>
</view>
</Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
content: {
flexDirection: "row",
alignItems: "center",
justifyContent: "space-between",
marginTop: 40,
marginHorizontal: 20,
  },
  input : {
    borderBottomWidth: 1,
    borderBottomColor: "#F7B2AD",
    flex: 0.85,
  },

  itemList: {
    fontSize:14,
    
  },

  containerList: {
    marginHorizontal: 20,
  },


  containerItemList: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginVertical: 10,
   marginHorizontal: 20,
  },

  deleteButton: {
    backgroundColor: "#F7B2AD" ,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },

  deleteButtonText: {
    color: "#fff" ,
    fontSize: 14,
    fontWeight: 'bold',
  },

  modalContent:{
    flex: 1,
    backgroundColor: "#fff" ,
    alignItems: 'center',

  },

  modalTitleContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  modalTitle:{
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 20,
  },

  modalText:{
    fontSize: 18,
    marginHorizontal: 20,
  },

  modalMessage:{
    fontSize: 18,
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
  },

});
