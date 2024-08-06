import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {
  AlertDialog,
  Box,
  Divider,
  HStack,
  Heading,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import {StackAndTabType} from '~/routes/private/types';
import {COLORS, screenWidth} from '~/styles';
import {AppIcon, Btn} from './core';

export default function CrItemCard({itemData, userRole}: any) {
  const {navigate} = useNavigation<StackAndTabType>();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const onDeleteClose = () => setIsDeleteOpen(false);
  const cancelRef = React.useRef(null);
  return (
    <>
      {itemData.map((item: any, index: number) => (
        <Pressable
          bg="white"
          shadow={2}
          key={index}
          onPress={() => navigate('OrderDetailDistributor', {userRole})}
          borderWidth={0.5}
          borderColor={COLORS.theme[900]}
          w={screenWidth * 0.96}
          alignSelf={'center'}
          p={2}
          my={1}
          borderRadius={10}
          justifyContent={'center'}>
          <HStack space={2}>
            <Box
              borderRadius={10}
              h={screenWidth / 3.5}
              alignSelf={'center'}
              w={'25%'}
              bg={COLORS.theme[400]}>
              <Image
                borderRadius={10}
                source={{
                  uri: item.img,
                }}
                size={'100%'}
                resizeMode={'cover'}
                alt={'Cart Item'}
              />
            </Box>
            <VStack w={'75%'} space={1} pr={2}>
              <HStack alignItems={'center'} justifyContent={'space-between'}>
                <Text color={'info.400'}>Order Id : {item.orderId}</Text>
                <HStack space={3}>
                  {/* {userRole === 'CompanyRepresentative' ? (
                                        <Pressable _pressed={{ opacity: 0.5 }}>
                                            <AppIcon AntDesignName="eyeo" color={'gray'} />
                                        </Pressable>
                                    ) : null} */}
                  {item.isButton ? (
                    <Pressable
                      _pressed={{opacity: 0.5}}
                      onPress={() => setIsDeleteOpen(!isDeleteOpen)}>
                      <AppIcon
                        AntDesignName="delete"
                        color={'#dc2626'}
                        size={22}
                      />
                    </Pressable>
                  ) : null}
                </HStack>
              </HStack>
              <Text color={'muted.500'}>
                Manufacturer id : {item.manufacturerId}
              </Text>
              <Text
                fontWeight={'500'}
                fontSize={'md'}
                flexWrap={'wrap'}
                w={'95%'}>
                {item.productName}
              </Text>

              <HStack justifyContent={'space-between'}>
                <Box>
                  <HStack space={2} alignItems={'center'}>
                    <Text fontSize={'18'} bold color={'black'}>
                      Price : ₹{item.price}
                    </Text>
                    <Divider orientation="vertical" bg={'black'} py={2} />
                    <Text fontSize={'sm'}>Qty: {item.quantity}</Text>
                  </HStack>
                  <HStack
                    alignItems={'center'}
                    justifyContent={'space-between'}>
                    <Text>
                      Date : {moment(item.date).format('MMMM D, YYYY')}
                    </Text>
                  </HStack>
                </Box>
                <HStack alignItems={'center'} justifyContent={'space-between'}>
                  {userRole === 'CompanyRepresentative' ? (
                    <Btn
                      bg={'black'}
                      onPress={() => setIsOpen(!isOpen)}
                      // onPress={handleSubmit(handleLogin)}
                      my="3">
                      <Heading size={'xs'} color={'white'}>
                        More
                      </Heading>
                    </Btn>
                  ) : null}
                </HStack>
              </HStack>
            </VStack>
          </HStack>
        </Pressable>
      ))}

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <Box m={2} my={3}>
            <VStack space={6} m={3}>
              <HStack justifyContent={'space-between'} alignItems={'center'}>
                <Heading size={'sm'} underline>
                  Distributor Details
                </Heading>
                <Pressable onPress={onClose}>
                  <AppIcon
                    EntypoName="circle-with-cross"
                    size={20}
                    color={'black'}
                  />
                </Pressable>
              </HStack>
              <VStack space={3}>
                <HStack space={2}>
                  <Text fontSize={12} color={'black'}>
                    Name:
                  </Text>
                  <Text fontSize={12} color={'gray'}>
                    John Deep
                  </Text>
                </HStack>
                <HStack space={2}>
                  <Text fontSize={12} color={'black'}>
                    Email:
                  </Text>
                  <Text fontSize={12} color={'gray'}>
                    jhondeep@email.com
                  </Text>
                </HStack>
                <HStack space={2}>
                  <Text fontSize={12} color={'black'}>
                    Phone:
                  </Text>
                  <Text fontSize={12} color={'gray'}>
                    +91 1234567890
                  </Text>
                </HStack>
                <HStack space={2}>
                  <Text fontSize={12} color={'black'}>
                    Address:
                  </Text>
                  <Text fontSize={12} color={'gray'}>
                    At- Bhubaneswar, Odisha, PIN- 751019
                  </Text>
                </HStack>
              </VStack>
            </VStack>

            <Box mt={5}>
              <Btn bg={'gray.700'} onPress={onClose}>
                <Heading size={'sm'} color={'white'}>
                  Okay
                </Heading>
              </Btn>
            </Box>
          </Box>
        </AlertDialog.Content>
      </AlertDialog>

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}>
        <AlertDialog.Content>
          <Box m={2} my={3}>
            <VStack space={3} m={3}>
              <HStack justifyContent={'space-between'} alignItems={'center'}>
                <Heading size={'sm'}>Delete Address</Heading>
                <Pressable onPress={onDeleteClose}>
                  <AppIcon
                    EntypoName="circle-with-cross"
                    size={20}
                    color={'black'}
                  />
                </Pressable>
              </HStack>
              <Text fontSize={12} color={'gray'}>
                Are you sure want to delete this address?
              </Text>
            </VStack>

            <HStack
              justifyContent={'space-between'}
              space={5}
              m={3}
              alignItems={'center'}>
              <Pressable
                onPress={onDeleteClose}
                ref={cancelRef}
                _pressed={{opacity: 0.6}}
                borderWidth={1}
                borderColor={'black'}
                p={1.5}
                px={2}
                borderRadius={5}>
                <Heading size={'sm'}>Cancel</Heading>
              </Pressable>
              <Btn bg={'red.500'} onPress={onDeleteClose}>
                <Heading size={'sm'} color={'white'}>
                  Delete
                </Heading>
              </Btn>
            </HStack>
          </Box>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
}
