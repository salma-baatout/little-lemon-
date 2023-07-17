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
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDatabase, insertDataAndGetResult } from "../utils/database";

const OnBoarding = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [menu, setMenu] = React.useState(null);

  React.useEffect(() => {
    createDatabase();
    const fetchData = async () => {
      try {
        const restaurantMenu = await fetch(
          "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
        )
          .then((response) => response.json())
          .then((data) => {
            // console.log("data", data);
            setMenu(data.menu);
            categoryArray = Array.from(
              new Set(data.menu.map((item) => item.category))
            );
            setCategories(categoryArray);
            console.log("category", categoryArray);
          });
      } catch (error) {}
    };
    fetchData();
  }, []);

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
      storeData();
    }
  };

  const storeData = async () => {
    try {
      storeDataSQL();
      await AsyncStorage.setItem(
        "user_data",
        JSON.stringify({
          username: firstName,
          email: email,
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  };
  const storeDataSQL = () => {
    menu.forEach((menuItem) => {
      insertDataAndGetResult(menuItem)
        .then((insertedData) => {
          console.log("Inserted data:", insertedData);
          navigation.navigate("Home", { menu: data });
        })
        .catch((error) => {
          console.log("Error:", error);
        });
      // .then((data) => {
      //   if (data) {
      //     // Data exists, do something with it
      //     isLoggedIn && navigation.navigate("Home", (menu = { data }));
      //     console.log(data);
      //   } else {
      //     // Data does not exist
      //     console.log("No data found");
      //   }
      // })
      // .catch((error) => {
      //   // Error occurred while retrieving data
      //   console.log("Error:", error);
      // });
    });
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Image source={require("../assets/Logo.png")} style={styles.image} />
        </View>
        <View style={styles.formContainer}>
          <Text style={[styles.text, { marginTop: 60, paddingBottom: 50 }]}>
            Let us get to know you
          </Text>
          <Text style={styles.text}>First Name</Text>
          <TextInput
            style={styles.textInput}
            value={firstName}
            onChangeText={onChangeFirstName}
          />
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={onChangeEmail}
          />
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.button} onPress={handleNextPress}>
            <Text style={styles.text}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  mainContainer: {
    flex: 1,
    position: "relative",
    width: "100%",
    backgroundColor: "#b8b8b8",
  },
  headerContainer: {
    position: "relative",
    backgroundColor: "#EDEFEE",
    justifyContent: "center",
    height: "18%",
    alignItems: "center",
    //flex: 1,
  },
  footerContainer: {
    position: "relative",
    backgroundColor: "#EDEFEE",
    justifyContent: "center",
    height: "18%",
    alignItems: "flex-end",
    paddingRight: 20,
    marginTop: 85,
    position: "relative",
    bottom: 1,
  },
  image: {
    height: 70,
    width: 300,
  },
  text: {
    fontSize: 25,
    fontWeight: "400",
  },
  formContainer: {
    position: "relative",
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
