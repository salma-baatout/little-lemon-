import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import Toolbar from "./components/Toolbar";

const Profile = ({ navigation }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = React.useState(true);

  const [orderStatus, setOrderStatus] = React.useState(true);
  const [passChange, setPassChange] = React.useState(true);
  const [offers, setOffers] = React.useState(true);
  const [newsletter, setNewsletter] = React.useState(true);
  const [image, setImage] = React.useState(null);
  const defaultImage = require("../assets/Profile.png");
  const onLogOut = async () => {
    try {
      await AsyncStorage.removeItem("user_data");
      navigation.navigate("Onboarding");
    } catch (error) {}
  };

  React.useEffect(() => {
    const getDate = async () => {
      try {
        const userData = await AsyncStorage.getItem("user_data");
        console.log("userData", userData);
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          setFirstName(parsedUserData.username);
          setEmail(parsedUserData.email);
          setLastName(parsedUserData.lastName);
          setPhoneNumber(parsedUserData.phoneNumber);
          setOrderStatus(parsedUserData.checkBox[0]);
          setPassChange(parsedUserData.checkBox[1]);
          setOffers(parsedUserData.checkBox[2]);
          setNewsletter(parsedUserData.checkBox[3]);
          setImage(parsedUserData.image);
        }
      } catch (error) {
        console.log("error ", error);
      }
    };
    getDate();
  }, []);

  const validatePhoneNumber = (number) => {
    const phoneRegex =
      /^(\+?1\s?)?(\()?\d{3}(\))?[-.\s]?(\()?(\d{3})(\))?[-.\s]?(\d{4})$/;

    const isValid = phoneRegex.test(number);
    setIsValidPhoneNumber(isValid);
  };
  const saveChanges = async () => {
    validatePhoneNumber();
    if (isValidPhoneNumber) {
      Alert.alert("Error", "Please enter valid USA phone number");
    } else {
      try {
        const userData = await AsyncStorage.getItem("user_data");
        let parsedUserData = JSON.parse(userData);
        parsedUserData.lastName = lastName;
        parsedUserData.phoneNumber = phoneNumber;
        parsedUserData.checkBox = [orderStatus, passChange, offers, newsletter];
        parsedUserData.image = image;
        const updatedUserData = JSON.stringify(parsedUserData);
        await AsyncStorage.setItem("user_data", updatedUserData);
        const userDataNew = await AsyncStorage.getItem("user_data");
      } catch (error) {}
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const renderProfileImage = () => {
    if (image) {
      return <Image source={{ uri: image }} style={styles.profileImage} />;
    } else {
      let initials = "";

      if (firstName) {
        initials += firstName.charAt(0);
      }

      if (lastName) {
        initials += lastName.charAt(0);
      }
      if (initials) {
        return (
          <View style={styles.profileImage}>
            <Text style={styles.headingText}>{initials}</Text>
          </View>
        );
      } else {
        return <Image source={defaultImage} style={styles.profileImage} />;
      }
    }
  };
  const handleProfileImagePress = () => {
    navigation.navigate("Profile");
  };

  const handleOnPressBack = () => {
    navigation.pop();
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Toolbar
          onProfileImagePress={handleProfileImagePress}
          showBackIcon={true}
          onPressBack={handleOnPressBack}
        />
      </View>
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <Text style={styles.headingText}>Personal information</Text>
          <Text style={{ marginTop: 12 }}>Avatar</Text>
          <View style={styles.profileImageContainer}>
            <TouchableOpacity onPress={pickImage}>
              {renderProfileImage()}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#495E57" }]}
              onPress={() => console.log("first")}>
              <Text style={[styles.buttonText, { color: "#fff" }]}>Change</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#EDEFEE" }]}
              onPress={() => console.log("first")}>
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.textInputContainer}>
            <Text>First Name</Text>
            <TextInput
              value={firstName}
              onChangeText={(firstName) => setFirstName(firstName)}
              style={styles.textInput}></TextInput>
            <Text>Last Name</Text>
            <TextInput
              value={lastName}
              onChangeText={(lastName) => setLastName(lastName)}
              style={styles.textInput}></TextInput>
            <Text>Email</Text>
            <TextInput
              value={email}
              onChangeText={(email) => setEmail(email)}
              style={styles.textInput}></TextInput>
            <Text>Phone Number</Text>
            <TextInput
              value={phoneNumber}
              onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
              style={styles.textInput}></TextInput>
          </View>
          <View>
            <Text style={styles.headingText}>Email notification</Text>
            <View style={styles.section}>
              <Checkbox
                disabled={false}
                value={orderStatus}
                onValueChange={(orderStatus) => setOrderStatus(orderStatus)}
                color={orderStatus ? "#495E57" : undefined}
              />
              <Text style={styles.text}>Order statuses</Text>
            </View>
            <View style={styles.section}>
              <Checkbox
                disabled={false}
                value={passChange}
                onValueChange={(passChange) => setPassChange(passChange)}
                color={orderStatus ? "#495E57" : undefined}
              />
              <Text style={styles.text}>Password changes</Text>
            </View>
            <View style={styles.section}>
              <Checkbox
                disabled={false}
                value={offers}
                onValueChange={(offers) => setOffers(offers)}
                color={orderStatus ? "#495E57" : undefined}
              />
              <Text style={styles.text}>Special offers</Text>
            </View>
            <View style={styles.section}>
              <Checkbox
                disabled={false}
                value={newsletter}
                onValueChange={(newsletter) => setNewsletter(newsletter)}
                color={orderStatus ? "#495E57" : undefined}
              />
              <Text style={styles.text}>Newsletter</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#F4CE14", width: 320 },
              ]}
              onPress={() => onLogOut()}>
              <Text style={[styles.buttonText, { fontWeight: "600" }]}>
                Log out
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: "#EDEFEE", width: 130 },
                ]}
                onPress={() => console.log("first")}>
                <Text style={styles.buttonText}>Discard changes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: "#495E57", width: 130 },
                ]}
                onPress={() => saveChanges()}>
                <Text style={[styles.buttonText, { color: "#fff" }]}>
                  Save Changes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 6,
    backgroundColor: "#EDEFEE",
    borderRadius: 8,
    borderWidth: 0.1,
    padding: 24,
    paddingTop: 10,
  },
  headingText: {
    fontSize: 24,
    fontWeight: "500",
  },
  profileImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  profileImage: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    //padding: 10,
    borderRadius: 100,
    borderWidth: 1,
    marginRight: 15,
  },
  button: {
    height: 35,
    borderColor: "black",
    borderWidth: 1,
    width: 90,
    margin: 10,
    borderRadius: 10,
    //alignItems: "center",
    justifyContent: "center",
    //alignContent: "center",
  },
  textInputContainer: { marginTop: 4 },
  textInput: {
    height: 40,
    borderColor: "black",
    borderWidth: 0.5,
    width: 320,
    marginTop: 6,
    marginBottom: 8,
    borderRadius: 10,
    fontSize: 18,
    padding: 10,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
    marginLeft: 12,
    textAlign: "center",
    //alignContent: "center",
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    //alignContent: "center",
  },
});
export default Profile;
