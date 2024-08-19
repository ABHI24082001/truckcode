import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import {
  Actionsheet,
  Alert,
  Avatar,
  Box,
  Button,
  FlatList,
  HStack,
  Icon,
  Image,
  Input,
  Modal,
  Pressable,
  Row,
  Text,
  VStack,
  useDisclose,
} from 'native-base';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ANIMATIONS, IMAGES} from '~/assets';
import {PrivateContainer} from '~/components/containers';
import {AppIcon} from '~/components/core';
import {Empty} from '~/components/shared';
import {useMutation, useSwrApi} from '~/hooks';
import { StackAndTabType } from '~/routes/private/types';


export default function Notifications() {
  const {isOpen, onOpen, onClose} = useDisclose(); // For modal
  const [challanNumber, setChallanNumber] = useState('');
   const {navigate} = useNavigation<StackAndTabType>();

  const handleChallanSubmit = () => {
    console.log('Challan Number:', challanNumber);
    // Perform any submit actions here, such as API calls
    onClose(); // Close the modal after submission
  };

  return (
    <>
      <PrivateContainer flex={1} title="Challan Details" bg={'white'}>
        <Box flex={1} p={4}>
          {/* Logo */}
          <Row alignItems={'center'} justifyContent={'center'} mb={4}>
            <Box w={80} h={80}>
              <Image
                source={IMAGES.LOGO6}
                size={'100%'}
                resizeMode="contain"
                alt={'logo'}
              />
            </Box>
          </Row>
          {/* Buttons */}
          <VStack space={4}>
            <Button
              colorScheme="gray"
              onPress={onOpen}
              shadow={2}
              py={3}
              leftIcon={
                <Icon
                  as={Ionicons}
                  name="document-text-outline"
                  size="sm"
                  color="white"
                />
              }>
              Enter Challan Number
            </Button>
            <Button
              colorScheme="blue"
              onPress={() => navigate('OrderDetailDistributor')}
              shadow={2}
              py={3}>
              Register Loading Details
            </Button>
            <Button
              colorScheme="green"
              onPress={() => console.log('Show Loading Details')}
              shadow={2}
              py={3}>
              Show Loading Details
            </Button>
            <Button
              colorScheme="orange"
              onPress={() => console.log('Update Loading Details')}
              shadow={2}
              py={3}>
              Update Loading Details
            </Button>
          </VStack>
        </Box>

        {/* Modal for Entering Challan Number */}
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Enter Challan Number</Modal.Header>
            <Modal.Body>
              <VStack space={4}>
                <Input
                  placeholder="Challan Number"
                  value={challanNumber}
                  onChangeText={setChallanNumber}
                  InputLeftElement={
                    <Icon
                      as={<Ionicons name="document-text-outline" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                />
              </VStack>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={onClose}>
                  Cancel
                </Button>
                <Button onPress={handleChallanSubmit}>Submit</Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </PrivateContainer>
    </>
  );
}
