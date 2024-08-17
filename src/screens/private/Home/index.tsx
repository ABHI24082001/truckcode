import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  Modal,
  Pressable,
  Row,
  ScrollView,
  Text,
  VStack,
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
      // Check if the new scanned data already exists
      if (!scannedHistory.includes(newScannedData)) {
        addScannedData(newScannedData);
      } else {
        toast.show({
          title: 'Duplicate Data',
          description: 'This scanned data has already been added.',
          status: 'warning',
          duration: 3000,
        });
      }
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

  // Define data labels
  const dataLabels = [
    'Pass No',
    'Volume 1',
    'Location',
    'Date/Time',
    'Owner',
    'Volume 2',
    'Volume 3',
    'Volume 4',
    'Volume 5',
    'Volume 6',
    'Volume 7',
    'Volume 8',
    'Volume 9',
    'Volume 10',
    'Volume 11',
    'Volume 12',
    'Volume 13',
    'Volume 14',
    'Volume 15',
    'Volume 16',
    'Volume 17',
    'Volume 18',
    'Volume 19',
    'Volume 20',
    'Volume 21',
    'Volume 22',
    'Volume 23',
    'Volume 24',
    'Volume 25',
    'Volume 26',
    'Volume 27',
    'Volume 28',
    'Volume 29',
    'Volume 30',
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
              const dataItems = data.split('|');
              return (
                <Box key={index} mb={5} p={3} bg={'#f9f9f9'} borderRadius={10}>
                  <Text fontSize={16} color={COLORS.secondary[800]} bold mb={2}>
                    Scanned Data {index + 1}
                  </Text>
                  <Box>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <VStack space={1}>
                        {dataLabels.map((label, index) => (
                          <Box key={index} bg={'#f9f9f9'} borderRadius={8}>
                            <Text>{dataItems[index]}</Text>
                          </Box>
                        ))}
                      </VStack>
                    </ScrollView>
                  </Box>
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
