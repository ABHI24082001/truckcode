import {useNavigation} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import {
  Alert,
  Box,
  Center,
  HStack,
  IInputProps,
  ScrollView,
  Spinner,
  Text,
} from 'native-base';
import React, {useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {ANIMATIONS} from '~/assets';
import {PrivateContainer} from '~/components/containers';
import {AppInput, Btn} from '~/components/core';
import AppIcon, {IconProps} from '~/components/core/AppIcon';
import {useMutation} from '~/hooks';
import {StackAndTabType} from '~/routes/private/types';
import {screenWidth} from '~/styles';

type FormValues = {
  title: string;
  message: string;
};
type FormInput = {
  key: keyof FormValues;
  label: string;
  placeholder: string;
  icon: IconProps;
  rules: Object;
  inputProps?: IInputProps;
};
type FormData = {
  [key: string]: string;
};

const Support = ({route: {params}}: any) => {
  const {goBack} = useNavigation();
  const {mutation, isLoading} = useMutation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<FormData>();
  const formInputs: FormInput[] = useMemo(() => {
    const inputFields: FormInput[] = [
      {
        key: 'title',
        label: 'Title *',
        placeholder: 'Enter title',
        icon: {MaterialCommunityIconsName: 'format-text'},
        rules: {
          required: 'Title is required',
        },
      },
      {
        key: 'message',
        label: 'Message *',
        placeholder: 'Enter message',
        rules: {
          required: 'Title is required',
        },
        textArea: true,
      },
    ];

    return inputFields;
  }, [secureTextEntry, secureTextEntryConfirm]);
  const {navigate} = useNavigation<StackAndTabType>();
  const handleSupport = async (data: FormData) => {
    try {
      const res = await mutation('support', {
        isAlert: true,
        body: {
          title: data.title,
          message: data.message,
        },
      });
      if (res?.results?.success) {
        navigate('AllSupport');
        params?.mutate();
      }
      console.log('support response--', res);
    } catch (error) {
      Alert(
        `${error instanceof Error ? error?.message : 'Something Went wrong'}`,
      );
    }
  };
  return (
    <PrivateContainer title="Get Help" flex={1} bg={'white'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        h={'100%'}
        flex={1}
        px={screenWidth * 0.04}
        py={screenWidth * 0.05}>
        <Center flexGrow={1} h="100%" w="full">
          <Box size={'250'} alignSelf={'center'}>
            <AnimatedLottieView
              source={ANIMATIONS.support}
              autoPlay
              loop={true}
            />
          </Box>

          {formInputs.map(input => (
            <AppInput
              input={input}
              key={input.key}
              control={control}
              errorMessage={errors?.[input?.key]?.message}
            />
          ))}

          <Box w="full" mt={4}>
            <Btn
              borderRadius="18"
              alignItems={'center'}
              w="full"
              bg={'black'}
              py={0.5}
              onPress={handleSubmit(handleSupport)}>
              {isLoading ? (
                <HStack space={2} py={3}>
                  <Spinner alignSelf={'center'} size={'sm'} color={'white'} />
                  <Text
                    color="white"
                    fontSize="18"
                    fontFamily={'Montserrat-SemiBold'}
                    textAlign={'center'}>
                    Loading...
                  </Text>
                </HStack>
              ) : (
                <HStack alignItems={'center'}>
                  <AppIcon MaterialIconsName="perm-phone-msg" color="white" />
                  <Text fontSize={18} mr={'auto'} bold color="white" py={3}>
                    Submit
                  </Text>
                </HStack>
              )}
            </Btn>
          </Box>
        </Center>
      </ScrollView>
    </PrivateContainer>
  );
};

export default Support;
