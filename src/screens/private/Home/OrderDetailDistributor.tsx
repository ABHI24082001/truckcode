import {useNavigation} from '@react-navigation/native';
import {
  Actionsheet,
  Avatar,
  Box,
  Button,
  FormControl,
  HStack,
  Heading,
  Modal,
  Pressable,
  Radio,
  Row,
  ScrollView,
  Text,
  TextArea,
  VStack,
  useDisclose,
} from 'native-base';
import React from 'react';
import {DistributorProductCard} from '~/components';
import {AppIcon, NotificationIcon} from '~/components/core';
import {useSwrApi} from '~/hooks';
import {StackAndTabType} from '~/routes/private/types';
import {COLORS} from '~/styles';

export default function OrderDetailDistributor({route: {params}}: any) {
  const [showModal, setShowModal] = React.useState(false);
  const {data} = useSwrApi(`order/${params?.id}`);
  const result = data?.data?.data;

  const arr: any = [];
  result?.orderedItems?.map((item: any) => arr.push(item?.quantity));
  const totalQuantity = arr.reduce(
    (accumulator: number, currentValue: number) => accumulator + currentValue,
    0,
  );
  const date = new Date();
  const statusOptions = [
    {label: 'Dispatched', value: 'DISPATCHED'},
    {label: 'Cancelled', value: 'CANCELLED'},
  ];
  const cancelOptions = [
    {label: 'Merchant Shipped wrong item', value: 'wrong'},
    {label: 'Order Arrived too late', value: 'late'},
    {label: 'I changed my mind', value: 'mind'},
    {label: 'Other', value: 'other'},
  ];
  const [value, setValue] = React.useState('');
  const [cancel, setCancel] = React.useState('');
  const {isOpen, onOpen, onClose} = useDisclose();
  const {navigate, goBack} = useNavigation<StackAndTabType>();
  const handleCancelChange = (nextValue: string) => {
    setCancel(nextValue);

    if (nextValue === 'other') {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };
  return (
    <>
      <Box safeAreaTop flex={1} bg={COLORS.theme[100]}>
        
        <Box px={3} py={3} bg={COLORS.secondary[200]}>
          <Row w={'full'} justifyContent={'space-between'}>
            <HStack alignItems={'center'}>
              <Pressable _pressed={{opacity: 0.5}} onPress={() => goBack()}>
                <AppIcon AntDesignName="arrowleft" />
              </Pressable>
              <Heading fontSize={18}>Order Details</Heading>
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
          <Box mt={3}>
            <DistributorProductCard itemData={result} />
          </Box>
          <Box m={3}>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
              <Heading fontSize={15}>Order Status</Heading>
              <HStack space={2} alignItems={'center'}>
                {result?.status === 'DELIVERED' ? (
                  <Pressable
                    px={3}
                    py={1}
                    borderRadius={5}
                    _pressed={{opacity: 0.5}}
                    bg={'info.500'}>
                    <HStack alignItems={'center'} space={2}>
                      <Text fontWeight={600} fontSize={15} color={'white'}>
                        Download
                      </Text>
                      <AppIcon
                        EntypoName="download"
                        size={20}
                        color={'white'}
                      />
                    </HStack>
                  </Pressable>
                ) : null}
                <Pressable
                  p={2}
                  onPress={onOpen}
                  _pressed={{bg: '#e0f2fe'}}
                  borderRadius={'full'}>
                  <AppIcon FeatherName="edit" color={'#0284c7'} />
                </Pressable>
              </HStack>
            </HStack>
            <VStack ml={5} my={4} space={3}>
              <HStack alignItems={'center'} space={3}>
                <Avatar>
                  <AppIcon
                    MaterialCommunityIconsName="truck-delivery"
                    color="white"
                  />
                </Avatar>
                <VStack>
                  <Text fontSize={15} fontWeight={500}>
                    {result?.status}
                  </Text>
                  <Text>
                    {value ? `Order Status has been change to ${value}` : null}
                  </Text>
                  {/* <Text>{moment(date).format('MMMM D, YYYY')}</Text> */}
                </VStack>
              </HStack>
              <HStack alignItems={'center'} space={3}>
                <Avatar>
                  <AppIcon MaterialIconsName="payment" color="white" />
                </Avatar>
                <Text fontSize={15} fontWeight={500}>
                  Payment Mode : {result?.paymentMethod}
                </Text>
              </HStack>
            </VStack>
            <Heading fontSize={15}>Buyer's Details</Heading>
            <VStack ml={5} my={4} space={3}>
              <HStack alignItems={'center'} space={3}>
                <Avatar bg={'muted.400'}>
                  <Heading color="white">
                    {result?.customer?.name.slice(0, 1).toUpperCase()}
                  </Heading>
                </Avatar>
                <VStack>
                  <Text fontSize={15} fontWeight={500}>
                    {result?.customer?.name}
                  </Text>
                  <Text>Email id : {result?.customer?.email}</Text>
                  <Text>Phone no. : {result?.customer?.phone}</Text>
                  <Text>GST No. : {result?.customer?.gstNo}</Text>
                </VStack>
              </HStack>
            </VStack>
            <Heading fontSize={15}>Manufacturer's Details</Heading>
            <VStack ml={5} my={4} space={3}>
              <HStack alignItems={'center'} space={3}>
                <Avatar bg={'muted.400'}>
                  <Heading color="white">
                    {result?.manufacturer?.name.slice(0, 1).toUpperCase()}
                  </Heading>
                </Avatar>
                <VStack>
                  <Text fontSize={15} fontWeight={500}>
                    {result?.manufacturer?.name}
                  </Text>
                  <Text>Email id : {result?.manufacturer?.email}</Text>
                  <Text>Phone no. : {result?.manufacturer?.phone}</Text>
                  <Text>Id : {result?.manufacturer?.id}</Text>
                </VStack>
              </HStack>
            </VStack>
            <Heading fontSize={15}>Shipping Details</Heading>
            <HStack alignItems={'center'} space={3} ml={5} my={4}>
              <Avatar>
                <AppIcon EntypoName="location" color={'white'} />
              </Avatar>
              <VStack>
                <Text fontSize={15} fontWeight={500}>
                  {result?.deliveryAddress?.addressLineOne}
                </Text>
                <Text noOfLines={2}>
                  {result?.deliveryAddress?.landmark},
                  {result?.deliveryAddress?.city},
                  {result?.deliveryAddress?.state},
                  {result?.deliveryAddress?.country},
                  {result?.deliveryAddress?.zip}
                </Text>
              </VStack>
            </HStack>
            <Heading fontSize={15}>Bill Details</Heading>

            <VStack mx={5} my={4} space={3}>
              <HStack alignItems={'center'} justifyContent={'space-between'}>
                <Text>Total Quantity </Text>
                <Text>{totalQuantity}</Text>
              </HStack>
              <HStack alignItems={'center'} justifyContent={'space-between'}>
                <Text>Total Price </Text>
                <Text>₹{result?.total}</Text>
              </HStack>
            </VStack>
          </Box>
        </ScrollView>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <HStack
              alignItems={'center'}
              px={3}
              justifyContent={'space-between'}
              w={'full'}>
              <Heading fontSize={18}>Choose Order Status</Heading>
              <Pressable
                _pressed={{bg: 'muted.300'}}
                borderRadius={'full'}
                p={2}
                onPress={() => onClose()}>
                <AppIcon EntypoName="cross" />
              </Pressable>
            </HStack>
            <Radio.Group
              alignSelf={'flex-start'}
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={value}
              onChange={nextValue => {
                setValue(nextValue);
              }}>
              {statusOptions.map((item, index) => (
                <Radio value={item.value} my={3} key={index} mx={2}>
                  {item.label}
                </Radio>
              ))}
              {value === 'CANCELLED' ? (
                <>
                  <Heading fontSize={18} px={3} mt={5}>
                    Cause for Cancellation?
                  </Heading>
                  <Radio.Group
                    alignSelf={'flex-start'}
                    name="myRadioGroups"
                    accessibilityLabel="favorite number"
                    value={cancel}
                    onChange={nextValue => {
                      handleCancelChange(nextValue);
                    }}>
                    {cancelOptions.map((item, index) => (
                      <Radio value={item.value} my={3} key={index} mx={2}>
                        {item.label}
                      </Radio>
                    ))}
                  </Radio.Group>
                </>
              ) : null}
            </Radio.Group>
          </Actionsheet.Content>
        </Actionsheet>

        {showModal ? (
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
              <Modal.CloseButton />

              <Modal.Body>
                <FormControl>
                  <FormControl.Label>
                    Write your Cancellation Reason *
                  </FormControl.Label>
                  <TextArea />
                </FormControl>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      setShowModal(false);
                    }}>
                    Cancel
                  </Button>
                  <Button
                    onPress={() => {
                      setShowModal(false);
                    }}>
                    Save
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        ) : null}
      </Box>
    </>
  );
}
