import React, { useState } from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

const OnBoarding = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const onChangeFirstName = (name) => {
    if (/^[a-zA-Z]+$/.test(name)) {
      setFirstName(name);
    }
  };
  const onChangeEmail = (email) => {
    setEmail(email);
  };
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleNextPress = () => {
    if (firstName.length === 0) {
      Alert.alert("Error", "Please enter your first name.");
    } else if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
    } else {
      // Proceed to the next step
      Alert.alert("Success", "Next step...");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Image
              source={require("../assets/Logo.png")}
              style={styles.image}
            />
          </View>
          <KeyboardAvoidingView
            style={styles.formContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Text style={[styles.text, { marginTop: 60, marginBottom: 170 }]}>
              Let us get to know you
            </Text>
            <Text style={styles.text}>First Name</Text>
            <TextInput
              style={styles.textInput}
              value={firstName}
              onChangeText={onChangeFirstName}
            />
            <Text style={styles.text}>Email Name</Text>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={onChangeEmail}
            />
          </KeyboardAvoidingView>

          <View
            style={[
              styles.headerContainer,
              { alignItems: "flex-end", paddingRight: 20 },
            ]}>
            <TouchableOpacity style={styles.button} onPress={handleNextPress}>
              <Text style={styles.text}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#b8b8b8",
  },
  headerContainer: {
    backgroundColor: "#EDEFEE",
    justifyContent: "center",
    height: "18%",
    alignItems: "center",
  },
  image: {
    height: 70,
    width: 300,
    marginTop: 45,
  },
  text: {
    fontSize: 25,
    fontWeight: "400",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 16,
  },
  textInput: {
    height: 50,
    borderColor: "black",
    borderWidth: 1.5,
    width: 280,
    margin: 15,
    borderRadius: 10,
    fontSize: 18,
    padding: 10,
  },
  button: {
    backgroundColor: "#b8b8b8",
    height: 40,
    borderColor: "black",
    width: 120,
    margin: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OnBoarding;
