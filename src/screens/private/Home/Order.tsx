import {useNavigation} from '@react-navigation/native';
import {
  Actionsheet,
  Box,
  Heading,
  Pressable,
  Radio,
  Row,
  ScrollView,
  
  useDisclose,
} from 'native-base';
import React from 'react';
import {DistributorItemCard} from '~/components';
import {AppIcon, NotificationIcon} from '~/components/core';
import {useAuth, useSwrApi} from '~/hooks';
import {StackAndTabType} from '~/routes/private/types';
import {COLORS} from '~/styles';
export default function Order() {
  const date = new Date();
  const {data} = useSwrApi('order/get-orders-by-distributor-cr');

  const {navigate, goBack} = useNavigation<StackAndTabType>();
  const {user} = useAuth();

  const {isOpen, onOpen, onClose} = useDisclose();
  const statusOptions = [
    {label: 'Manufacturer1', value: '#12345'},
    {label: 'Manufacturer2', value: '#12345'},
    {label: 'Manufacturer3', value: '#12345'},
    {label: 'Manufacturer4', value: '#12345'},
    {label: 'Manufacturer5', value: '#12345'},
    {label: 'Manufacturer6', value: '#12345'},
  ];
  const [value, setValue] = React.useState(statusOptions[0].value);
  return (
    <>
      <Box safeAreaTop flex={1} bg={COLORS.theme[100]}>
       
        <Box px={3} pt={3} bg={COLORS.secondary[200]}>
          <Row w={'full'} justifyContent={'space-between'}>
            <Row space={2} alignItems={'center'}>
              <AppIcon AntDesignName="arrowleft" onPress={() => goBack()} />
            </Row>
            <Row alignItems={'center'} space={5}>
              <NotificationIcon
                isNotification
                onPress={() => navigate('Notifications')}
              />
              <Pressable _pressed={{opacity: 0.5}} onPress={onOpen}>
                <AppIcon IoniconsName="filter" />
              </Pressable>
            </Row>
          </Row>
        </Box>
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
            {user?.role === 'DISTRIBUTOR' ? (
              <DistributorItemCard itemData={data?.data?.data} />
            ) : null}
          </Box>
        </ScrollView>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Heading fontSize={18}>Select Manufacturer</Heading>
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
                  {item.label}({item.value})
                </Radio>
              ))}
            </Radio.Group>
          </Actionsheet.Content>
        </Actionsheet>
      </Box>
    </>
  );
}
