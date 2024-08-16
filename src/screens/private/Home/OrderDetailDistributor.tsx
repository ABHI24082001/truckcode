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
        

       
      </Box>
    </>
  );
}
