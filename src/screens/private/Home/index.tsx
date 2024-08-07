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
        <Box
          flex={1}
          borderRadius={10}
          py={2}
         >
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
            {scannedHistory.map((data, index) => (
              <Box key={index} mb={5} p={3} bg={'#fff'} borderRadius={10}>
                <Text fontSize={16} color={COLORS.secondary[800]} bold mb={2}>
                  Scanned Data {index + 1}
                </Text>
                <VStack space={2}>
                  <HStack space={2} alignItems="center">
                    <Text bold>Code:</Text>
                    <Input
                      rounded={10}
                      borderWidth={2}
                      borderColor={'gray'}
                      flex={1}
                      placeholder="Enter code"
                      value={data.split('|')[0]}
                      onChangeText={text => {
                        const newData = [...scannedHistory];
                        newData[index] = `${text}|${data.split('|')[1]}|${
                          data.split('|')[2]
                        }|${data.split('|')[3]}`;
                        addScannedData(newData.join('|'));
                      }}
                    />
                  </HStack>
                  <HStack space={2} alignItems="center">
                    <Text bold>Volume:</Text>
                    <Input
                      
                      flex={1}
                      rounded={10}
                      borderWidth={2}
                      borderColor={'gray'}
                      placeholder="Enter volume"
                      value={data.split('|')[1]}
                      onChangeText={text => {
                        const newData = [...scannedHistory];
                        newData[index] = `${data.split('|')[0]}|${text}|${
                          data.split('|')[2]
                        }|${data.split('|')[3]}`;
                        addScannedData(newData.join('|'));
                      }}
                    />
                  </HStack>
                  <Text fontSize={14} color={COLORS.secondary[700]}>
                    <Text bold>Date & Time:</Text> {data.split('|')[2]}
                  </Text>
                  <Text fontSize={14} color={COLORS.secondary[700]}>
                    <Text bold>Details:</Text> {data.split('|')[3]}
                  </Text>
                </VStack>
              </Box>
            ))}

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
          <Modal.Header>Enter the Code</Modal.Header>
          <Modal.Body>
            <Input
              placeholder="Enter the code"
              value={code}
              onChangeText={text => setCode(text)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={handleCodeSubmit}>Submit</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
}
