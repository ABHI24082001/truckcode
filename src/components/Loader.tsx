import AnimatedLottieView from 'lottie-react-native';
import {Box, Center} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ANIMATIONS} from '~/assets';

const Loader = () => {
  return (
    <Center mt={'50%'}>
      <Box
        alignSelf={'center'}
        shadow={5}
        bg="white"
        // w={10}
        borderRadius={3}
        // p={6}
        m={4}
        // h={10}
        // flex={1}
        justifyContent="center"
        alignItems="center">
        <AnimatedLottieView
          source={ANIMATIONS.Loader}
          style={styles.animate}
          autoPlay
          resizeMode="cover"
        />
      </Box>
    </Center>
  );
};

export default Loader;

const styles = StyleSheet.create({
  animate: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
});
