import { View, Text, Dimensions } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";

const InventoryCarousel = () => {
  const width = Dimensions.get("window").width;
  return (
    <View>
      <Carousel
        loop
        width={width/3}
        height={width / 2}
        // autoPlay={true}
        data={[...new Array(6).keys()]}
        style={{
          width: width
        }}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default InventoryCarousel;
