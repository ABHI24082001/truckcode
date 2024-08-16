import {useNavigation} from '@react-navigation/native';
import {
  Avatar,
  Box,
  Button,
  Center,
  Image,
  Pressable,
  Row,
  HStack,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React from 'react';

import {SharedElement} from 'react-navigation-shared-element';
import {IMAGES} from '~/assets';
import {AppIcon, Content, List, NotificationIcon} from '~/components/core';
import {IconProps} from '~/components/core/AppIcon';
import {useAuth} from '~/hooks';
import {StackAndTabType} from '~/routes/private/types';
import {COLORS, screenWidth} from '~/styles';




export default function Profile() {
  const {navigate} = useNavigation<StackAndTabType>();
  const {logout, user} = useAuth();
  console.log('user data--', user);
  const listData: {
    title: string;
    subtitle?: string;
    avatar?: string;
    leftIcon?: IconProps;
    isHeading?: boolean;
    onPress?: () => void;
  }[] = [
    {
      title: 'Account Settings',
      isHeading: true,
    },
    {
      title: 'Edit Profile',
      leftIcon: {FeatherName: 'user'},
      onPress: () => navigate('ProfileEdit'),
    },

    {
      title: 'Notifications',
      leftIcon: {FeatherName: 'bell'},
      onPress: () => navigate('Notifications'),
    },
    {
      title: 'Support',
      isHeading: true,
    },
    {
      title: 'Get Help',
      leftIcon: {FeatherName: 'help-circle'},
      onPress: () => navigate('AllSupport'),
    },

    {
      title: 'Account Actions',
      isHeading: true,
    },
    {
      title: 'Logout',
      leftIcon: {FeatherName: 'log-out'},
      onPress: () => logout(),
    },
    {
      title: 'Change Password',
      leftIcon: {FeatherName: 'key'},
      onPress: () => navigate('ChangePassword'),
    },
  ];
  type optionProp = {
    id: number;
    name: string;
    onPress: () => void;
  };
  const options: optionProp[] = [
    {
      id: 1,
      name: 'Your Order',
      onPress: () => {
        navigate('Order');
      },
    },
  ];


  return (
    <Box safeAreaTop flex={1} bg={COLORS.theme[100]}>
      <Row
        my={5}
        space={2}
        alignItems={'center'}
        justifyContent={'space-between'}
        mx={5}>
        <HStack alignItems="center" space={2}>
          <Image
            source={IMAGES.LOGO3}
            style={{width: 65, height: 65}}
            resizeMode="contain"
            alt={'logo'}
          />
          <Text bold fontSize={'xl'}>
            Tranzol
          </Text>
        </HStack>
        <Box>
          <HStack space={2} alignItems={'center'} my={1}>
            <AppIcon FontAwesomeName="history" color={'#63c1ff'} size={20} />
            <Text bold fontSize={'md'}>
              History
            </Text>
          </HStack>   
        </Box>
      </Row>

      <Box alignItems={'center'} justifyContent={'center'}>
        <Text bold fontSize={'xl'}>
          User History
        </Text>
      </Box>
      <Row alignItems={'center'} justifyContent={'center'}>
        <Box w={80} h={80}>
          <Image
            source={IMAGES.LOGO5}
            size={'100%'}
            resizeMode="contain"
            alt={'logo'}
          />
        </Box>
      </Row>

      <Button onPress={() => navigate('HistoryScreen')} mt={4} mb={8} mx={10} rounded={5}>
        View Scan History
      </Button>




      {/* <ScrollView showsVerticalScrollIndicator={false}>
        <Box
          flex={1}
          p={3}
          bg={{
            linearGradient: {
              colors: [COLORS.theme[100], COLORS.secondary[200]],
              start: [0, 1],
              end: [0, 0.5],
            },
          }}>
          <Row w={'full'} justifyContent={'space-between'}>
            <Row space={2} alignItems={'center'}>
              <Box w={30} h={30}>
                <Image
                  source={IMAGES.LOGO2}
                  size={'100%'}
                  resizeMode="contain"
                  alt={'logo'}
                />
              </Box>
              <Box>
                <Text bold fontSize={'sm'}>
                  Viloop
                </Text>
                <Text fontSize={'xs'}>We Loop-In The World</Text>
              </Box>
            </Row>
            <Row alignItems={'center'} space={5}>
              <NotificationIcon
                isNotification
                onPress={() => navigate('Notifications')}
              />
              <Pressable
                _pressed={{opacity: 0.5}}
                onPress={() => navigate('Search')}>
                <AppIcon size={22} color={'black'} FeatherName={'search'} />
              </Pressable>
            </Row>
          </Row>
          <Pressable
            flexDirection={'row'}
            alignItems="center"
            w="full"
            py={3}
            _pressed={{bg: 'gray.200', opacity: 0.5}}>
            <Center w={'1/6'}>
              <SharedElement id="id-1">
                <Avatar
                  source={{
                    uri: user?.avatar
                      ? user?.avatar
                      : 'https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-silhouette-on-white-background-png-image_4853539.png',
                  }}></Avatar>
              </SharedElement>
            </Center>
            <Row alignItems="center" justifyContent="space-between" w={'5/6'}>
              <VStack>
                <Row space={2}>
                  <Text fontSize={'lg'}>Hello,</Text>
                  <Text bold fontSize={'lg'}>
                    {user?.name}
                  </Text>
                </Row>
                <Text fontSize={11}>{user?.email}</Text>
                <Text fontSize={11}>Phone number : {user?.phone}</Text>
              </VStack>
            </Row>
          </Pressable>
          <Row>
            {options?.map((item: any) => (
              <Pressable
                onPress={() => {
                  item.onPress();
                }}
                _pressed={{opacity: 0.5}}
                key={item.id.toString()}
                bg={'white'}
                p={3}
                m={2}
                shadow={2}
                alignItems={'center'}
                borderRadius={20}
                w={screenWidth * 0.9}>
                <Text bold>{item.name}</Text>
              </Pressable>
            ))}
          </Row>
        </Box>
        <Box p={3}>
          {listData.map((item, index) => (
            <React.Fragment key={index}>
              {item.isHeading ? (
                <Content size="sm" mt={3} mb={2} weight="bold">
                  {item.title}
                </Content>
              ) : (
                <List
                  title={item.title}
                  leftIcon={item.leftIcon}
                  subtitle={item.subtitle}
                  avatar={item.avatar}
                  hasSharedElement={Boolean(item?.avatar)}
                  onPress={() => item?.onPress?.()}
                  noDivider
                />
              )}
            </React.Fragment>
          ))}
        </Box>
      </ScrollView> */}
    </Box>
  );
}
