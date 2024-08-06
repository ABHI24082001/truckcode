import {useNavigation} from '@react-navigation/native';
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
import {PrivateContainer} from '~/components/containers';
import {AppInput, Btn} from '~/components/core';
import {IconProps} from '~/components/core/AppIcon';
import {useAuth, useMutation} from '~/hooks';
import {screenWidth} from '~/styles';

type FormValues = {
  oldPassword: string;
  newPassword: string;
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

const ChangePassword = () => {
  const {goBack, navigate} = useNavigation();
  const {mutation, isLoading} = useMutation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const {logout} = useAuth();
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
        key: 'oldPassword',
        label: 'Old Password',
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
          keyboardType: 'visible-password',
          autoCapitalize: 'none',
        },
      },
      {
        key: 'newPassword',
        label: 'New Password',
        placeholder: 'Enter  password again',
        icon: {FeatherName: 'lock'},
        rules: {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters long',
          },
          validate: (val: string) => {
            if (watch('oldPassword') == val) {
              return 'New Password should not be equal to old Password';
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
      console.log(data);
      const res = await mutation('user/change-password', {
        method: 'PUT',
        isAlert: true,
        body: {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
      });

      if (res?.results?.success) {
        logout();
      }
    } catch (error) {
      Alert(
        `${error instanceof Error ? error?.message : 'Something Went wrong'}`,
      );
    }
  };
  return (
    <PrivateContainer title="Change Password" flex={1} bg={'white'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        h={'100%'}
        flex={1}
        px={screenWidth * 0.04}
        py={screenWidth * 0.05}>
        <Center flexGrow={1} h="100%" w="full">
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
                  Change Password
                </Text>
              </HStack>
            )}
          </Pressable>
        </Center>
      </ScrollView>
    </PrivateContainer>
  );
};

export default ChangePassword;
