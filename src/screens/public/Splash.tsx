import {Center, Image} from 'native-base';
import React from 'react';
import {IMAGES} from '~/assets';

const Splash = () => {
  return (
    <Center flex={1} bg={'white'}>
      <Image
        source={IMAGES.LOGO3}
        alt="Viloop Logo"
        h={400}
        w={400}
        resizeMode={'contain'}
      />
    </Center>
  );
};

export default Splash;
