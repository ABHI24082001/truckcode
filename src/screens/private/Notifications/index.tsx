import moment from 'moment';
import {
  Actionsheet,
  Alert,
  Avatar,
  Box,
  FlatList,
  HStack,
  Pressable,
  Text,
  VStack,
  useDisclose,
} from 'native-base';
import React from 'react';
import {ANIMATIONS} from '~/assets';
import {PrivateContainer} from '~/components/containers';
import {AppIcon} from '~/components/core';
import {Empty} from '~/components/shared';
import {useMutation, useSwrApi} from '~/hooks';
export default function Notifications() {
  const {data, mutate} = useSwrApi('notification');
  const {mutation} = useMutation();
  const result = data?.data?.data;
  const {isOpen, onOpen, onClose} = useDisclose();
  const handleDelete = async (id: number) => {
    try {
      const res = await mutation(`notification/${id}`, {
        method: 'DELETE',
        isAlert: true,
      });
      console.log('res', res);
      if (res?.results?.success) mutate();
    } catch (error) {
      Alert(
        `${error instanceof Error ? error?.message : 'Something Went wrong'}`,
      );
    }
  };
  const handleReadAll = async () => {
    try {
      const res = await mutation('notification/read-all', {
        method: 'PUT',
        isAlert: true,
        body: {},
      });
      if (res?.results?.success) {
        onClose();
        mutate();
      }
      console.log(res);
    } catch (error) {
      Alert(
        `${error instanceof Error ? error?.message : 'Something Went wrong'}`,
      );
    }
  };
  const handleDeleteAll = async () => {
    try {
      const res = await mutation('notification/delete/all-by-user', {
        method: 'DELETE',
        isAlert: true,
      });
      if (res?.results?.success) {
        onClose();
        mutate();
      }
      console.log(res);
    } catch (error) {
      Alert(
        `${error instanceof Error ? error?.message : 'Something Went wrong'}`,
      );
    }
  };
  const renderItem = ({item}: {item: any}) => {
    return (
      <Box p={2}>
        <HStack
          bg={'white'}
          shadow={1}
          borderRadius={10}
          w={'full'}
          p={2}
          alignItems={'center'}>
          <Pressable
            w={'90%'}
            onPress={() => handleDelete(item?.id)}
            _pressed={{opacity: 0.8}}>
            <HStack w={'95%'} space={2} flexWrap={'wrap'} alignItems={'center'}>
              <Box bg={'black'} borderRadius={'full'} p={1}>
                <Avatar size="sm" bg={'black'}>
                  <AppIcon size={22} color={'white'} FeatherName={'bell'} />
                </Avatar>
                {!item?.isRead ? <Avatar.Badge bg="green.500" /> : null}
              </Box>
              <VStack>
                <Text bold fontSize={'sm'}>
                  {item?.title}
                </Text>
                <Text fontSize={'xs'}>{item?.body}</Text>
                <Text fontSize={'xs'}>
                  {moment(item?.createdAt).format('MMMM D, YYYY')}
                </Text>
              </VStack>
            </HStack>
          </Pressable>
          <Pressable _pressed={{opacity: 0.5}}>
            <AppIcon
              size={20}
              color={'red'}
              MaterialCommunityIconsName={'delete'}
              onPress={() => handleDelete(item?.id)}
            />
          </Pressable>
        </HStack>
      </Box>
    );
  };
  return (
    <>
      <PrivateContainer
        flex={1}
        title="Notifications"
        bg={'white'}
        icons={[
          {
            icon: {EntypoName: 'dots-three-vertical'},
            side: 'RIGHT',
            onPress: () => onOpen(),
          },
        ]}>
        <Box flex={1}>
          <FlatList
            data={result}
            keyExtractor={item => item?.id}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            ListEmptyComponent={
              <Empty
                title="No Notifications Found"
                subtitle="There are no notifications available!"
                animation={ANIMATIONS.notification}
                action={{label: 'Go Back'}}
              />
            }
          />
        </Box>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Actionsheet.Item onPress={() => handleReadAll()}>
              Read All
            </Actionsheet.Item>
            <Actionsheet.Item onPress={() => handleDeleteAll()}>
              Delete All
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </PrivateContainer>
    </>
  );
}
