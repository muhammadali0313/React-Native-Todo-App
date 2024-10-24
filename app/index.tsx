import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, FlatList, Modal, Alert, Pressable } from 'react-native';

const Home: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [todos, setTodos] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [updateInput, setUpdateInput] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput('');
    } else {
      Alert.alert('Please enter a valid todo');
    }
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const editTodo = () => {
    if (updateInput.trim()) {
      const updatedTodos = todos.map((item, i) => (i === currentIndex ? updateInput : item));
      setTodos(updatedTodos);
      setModalVisible(false);
      setUpdateInput('');
    } else {
      Alert.alert('Please enter a valid todo');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Todo App</Text>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder='Enter todo'
      />
      <TouchableOpacity style={styles.button} onPress={addTodo}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>

      <FlatList
        data={todos}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.ListBtn} onPress={() => deleteTodo(index)}>
                <Text>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.ListBtn}
                onPress={() => {
                  setCurrentIndex(index);
                  setUpdateInput(item);
                  setModalVisible(true);
                }}
              >
                <Text>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Update Todo</Text>
            <TextInput
              style={styles.updateInput}
              value={updateInput}
              onChangeText={setUpdateInput}
              placeholder='Update todo'
            />
            <Pressable style={styles.buttonClose} onPress={editTodo}>
              <Text style={styles.textStyle}>Update</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3, // Adding elevation for 3D effect
  },
  button: {
    backgroundColor: '#5cb85c',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    elevation: 5, // Adding elevation for 3D effect
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#007bff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3, // Adding elevation for 3D effect
  },
  title: {
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  ListBtn: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    elevation: 2, // Adding elevation for 3D effect
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5, // Adding elevation for 3D effect
  },
  buttonClose: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  updateInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 15,
    width: '80%',
    elevation: 2, // Adding elevation for 3D effect
  },
});

export default Home;
