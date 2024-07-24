import React, { useEffect, useState } from 'react';
import {
  View, Text, Button, StyleSheet,
} from 'react-native';
import { Audio } from 'expo-av';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
function AudioPlayerScreen({ route, navigation }) {
  const { audioUri } = route.params;
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function playSound() {
    if (!sound) {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      });

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true },
      );
      setSound(newSound);
      setIsPlaying(true);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  }

  async function pauseSound() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  useEffect(() => (sound
    ? () => {
      sound.unloadAsync(); // Unload sound when the component unmounts
    }
    : undefined), [sound]);

  return (
    <View style={styles.container}>
      <Text>Audio Player</Text>
      <Button title={isPlaying ? 'Pause' : 'Play'} onPress={isPlaying ? pauseSound : playSound} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

AudioPlayerScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      audioUri: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default AudioPlayerScreen;
