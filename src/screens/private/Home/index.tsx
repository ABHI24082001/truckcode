import React, {useState, useEffect} from 'react';
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
  Modal,
  Input,
  useToast,
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
  const toast = useToast();

  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState('');

  useEffect(() => {
    if (newScannedData) {
      addScannedData(newScannedData);
    }
  }, [newScannedData]);

  const handleCodeSubmit = () => {
    toast.show({
      title: `Code Submitted: ${code}`,
      status: 'success',
      duration: 3000,
    });
    setModalVisible(false);
    setCode('');
  };

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
        <Box flex={1} borderRadius={10} py={2}>
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
              <Pressable onPress={() => setModalVisible(true)}>
                <Text bold fontSize={'sm'}>
                  Enter the code
                </Text>
              </Pressable>
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
            {scannedHistory.map((data, index) => {
              const [
                passNo,
                volume1,
                location,
                dateTime,
                owner,
                volume2,
                volume3,
                volume4,
                volume5,
                volume6,
                volume7,
                volume8,
                volume9,
                volume10,
                volume11,
                volume12,
                volume13,
                volume14,
              ] = data.split('|');

              return (
                <Box key={index} mb={5} p={3} bg={'#f9f9f9'} borderRadius={10}>
                  <Text fontSize={16} color={COLORS.secondary[800]} bold mb={2}>
                    Scanned Data {index + 1}
                  </Text>
                  <VStack space={2}>
                    <HStack space={2} alignItems="center">
                     
                      <Text>{passNo}</Text>
                    </HStack>
                    <HStack space={2} alignItems="center">
                     
                      <Text>{volume1}</Text>
                    </HStack>
                    <HStack space={2} alignItems="center">
                      
                      <Text>{location}</Text>
                    </HStack>
                    <HStack space={2} alignItems="center">
                     
                      <Text>{dateTime}</Text>
                    </HStack>
                    <HStack space={2} alignItems="center">
                     
                      <Text>{owner}</Text>
                    </HStack>
                    <HStack space={2} alignItems="center">
                     
                      <Text>{volume2}</Text>
                    </HStack>
                    <HStack space={2} alignItems="center">
                      
                      <Text>{volume3}</Text>
                    </HStack>
                    <HStack space={2} alignItems="center">
                     
                      <Text>{volume4}</Text>
                    </HStack>
                    <HStack space={2} alignItems="center">
                     
                      <Text>{volume5}</Text>
                    </HStack>
                    <HStack space={2} alignItems="center">
                     
                      <Text>{volume6}</Text>
                    </HStack>
                    <HStack space={2} alignItems="center">
                     
                      <Text>{volume7}</Text>
                    </HStack>
                    <HStack space={2} alignItems="center">
                      
                      <Text>{volume8}</Text>
                    </HStack>
                    <HStack space={2} alignItems="center">
                      
                      <Text>{volume9}</Text>
                    </HStack>
                    <HStack space={2} alignItems="center">
                     
                      <Text>{volume10}</Text>
                    </HStack>
                    <HStack space={2} alignItems="center">
                   
                      <Text>{volume11}</Text>
                    </HStack>
                    <HStack space={2} alignItems="center">
                    
                      <Text>{volume12}</Text>
                    </HStack>
                    <HStack space={2} alignItems="center">
                     
                      <Text>{volume13}</Text>
                    </HStack>
                    <HStack space={2} alignItems="center">
                     
                      <Text>{volume14}</Text>
                    </HStack>
                  </VStack>
                </Box>
              );
            })}

            <HStack space={2} justifyContent="center" mt={3}>
              <Button
                flex={1}
                onPress={() => toast.show({title: 'In', status: 'info'})}>
                In
              </Button>
              <Button
                flex={1}
                onPress={() => toast.show({title: 'Out', status: 'info'})}>
                Out
              </Button>
            </HStack>
          </Box>
        )}
      </ScrollView>

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Enter Code</Modal.Header>
          <Modal.Body>
            <Input
              value={code}
              onChangeText={setCode}
              placeholder="Enter code"
              autoFocus
            />
          </Modal.Body>
          <Modal.Footer>
            <Button colorScheme="blue" onPress={handleCodeSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
}
