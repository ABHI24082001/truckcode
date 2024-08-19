import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Heading,
  Image,
  Pressable,
  Row,
  ScrollView,
  Text,
  VStack,
  HStack,
} from 'native-base';
import {IMAGES} from '~/assets';
import {COLORS} from '~/styles';
import {AppIcon} from '~/components/core';
import {useAuth} from '~/hooks';
import {useNavigation} from '@react-navigation/native';
import {StackAndTabType} from '~/routes/private/types';

const Coupons = () => {
  const {logout} = useAuth();
  const [selectedBox, setSelectedBox] = useState(null);

  const {navigate} = useNavigation<StackAndTabType>();

  // const handlePress = boxName => {
  //   setSelectedBox(boxName === selectedBox ? null : boxName);

  //   // Navigate only when "Loading" is pressed
  //   if (boxName === 'Loading') {
  //     navigate('Notifications'); // Replace 'Notifications' with your desired screen name
  //   }
  // };


  const handlePress = boxName => {
    setSelectedBox(boxName === selectedBox ? null : boxName);

    // Navigate to specific screens based on the boxName
    if (boxName === 'Loading') {
      navigate('Notifications'); // Navigate to Notifications screen
    } else if (boxName === 'Unloading') {
      navigate('Manufacturer'); // Navigate to Offer screen
    } else if (boxName === 'Fuel'){
      navigate('Support')
    }
  };



  const getBackgroundColor = boxName => {
    return selectedBox === boxName ? '#80aeff' : 'white';
  };

  return (
    <Box safeAreaTop flex={1} bg={COLORS.theme[100]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <Row alignItems={'center'} justifyContent={'space-between'} mx={5} my={2}>
          <HStack alignItems="center">
            <Image
              source={IMAGES.LOGO3}
              style={{width: 65, height: 65}}
              resizeMode="contain"
              alt={'logo'}
            />
           
          </HStack>
          <Box>
            <Pressable onPress={logout}>
              <HStack space={2} alignItems={'center'} my={1}>
                <AppIcon AntDesignName="logout" color={'#63c1ff'} size={22} />
                <Text bold fontSize={'sm'}>
                  Logout
                </Text>
              </HStack>
            </Pressable>
          </Box>
        </Row>

        {/* Welcome Section */}
        <Box my={8} ml={5}>
          <VStack space={4}>
            <Heading fontSize={28} color={'black'}>
              HELLO USER!
            </Heading>
            <Heading fontSize={58} color={'black'}>
              DASHBOARD
            </Heading>
          </VStack>
        </Box>

        {/* Boxes Section */}
        {['Loading', 'Unloading', 'Fuel'].map((boxName, index) => (
          <Box key={index}>
            <Pressable onPress={() => handlePress(boxName)}>
              <HStack
                ml={3}
                mr={3}
                mb={4}
                px={2}
                py={3}
                mx={5}
                borderRadius={'md'}
                bgColor={getBackgroundColor(boxName)}
                borderColor={'black'}
                shadow={'3'}
                borderBottomWidth={2}
                alignItems="center">
                <Box
                  bgColor={'blue.500'}
                  p={2.5}
                  borderRadius={'full'}
                  width={20}
                  height={20}
                  justifyContent="center"
                  alignItems="center">
                  {boxName === 'Loading' ? (
                    <AppIcon
                      SimpleLineIconsName="basket-loaded"
                      size={30}
                      color={'#ffff'}
                    />
                  ) : boxName === 'Unloading' ? (
                    <AppIcon
                      FontAwesome5Name="truck-loading"
                      size={30}
                      color={'#ffff'}
                    />
                  ) : (
                    <AppIcon
                      MaterialCommunityIconsName="hydraulic-oil-level"
                      size={30}
                      color={'#ffff'}
                    />
                  )}
                </Box>

                <Box mx={3}>
                  <Text fontSize={'40'} textAlign={'center'} color={'#000'}>
                    {boxName}
                  </Text>
                </Box>
              </HStack>
            </Pressable>
          </Box>
        ))}
      </ScrollView>
    </Box>
  );
};

export default Coupons;

const styles = StyleSheet.create({});
