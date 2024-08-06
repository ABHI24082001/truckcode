import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AnimatedLottieView from 'lottie-react-native';
import {
  Alert,
  Box,
  Center,
  HStack,
  IInputProps,
  Pressable,
  ScrollView,
  Spinner,
  Text,
} from 'native-base';
import React, {useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {ANIMATIONS} from '~/assets';
import {AppIcon, AppInput, Btn} from '~/components/core';
import {IconProps} from '~/components/core/AppIcon';
import {useMutation} from '~/hooks';
import {PublicRoutesTypes} from '~/routes/public/types';
import {screenWidth} from '~/styles';
type FormValues = {
  otp: string;
  newPassword: string;
  confirmPassword: string;
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
type Props = NativeStackScreenProps<PublicRoutesTypes, 'ResetPassword'>;
const ResetPassword = ({route: {params}, navigation}: any) => {
  const {mutation, isLoading} = useMutation();
  const {goBack, navigate} = useNavigation<any>();
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
        key: 'otp',
        label: 'OTP',
        placeholder: 'Enter Otp',
        icon: {FeatherName: 'lock'},
        rules: {
          required: 'Otp is required',
          minLength: {
            value: 6,
            message: 'Otp must be at least 6 characters long',
          },
        },
        inputProps: {
          keyboardType: 'visible-password',
          autoCapitalize: 'none',
        },
      },
      {
        key: 'newPassword',
        label: 'New Password',
        placeholder: 'Enter new password',
        icon: {FeatherName: 'lock'},
        rules: {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters long',
          },
        },
        inputProps: {
          secureTextEntry,
          keyboardType: 'visible-password',
          autoCapitalize: 'none',
          rightElement: (
            <Btn
              colors={['transparent', 'transparent']}
              _text={{color: 'black', fontSize: 'xs'}}
              onPress={() => setSecureTextEntry(!secureTextEntry)}>
              {secureTextEntry ? 'Show' : 'Hide'}
            </Btn>
          ),
        },
      },
      {
        key: 'confirmPassword',
        label: 'Confirm Password',
        placeholder: 'Enter  password again',
        icon: {FeatherName: 'lock'},
        rules: {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters long',
          },
          validate: (val: string) => {
            if (watch('newPassword') != val) {
              return 'Your passwords do no match';
            }
          },
        },
        inputProps: {
          secureTextEntry: secureTextEntryConfirm,
          autoCapitalize: 'none',
          rightElement: (
            <Btn
              colors={['transparent', 'transparent']}
              _text={{color: 'black', fontSize: 'xs'}}
              onPress={() =>
                setSecureTextEntryConfirm(!secureTextEntryConfirm)
              }>
              {secureTextEntryConfirm ? 'Show' : 'Hide'}
            </Btn>
          ),
        },
      },
    ];

    return inputFields;
  }, [secureTextEntry, secureTextEntryConfirm]);
  const handleChangePassword = async (data: FormData) => {
    try {
      const res = await mutation('user/set-new-password', {
        method: 'PUT',
        isAlert: true,
        body: {
          email: params?.email,
          otp: data.otp,
          password: data.newPassword,
        },
      });
      console.log(res);
      if (res?.results?.success) {
        navigate('Login');
      }
    } catch (error) {
      Alert(
        `${error instanceof Error ? error?.message : 'Something Went wrong'}`,
      );
    }
  };
  return (
    <>
      <Box w={'full'} bg={'white'} p={5}>
        <Pressable onPress={() => goBack()}>
          <AppIcon
            IoniconsName={'arrow-back-circle-outline'}
            size={32}
            color={'black'}
          />
        </Pressable>
      </Box>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bg={'white'}
        h={'100%'}
        flex={1}
        px={screenWidth * 0.04}
        py={screenWidth * 0.05}>
        <Center
          flexGrow={1}
          h="100%"
          px={screenWidth * 0.04}
          py={screenWidth * 0.05}
          w="full">
          <Box
            size={'200'}
            bg={'lightBlue.50'}
            justifyContent={'center'}
            borderRadius={'full'}>
            <Box size={'150'} alignSelf={'center'}>
              <AnimatedLottieView
                source={ANIMATIONS.lock}
                autoPlay
                loop={true}
              />
            </Box>
          </Box>
          <Text mt="5" mb="4" fontSize="24" bold color={'primary.400'}>
            Reset Password
          </Text>

          {formInputs.map(input => (
            <AppInput
              input={input}
              key={input.key}
              control={control}
              errorMessage={errors?.[input?.key]?.message}
            />
          ))}
          <Pressable
            mt={3}
            alignItems={'center'}
            w={'full'}
            onPress={handleSubmit(handleChangePassword)}
            borderRadius={25}
            bg={'black'}
            mb={10}
            variant={'link'}>
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
                <Text fontSize={16} mr={'auto'} bold color="white" py={3}>
                  Reset Password
                </Text>
              </HStack>
            )}
          </Pressable>
        </Center>
      </ScrollView>
    </>
  );
};

export default ResetPassword;
