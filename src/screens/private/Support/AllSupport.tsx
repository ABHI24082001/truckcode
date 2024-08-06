import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {Avatar, Box, FlatList, HStack, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {RefreshControl} from 'react-native-gesture-handler';
import {ANIMATIONS} from '~/assets';
import {Loader} from '~/components';
import {PrivateContainer} from '~/components/containers';
import {Btn} from '~/components/core';
import {Empty} from '~/components/shared';
import {useMutation, useSwrApi} from '~/hooks';

export default function Support(): JSX.Element {
  const [showModal, setshowModal] = useState(false);
  const {mutation: SendQuery, isLoading} = useMutation();
  const [refreshing, setRefreshing] = React.useState(false);
  const {navigate} = useNavigation<any>();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const {data, isValidating, mutate} = useSwrApi('support');
  const result = data?.data?.data;

  const supportDetails: any[] = [];
  result?.map((item: any) => supportDetails.push(item));

  return (
    <PrivateContainer title="All Supports" flex={1} bg={'white'}>
      {isValidating ? (
        <Loader />
      ) : (
        <FlatList
          p={2}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '15%'}}
          ListEmptyComponent={
            <Empty
              title="No support Request Yet"
              subtitle=""
              animation={ANIMATIONS.search}
              action={{label: 'Go Back'}}
            />
          }
          data={supportDetails}
          renderItem={({item}) => {
            return (
              <>
                <Box bg={'white'} my={2} mx={2} rounded={'md'} shadow={3}>
                  <Box p={2} justifyContent={'center'}>
                    <HStack space={5} alignItems={'center'}>
                      <Avatar size={'md'} backgroundColor={'gray.400'}>
                        <Text
                          textTransform={'uppercase'}
                          bold
                          color={'muted-700'}
                          fontSize={18}>
                          {item?.title?.charAt(0)}
                        </Text>
                      </Avatar>
                      <VStack>
                        <Text
                          fontSize={16}
                          fontWeight={500}
                          textTransform={'capitalize'}>
                          {item?.title}
                        </Text>
                        <Text fontSize={15} textTransform={'capitalize'}>
                          {item?.message}
                        </Text>

                        <Text color={'info.700'}>
                          {moment(item?.createdAt).format('ll')}
                          {' , '}
                          {moment(item?.createdAt).format('LT')}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </Box>
              </>
            );
          }}
        />
      )}
      <Box p="3" borderTopColor={'muted.200'} bg={'white'}>
        <Btn
          w="full"
          iconSide="RIGHT"
          bg={'black'}
          py={3}
          onPress={() => navigate('Support', {mutate: mutate})}>
          <Text color={'white'} fontWeight={600}>
            Send Message
          </Text>
        </Btn>
      </Box>
    </PrivateContainer>
  );
}
