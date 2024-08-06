import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Box,
  Heading,
  Image,
  Pressable,
  Row,
  ScrollView,
  Text,
  VStack,
  Button,
  HStack,
} from 'native-base';

import {IMAGES} from '~/assets';
import {DistributorItemCard} from '~/components';
import AppIcon from '~/components/core/AppIcon';
import {useAuth, useSwrApi} from '~/hooks';
import {StackAndTabType} from '~/routes/private/types';
import {COLORS} from '~/styles';
import {useScannedData} from './ScannedDataContext';

export default function Profile() {
  const {data} = useSwrApi('order/get-orders-by-distributor-cr');
  const {data: dashboard} = useSwrApi('analytics/distributor-dashboard-data');
  const {user} = useAuth();
  const {navigate} = useNavigation<StackAndTabType>();
  const {logout} = useAuth();
  const route = useRoute();
  const {scannedData: newScannedData} = route.params || {};
  const {scannedHistory, addScannedData} = useScannedData();

  useEffect(() => {
    if (newScannedData) {
      addScannedData(newScannedData);
    }
  }, [newScannedData]);

  const listData = [
    {
      title: 'Support',
      onPress: () => navigate('Support'),
    },
    {
      title: 'Logout',
      onPress: () => logout(),
    },
    {
      title: 'All Manufacturer',
      onPress: () => navigate('Manufacturer'),
    },
  ];

  return (
    <Box safeAreaTop flex={1} bg={COLORS.theme[100]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box
          flex={1}
          borderRadius={10}
          py={2}
          bg={{
            linearGradient: {
              colors: [COLORS.theme[100], COLORS.secondary[200]],
              start: [0, 1],
              end: [0, 0.5],
            },
          }}>
          {user?.role === 'DISTRIBUTOR' && (
            <DistributorItemCard itemData={data?.data?.data} />
          )}
        </Box>

        <Row
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
              <AppIcon AntDesignName="enviroment" color={'#63c1ff'} size={22} />
              <Text bold fontSize={'sm'}>
                Enter the code
              </Text>
            </HStack>
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

        <Box alignItems={'center'} justifyContent={'center'}>
          <Text bold fontSize={'xl'}>
            Scanner
          </Text>
        </Box>

        <Row alignItems={'center'} justifyContent={'center'}>
          <Box w={80} h={80}>
            <Image
              source={IMAGES.LOGO4}
              size={'100%'}
              resizeMode="contain"
              alt={'logo'}
            />
          </Box>
        </Row>

        <Button onPress={() => navigate('ScanScreen')} mt={4} mb={10} mx={10}>
          Scan QR Code
        </Button>

        {scannedHistory.length > 0 && (
          <Box my={10} mx={5} p={3} bg={'#fff'} borderRadius={10}>
            {scannedHistory.map((data, index) => (
              <Box
                key={index}
                mb={5}
                p={3}
                bg={COLORS.secondary[200]}
                borderRadius={10}>
                <Text fontSize={16} color={COLORS.secondary[800]} bold mb={2}>
                  Scanned Data {index + 1}
                </Text>
                <Text fontSize={14} color={COLORS.secondary[700]}>
                  <Text bold>Code:</Text> {data.split('|')[0]}
                </Text>
                <Text fontSize={14} color={COLORS.secondary[700]}>
                  <Text bold>Volume:</Text> {data.split('|')[1]}
                </Text>
                <Text fontSize={14} color={COLORS.secondary[700]}>
                  <Text bold>Date & Time:</Text> {data.split('|')[2]}
                </Text>
                <Text fontSize={14} color={COLORS.secondary[700]}>
                  <Text bold>Details:</Text> {data.split('|')[3]}
                </Text>
              </Box>
            ))}
          </Box>
        )}
      </ScrollView>
    </Box>
  );
}
