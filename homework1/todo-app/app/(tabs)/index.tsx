import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

interface Todo {
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addOrEditTodo = () => {
    if (newTodo.trim()) {
      if (editingIndex !== null) {
        // Edit existing todo
        const updatedTodos = [...todos];
        updatedTodos[editingIndex] = { ...updatedTodos[editingIndex], text: newTodo };
        setTodos(updatedTodos);
        setEditingIndex(null);
      } else {
        // Add new todo
        setTodos([...todos, { text: newTodo, completed: false }]);
      }
      setNewTodo('');
    }
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setNewTodo(todos[index].text);
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleTodo = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={editingIndex !== null ? 'Edit todo' : 'Add a new todo'}
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <Button title={editingIndex !== null ? 'Save' : 'Add'} onPress={addOrEditTodo} />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => toggleTodo(index)}>
              <Text style={[styles.todoText, item.completed && styles.completedTodo]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => startEditing(index)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTodo(index)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  todoText: {
    fontSize: 18,
  },
  completedTodo: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  actions: {
    flexDirection: 'row',
  },
  editButton: {
    color: 'blue',
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
  },
});
