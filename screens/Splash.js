import React, { useEffect, useState } from "react";
import { View, Image, SafeAreaView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkAndRetrieveData } from "../utils/database";

const Splash = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //!isLoggedIn && navigation.navigate("Onboarding");
    const checkUser = async () => {
      try {
        const item = await AsyncStorage.getItem("user_data");
        item ? checkData() : navigation.navigate("Onboarding");
        console.log("item is", item, isLoggedIn);
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    const checkData = () => {
      checkAndRetrieveData()
        .then((data) => {
          if (data) {
            // Data exists, do something with it
            console.log("data is", data, isLoggedIn);
            navigation.navigate("Home", { menu: data });
          } else {
            // Data does not exist
            console.log("No data found");
          }
        })
        .catch((error) => {
          // Error occurred while retrieving data
          console.log("Error:", error);
        });
    };
    checkUser();
    //checkData();
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Image source={require("../assets/Logo.png")} style={styles.image} />
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#EDEFEE",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    height: 90,
    width: 350,
  },
});
