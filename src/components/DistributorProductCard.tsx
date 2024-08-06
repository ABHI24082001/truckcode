import {Box, Divider, HStack, Image, Text, VStack} from 'native-base';
import React from 'react';
import {COLORS, screenWidth} from '~/styles';
const DEFAULT_IMAGE = 'https://commercial.bunn.com/img/image-not-available.png';
export default function DistributorProductCard({itemData}: any) {
  return (
    <>
      {itemData?.orderedItems?.map((item: any, index: number) => (
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
                  uri: item?.product?.imageUrl || DEFAULT_IMAGE,
                }}
                size={'100%'}
                resizeMode={'cover'}
                alt={'Cart Item'}
              />
            </Box>
            <VStack w={'75%'} space={1} pr={2}>
              <Text color={'info.400'} noOfLines={2}>
                Product Id : {item?.product?.id}
              </Text>

              <Text color={'muted.500'} noOfLines={1}>
                Manufacturer id : {itemData?.manufacturerId || '#12345'}
              </Text>
              <Text
                fontWeight={'500'}
                fontSize={'md'}
                flexWrap={'wrap'}
                w={'95%'}>
                {item?.product?.title}
              </Text>

              <HStack justifyContent={'space-between'}>
                <Box>
                  <HStack space={2} alignItems={'center'}>
                    <Text fontSize={'18'} bold color={'black'}>
                      Price : ₹{item?.product?.salePrice}
                    </Text>
                    <Text
                      fontSize={'12'}
                      color={'muted.500'}
                      textDecorationLine={'line-through'}>
                      ₹{item?.product?.regularPrice}
                    </Text>
                    <Divider orientation="vertical" bg={'black'} py={2} />
                    <Text fontSize={'sm'}>Qty: {item?.quantity}</Text>
                  </HStack>
                </Box>
              </HStack>
            </VStack>
          </HStack>
        </Box>
      ))}
    </>
  );
}
