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
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';

export default function Profile() {
  const {data} = useSwrApi('order/get-orders-by-distributor-cr');
  const {user, logout} = useAuth();
  const {navigate} = useNavigation<StackAndTabType>();
  const route = useRoute();
  const {scannedData: newScannedData} = route.params || {};
  const {scannedHistory, addScannedData} = useScannedData();
  const toast = useToast();
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnim = useState(new Animated.Value(0))[0];
  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState('');

  useEffect(() => {
    if (newScannedData) {
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

  const flipCard = () => {
    Animated.timing(flipAnim, {
      toValue: isFlipped ? 0 : 180,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setIsFlipped(!isFlipped);
    });
  };

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  };

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

        <View style={styles.container}>
          <TouchableOpacity onPress={flipCard}>
            <Animated.View style={[styles.card, frontAnimatedStyle]}>
              <TouchableOpacity
                onPress={() => navigate('ScanScreen')}
                style={styles.cardText}>
                <Text style={{color: '#fff'}}>Scan</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              style={[styles.card, styles.cardBack, backAnimatedStyle]}>
              {scannedHistory.length > 0 && (
                <Box flex={1}>
                  <ScrollView
                    showsVerticalScrollIndicator={true}
                    contentContainerStyle={styles.scrollContainer}>
                    <Box flexDirection="row" flexWrap="wrap">
                      {scannedHistory.map((data, index) => {
                        const dataItems = data.split('|');
                        return (
                          <Box
                            key={index}
                            bg={'#f9f9f9'}
                            p={2}
                            m={2}
                            borderRadius={5}
                            maxWidth={300} // Adjust maxWidth to fit your design needs
                          >
                            <HStack flexWrap="wrap">
                              {dataItems.map((item, i) => (
                                <Box
                                  key={i}
                                  p={0.9}
                                  maxWidth="100%" // Ensure items wrap within container
                                >
                                  <Text fontSize={10}>{item}</Text>
                                </Box>
                              ))}
                            </HStack>
                          </Box>
                        );
                      })}
                    </Box>
                  </ScrollView>
                </Box>
              )}
            </Animated.View>
          </TouchableOpacity>
        </View>

        <Button onPress={() => navigate('ScanScreen')} mt={4} mb={10} mx={10}>
          Scan QR Code
        </Button>
      </ScrollView>

      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        size="lg">
        <Modal.Content>
          <Modal.Header>Enter Code</Modal.Header>
          <Modal.Body>
            <Input
              placeholder="Enter code"
              value={code}
              onChangeText={setCode}
              mb={4}
            />
            <Button onPress={handleCodeSubmit}>Submit</Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 200,
    perspective: 1000,
  },
  card: {
    width: 300,
    height: 200,
    marginLeft: 60,
    backfaceVisibility: 'hidden',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#66c4ff',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  cardBack: {
    backgroundColor: '#f1f1f1',
    zIndex: 1,
    transform: [{rotateY: '180deg'}],
  },
  cardText: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
