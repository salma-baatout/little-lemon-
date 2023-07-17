import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CategoryItem = ({ data, onPressCate }) => {
  const [buttonStyle, setButtonStyle] = React.useState(styles.button);
  const [buttonTextStyle, setButtonTextStyle] = React.useState(
    styles.buttonText
  );

  const handleOnPress = () => {
    data.isSelected = !data.isSelected;
    if (data.isSelected) {
      setButtonStyle(styles.buttonSelected);
      setButtonTextStyle(styles.buttonTextSelected);
    } else {
      setButtonStyle(styles.button);
      setButtonTextStyle(styles.buttonText);
    }

    onPressCate(data);
  };
  return (
    <View>
      <TouchableOpacity
        style={buttonStyle}
        onPress={() => {
          handleOnPress();
        }}>
        <Text style={buttonTextStyle}>{data.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 35,
    borderColor: "black",
    shadowColor: "#000",
    shadowOffset: 1,
    marginHorizontal: 7,
    borderRadius: 12,
    justifyContent: "center",
    backgroundColor: "#B7B7B7",
    width: 130,
  },
  buttonText: {
    fontSize: 17,
    textAlign: "center",
    fontWeight: "600",
  },
  buttonSelected: {
    height: 35,
    borderColor: "black",
    shadowColor: "#000",
    shadowOffset: 1,
    marginHorizontal: 7,
    borderRadius: 12,
    justifyContent: "center",
    backgroundColor: "#495E57",
    width: 130,
  },
  buttonTextSelected: {
    fontSize: 17,
    textAlign: "center",
    fontWeight: "600",
    color: "white",
  },
});

export default CategoryItem;
