import React from "react";
import { styles } from "./style";
import { View } from "react-native";
import { Video } from "expo-av"; // Ensure you have installed expo-av package

const VideoComponent = () => {
  return (
    <View style={styles.videoBackground}>
      <Video
        source={require("../../../assets/videos/Video.mp4")}
        style={styles.video}
        isLooping
        shouldPlay
        isMuted
      />
    </View>
  );
};

export default VideoComponent;
