import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Toolbar from "./components/Toolbar";
import { AntDesign } from "@expo/vector-icons";
import MenuItem from "./components/MenuItem";
import CategoryItem from "./components/CategoryItem";
import { selectItemsByCategories } from "../utils/database";
import { validatePathConfig } from "@react-navigation/native";

const Home = ({ navigation, route }) => {
  const [categories, setCategories] = React.useState([]);
  const [search, setSearch] = React.useState();
  const [menu, setMenu] = React.useState(route.params.menu);
  const [filteredMenu, setFilteredMenu] = React.useState(menu);

  React.useEffect(() => {
    console.log("this is data from onBoard", route.params.menu);
    const categoryArray = Array.from(
      new Set(route.params.menu.map((item) => item.category))
    ).map((category) => ({ name: category, isSelected: false }));
    setCategories(categoryArray);
  }, [menu]);
  const handleProfileImagePress = () => {
    navigation.navigate("Profile");
  };

  const handleOnPressCate = (selectedCategory) => {
    // console.log("props", catName, categories);
    const updatedCategories = categories.map((category) => {
      if (category.name === selectedCategory.name) {
        return { ...category, selectedCategory };
      }
      return category;
    });
    //setCategories[updatedCategories];
    //setFilteredCategories;()
    fetchFilteredData();
  };

  const fetchFilteredData = () => {
    const selectedCategories = categories
      .filter((category) => category.isSelected)
      .map((category) => category.name);
    const filteredData = selectItemsByCategories(selectedCategories)
      .then((filteredData) => {
        // Handle the filtered data here
        console.log("Filtered Data:", filteredData);
        setMenu(filteredData);
        // Update your component state or perform any other actions
      })
      .catch((error) => {
        // Handle any errors that occurred during the execution of the query
        console.log("Error:", error);
        // Show an error message or perform appropriate error handling
      });
  };

  const handleSearch = (search) => {
    if (search.length > 0) {
      const filteredItems = menu.filter((item) => {
        return item.itemName.toLowerCase().includes(search.toLowerCase());
      });
      console.log("filteredItems", filteredItems);
      setFilteredMenu(filteredItems);
    } else {
      setFilteredMenu(menu);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Toolbar onProfileImagePress={handleProfileImagePress} />
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Little Lemon</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: -4,
            }}>
            <View>
              <Text style={styles.subHeadingTitle}>Chicago</Text>
              <Text style={styles.aboutText}>
                We are a family owned Mediterranean restaurant, focused on
                traditional recipes served with a modern twist
              </Text>
            </View>
            <Image
              source={require("../assets/Hero_image.png")}
              style={styles.mainImage}
            />
          </View>
          <TouchableOpacity style={styles.iconView}>
            <AntDesign name="search1" size={24} color="black" />
            <TextInput
              value={search}
              onChangeText={(search) => handleSearch(search)}
              style={styles.textInput}></TextInput>
          </TouchableOpacity>
        </View>

        <Text style={styles.categoryHeading}>ORDER FOR DELIVERY!</Text>
        <View style={styles.categoryContainer}>
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <CategoryItem data={item} onPressCate={handleOnPressCate} />
            )}
            keyExtractor={(item) => item.toString()}
            horizontal={true} // Set the horizontal prop to true
          />
        </View>
        <View style={styles.divider}></View>
        <View style={{ height: 350, flex: 1, margin: 10 }}>
          <FlatList
            data={filteredMenu}
            renderItem={({ item }) => <MenuItem data={item} />}
            keyExtractor={(item) => item.name}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#495E57",
    height: "33%",
    padding: 10,
  },
  headerText: {
    fontSize: 38,
    fontWeight: "600",
    color: "#F4CE14",
  },
  subHeadingTitle: {
    fontSize: 24,
    fontWeight: "400",
    color: "#EDEFEE",
    marginBottom: 20,
  },
  categoryHeading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginTop: 4,
    padding: 10,
  },
  aboutText: {
    fontSize: 16,
    color: "#EDEFEE",
    textAlign: "left",
    width: 200,
  },
  mainImage: {
    //marginTop: 10,
    width: 120,
    height: 130,
    borderRadius: 8,
  },
  iconView: {
    height: 35,
    width: 310,
    borderRadius: 100,
    backgroundColor: "#EDEFEE",
    marginTop: 10,
    justifyContent: "space-around",
    marginLeft: 14,
    marginBottom: 14,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryContainer: {
    height: "6%",
    //backgroundColor: "gray",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  divider: {
    height: 0.7,
    backgroundColor: "#000",
    marginHorizontal: 10,
    marginBottom: -10,
    marginTop: 10,
  },
  textInput: {
    height: 32,
    width: 260,
    borderRadius: 10,
    fontSize: 18,
    padding: 2,
    //backgroundColor: "#fff",
  },
});

export default Home;
