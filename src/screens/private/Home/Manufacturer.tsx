import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {
  Avatar,
  Box,
  HStack,
  Pressable,
  Row,
  ScrollView,
  
  Text,
  VStack,
} from 'native-base';
import React from 'react';

import {AppIcon, NotificationIcon} from '~/components/core';
import {useAuth, useSwrApi} from '~/hooks';
import {StackAndTabType} from '~/routes/private/types';
import {COLORS} from '~/styles';

export default function Manufacturer() {
  const {user} = useAuth();
  console.log('user', user);
  const {navigate, goBack} = useNavigation<StackAndTabType>();
  const {data} = useSwrApi('user?role=MANUFACTURER');

  const date = new Date();
  const datas = [
    {
      name: 'Gupta Traders',
      id: '#12345',
      status: 'Approved',
      requestDate: date,
    },
    {
      name: 'Gupta Traders',
      id: '#12345',
      status: 'Pending',
      requestDate: date,
    },
    {
      name: 'Gupta Traders',
      id: '#12345',
      status: 'Approved',
      requestDate: date,
    },
    {
      name: 'Gupta Traders',
      id: '#12345',
      status: 'Pending',
      requestDate: date,
    },
    {
      name: 'Gupta Traders',
      id: '#12345',
      status: 'Pending',
      requestDate: date,
    },
  ];
  return (
    <>
      <Box safeAreaTop flex={1} bg={COLORS.theme[100]}>
        
        <Box px={3} py={3} bg={COLORS.secondary[200]}>
          <Row w={'full'} justifyContent={'space-between'}>
            <HStack alignItems={'center'}>
              <Pressable _pressed={{opacity: 0.5}} onPress={() => goBack()}>
                <AppIcon AntDesignName="arrowleft" />
              </Pressable>
            </HStack>
            <Row alignItems={'center'} space={5}>
              <NotificationIcon
                isNotification
                onPress={() => navigate('Notifications')}
              />
            </Row>
          </Row>
        </Box>
        <ScrollView>
          {data?.data?.data?.map((item: any, index: number) => (
            <Box borderBottomWidth={0.3} my={1} py={2} px={3}>
              <HStack alignItems={'center'} justifyContent={'space-between'}>
                <HStack space={4}>
                  <Avatar>{item?.name.slice(0, 1).toUpperCase()}</Avatar>
                  <VStack>
                    <Text fontSize={15}>{item?.name}</Text>
                    <Text color="black" fontSize={12}>
                      {item?.userId}
                    </Text>
                    <Text>
                      Request date :
                      {moment(user?.createdAt).format('MMMM D, YYYY')}
                    </Text>
                  </VStack>
                </HStack>
                <Pressable
                  py={1}
                  px={2}
                  borderRadius={5}
                  _pressed={{opacity: 0.5}}
                  bg={item?.isVerified ? 'green.400' : 'gray.300'}>
                  <HStack alignItems={'center'} space={2}>
                    {item?.isVerified === 'true' ? (
                      <AppIcon
                        AntDesignName="checkcircle"
                        size={20}
                        color={'white'}
                      />
                    ) : (
                      <AppIcon
                        MaterialIconsName="error"
                        size={20}
                        color={'white'}
                      />
                    )}
                    <Text fontWeight={600} fontSize={15} color="white">
                      {item?.isVerified ? 'Approved' : 'Pending'}
                    </Text>
                  </HStack>
                </Pressable>
              </HStack>
            </Box>
          ))}
        </ScrollView>
      </Box>
    </>
  );
}
