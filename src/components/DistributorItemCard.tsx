import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {Box, Divider, HStack, Heading, Text, VStack} from 'native-base';
import React from 'react';
import {StackAndTabType} from '~/routes/private/types';
import {COLORS, screenWidth} from '~/styles';
import {Btn} from './core';

export default function DistributorItemCard({itemData}: any) {
  const {navigate} = useNavigation<StackAndTabType>();
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // const [id, setId] = useState('');
  // const {mutation} = useMutation();
  // const openDeleteModal = () => {
  //   setIsDeleteModalOpen(true);
  // };
  // const closeDeleteModal = () => {
  //   setIsDeleteModalOpen(false);
  // };
  // const handleDelete = async () => {
  //   try {
  //     const res = await mutation(`order/${id}`, {
  //       method: 'DELETE',
  //       isAlert: true,
  //     });
  //     console.log('res', res);
  //   } catch (error) {
  //     Alert(
  //       `${error instanceof Error ? error?.message : 'Something Went wrong'}`,
  //     );
  //   }
  // };
  return (
    <>
      {itemData?.map((item: any, index: number) => (
        <Box
          bg="white"
          shadow={2}
          key={index}
          borderWidth={0.5}
          borderColor={COLORS.theme[900]}
          w={screenWidth * 0.96}
          alignSelf={'center'}
          p={2}
          my={1}
          borderRadius={10}
          justifyContent={'center'}>
          <VStack space={1} pr={2}>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
              <Text color={'info.400'} noOfLines={1}>
                Order Id : {item?.orderId}
              </Text>
              {/* <HStack space={3}>
                <Pressable
                  _pressed={{opacity: 0.5}}
                  onPress={() => {
                    openDeleteModal(), setId(item?.id);
                  }}>
                  <AppIcon AntDesignName="delete" color={'#dc2626'} size={22} />
                </Pressable>

              </HStack> */}
            </HStack>
            <Text color={'muted.500'}>
              Manufacturer id : {item?.manufacturer?.id || '#12345'}
            </Text>
            <HStack justifyContent={'space-between'}>
              <Box>
                <HStack space={2} alignItems={'center'}>
                  <Text fontSize={'18'} bold color={'black'}>
                    Price : ₹{item?.total}
                  </Text>
                  <Divider orientation="vertical" bg={'black'} py={2} />
                  <Text fontSize={'sm'}>Qty: {item?.quantity || 0}</Text>
                </HStack>
                <HStack alignItems={'center'} justifyContent={'space-between'}>
                  <Text>
                    Order Date :{' '}
                    {moment(item?.createdAt).format('MMMM D, YYYY')}
                  </Text>
                </HStack>
              </Box>
              <HStack alignItems={'center'} justifyContent={'space-between'}>
                <Btn
                  bg={'black'}
                  onPress={() =>
                    navigate('OrderDetailDistributor', {id: item?.id})
                  }
                  my="3">
                  <Heading size={'xs'} color={'white'}>
                    Details
                  </Heading>
                </Btn>
              </HStack>
            </HStack>
          </VStack>
          {/* <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={closeDeleteModal}
            title="Are you sure you want to Delete this order?"
            handelDelete={() => {
              handleDelete(), closeDeleteModal();
            }}
          /> */}
        </Box>
      ))}
    </>
  );
}
