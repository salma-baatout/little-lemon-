import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const MenuItem = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.itemTitle}>{data.itemName}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: -4,
        }}>
        <View
          style={{
            justifyContent: "space-around",
          }}>
          <Text style={styles.itemDescription}>{data.description}</Text>
          <Text style={styles.itemPrice}>{data.price}</Text>
        </View>
        <Image
          source={{
            uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${data.image}?raw=true`,
          }}
          style={styles.itemImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 110,
    borderBottomWidth: 0.8,
    marginTop: 10,
  },
  itemTitle: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  itemImage: {
    width: 60,
    height: 60,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A4A4A",
    justifyContent: "flex-end",
    // marginBottom: 20,
  },
  itemDescription: {
    fontSize: 14,
    color: "#4A4A4A",
    textAlign: "left",
    width: 280,
    marginVertical: 5,
  },
});

export default MenuItem;
