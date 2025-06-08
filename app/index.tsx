import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from "expo-checkbox";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TodoType = {
  id: number;
  title: string;
  isDone: boolean;
};

export default function Index() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [todoText, setTodoText] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [oldtodos, setOldTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await AsyncStorage.getItem("my-todo");
        if (todos !== null) {
          setTodos(JSON.parse(todos));
          setOldTodos(JSON.parse(todos));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
  }, []);

  const addTodo = async () => {
    try {
      const newTodo = {
        id: Math.random(),
        title: todoText,
        isDone: false,
      };
      todos.push(newTodo);
      setTodos(todos);
      setOldTodos(todos);
      await AsyncStorage.setItem("my-todo", JSON.stringify(todos));
      setTodoText("");
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const newTodos = todos.filter((todo) => todo.id !== id);
      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
      setTodos(newTodos);
      setOldTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDone = async (id: number) => {
    try {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      });
      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
      setTodos(newTodos);
      setOldTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = (query: string) => {
    if (query == "") {
      setTodos(oldtodos);
    } else {
      const filteredTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(query.toLowerCase())
      );
      setTodos(filteredTodos);
    }
  };

  useEffect(() => {
    onSearch(searchQuery);
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="menu" size={24} color={"#333"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={require("../assets/images/LogoHome.jpg")}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color={"#333"} />
        <TextInput
          placeholder="Search.."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          style={styles.searchInput}
          clearButtonMode="always"
        />
      </View>

      <FlatList
        data={[...todos].reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            deleteTodo={deleteTodo}
            handleTodo={handleDone}
          />
        )}
      />
      <KeyboardAvoidingView
        style={styles.footer}
        behavior="padding"
        keyboardVerticalOffset={10}>
        <TextInput
          placeholder="Add new ToDO"
          value={todoText}
          onChangeText={(text) => setTodoText(text)}
          style={styles.newTodoInput}
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => addTodo()}>
          <Ionicons name="add" size={34} color={"#fff"} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const TodoItem = ({
  todo,
  deleteTodo,
  handleTodo,
}: {
  todo: TodoType;
  deleteTodo: (id: number) => void;
  handleTodo: (id: number) => void;
}) => {
  return (
    <View style={styles.todoContainer}>
      <View style={styles.todoInfoContainer}>
        <Checkbox
          value={todo.isDone}
          onValueChange={() => handleTodo(todo.id)}
          color={todo.isDone ? "#4630EB" : undefined}
        />
        <Text
          style={[
            styles.todoText,
            todo.isDone && { textDecorationLine: "line-through" },
          ]}>
          {todo.title}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          alert("Deleted " + todo.id);
          deleteTodo(todo.id);
        }}>
        <Ionicons name="trash" size={24} color={"red"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBar: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: 'center',
    paddingVertical:Platform.OS ==='ios'?16 :8,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginBottom: 10,
  },
  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 22,
    borderRadius: 12,
    marginBottom: 20,
  },
  todoInfoContainer: {
    flexDirection: "row",
    gap: 12,
  },
  todoText: {
    fontSize: 16,
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  newTodoInput: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#4630EB",
    padding: 8,
    borderRadius: 10,
    marginLeft: 20,
  },
});
