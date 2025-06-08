import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function About() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => router.replace("/")}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
        {/* <Text style={styles.goBackText}>Go Back</Text> */}
      </TouchableOpacity>

      <Image
        source={require("../assets/images/me.jpg")}
        style={styles.profileImage}
      />
      <Text style={styles.title}>About Me</Text>
      <Text style={styles.description}>
        Hi, I&apos;m Sudip KC, a UI/UX Designer, Frontend Developer, and aspiring
        Mobile Developer based in Nepal. I am passionate about creating
        intuitive and visually appealing user experiences.
      </Text>

      <View style={styles.contactSection}>
        <View style={styles.contactContainer}>
          <Ionicons name="mail" size={24} color={styles.icon.color} />
          <Text style={styles.contactText}>sudipkc289@gmail.com</Text>
        </View>
        <View style={styles.contactContainer}>
          <Ionicons name="call" size={24} color={styles.icon.color} />
          <Text style={styles.contactText}>9806735504</Text>
        </View>
        <View style={styles.contactContainer}>
          <Ionicons name="location" size={24} color={styles.icon.color} />
          <Text style={styles.contactText}>Nepal</Text>
        </View>
      </View>

      <Text style={styles.description}>
        I am currently free for work and open to exciting opportunities. Feel
        free to reach out!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#fcf3ff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#70089b",
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: "#70089b",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 26,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 30,
  },
  contactSection: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    color: "#70089b",
    marginLeft: 8,
  },
  icon: {
    color: "#70089b",
  },
  goBackButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#70089b",
    padding: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
//   goBackText: {
//     color: "#fff",
//     fontSize: 14,
//     marginLeft: 6,
//   },
});
