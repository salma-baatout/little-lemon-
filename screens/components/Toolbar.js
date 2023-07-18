import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Toolbar = ({ showBackIcon, onProfileImagePress, onPressBack }) => {
  const [image, setImage] = useState();
  useEffect(() => {
    const getImage = async () => {
      try {
        const userData = await AsyncStorage.getItem("user_data");
        const parsedUserData = JSON.parse(userData);
        console.log("dddddddd", parsedUserData.image);
        if (parsedUserData.image) {
          setImage(parsedUserData.image);
        } else {
          setImage(require("../../assets/Profile.png"));
        }
      } catch (error) {
        console.log("error ", error);
      }
    };
    getImage();
    console.log(image);
  }, []);

  return (
    <View style={styles.toolBarContainer}>
      {showBackIcon ? (
        <Ionicons
          name="arrow-back-circle"
          size={42}
          color="#495E57"
          onPress={onPressBack}
        />
      ) : (
        <View></View>
      )}

      <Image
        source={require("../../assets/Logo.png")}
        style={styles.logoImage}
      />
      <TouchableOpacity onPress={onProfileImagePress}>
        <Image source={image} style={styles.profileImage} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  toolBarContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 30,
    padding: 7,
    backgroundColor: "#EDEFEE",
  },
  profileImage: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 100,
    borderWidth: 10,
  },
  logoImage: {
    width: 160,
    height: 40,
  },
});
export default Toolbar;
