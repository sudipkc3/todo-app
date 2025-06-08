import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from "expo-checkbox";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
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

const colors = {
  primary: "#c737ff",
  primaryDark: "#b911ff",
  primaryLight: "#f1cdff",
  background: "#fcf3ff",
  text: "#70089b",
  textLight: "#a302ed",
  border: "#e5a6ff",
  danger: "#d66eff",
};

export default function Index() {
  const router = useRouter();
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [todoText, setTodoText] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [oldtodos, setOldTodos] = useState<TodoType[]>([]);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

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
    if (!todoText.trim()) {
      alert("Please enter a task name.");
      return;
    }
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

  const onSearch = React.useCallback(
    (query: string) => {
      if (query === "") {
        setTodos(oldtodos);
      } else {
        const filteredTodos = todos.filter((todo) =>
          todo.title.toLowerCase().includes(query.toLowerCase())
        );
        setTodos(filteredTodos);
      }
    },
    [todos, oldtodos]
  );

  useEffect(() => {
    onSearch(searchQuery);
  }, [searchQuery, onSearch]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setIsMenuVisible(true)}>
          <Ionicons name="menu" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={require("../assets/images/LogoHome.jpg")}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isMenuVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {
                setIsMenuVisible(false);
                router.replace("/");
              }}
            >
              <Text style={styles.modalOption}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsMenuVisible(false);
                router.replace("/about");
              }}
            >
              <Text style={styles.modalOption}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsMenuVisible(false)}>
              <Text style={styles.modalOption}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color={colors.text} />
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
        keyboardVerticalOffset={10}
      >
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
    backgroundColor: colors.background,
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBar: {
    backgroundColor: colors.primaryLight,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Platform.OS === "ios" ? 16 : 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 10,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.primaryLight,
    padding: 22,
    borderRadius: 12,
    marginBottom: 20,
    borderColor: colors.border,
    borderWidth: 1,
  },
  todoInfoContainer: {
    flexDirection: "row",
    gap: 12,
  },
  todoText: {
    fontSize: 16,
    color: colors.text,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  newTodoInput: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    color: colors.text,
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 10,
    marginLeft: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalOption: {
    fontSize: 18,
    color: colors.text,
    marginVertical: 10,
  },
  slideBar: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 300,
    height: "100%",
    backgroundColor: colors.primaryLight,
    padding: 20,
    zIndex: 10,
  },
  aboutTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    color: colors.text,
  },
});
