import {useNavigation} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import {
  Alert,
  Box,
  Center,
  HStack,
  Heading,
  IInputProps,
  Link,
  Pressable,
  Row,
  ScrollView,
  Spinner,
  Text,
  useToast,
} from 'native-base';
import React, {useMemo} from 'react';
import {useForm} from 'react-hook-form';
import {useWindowDimensions} from 'react-native';
import {ANIMATIONS} from '~/assets';
import {AppIcon, AppInput} from '~/components/core';
import {IconProps} from '~/components/core/AppIcon';
import {useMutation} from '~/hooks';

type FormInput = {
  key: string;
  label: string;
  placeholder: string;
  icon: IconProps;
  rules: Object;
  inputProps?: IInputProps;
};

type FormData = {
  [key: string]: string;
};
export default function ForgotPassword(): JSX.Element {
  const toast = useToast();
  const {goBack, navigate} = useNavigation<any>();
  const {height} = useWindowDimensions();
  const {mutation, isLoading} = useMutation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();

  const handleSend = async ({username}: FormData) => {
    try {
      const res = await mutation('user/forgot-password', {
        method: 'PUT',
        isAlert: true,
        body: {
          email: username,
        },
      });
      console.log(res);
      if (res?.results?.success) {
        navigate('ResetPassword', {email: username});
      }
    } catch (error) {
      Alert(
        `${error instanceof Error ? error?.message : 'Something Went wrong'}`,
      );
    }
  };

  const formInputs: FormInput[] = useMemo(
    () => [
      {
        key: 'username',
        label: 'Email',
        placeholder: 'Enter registered email address',
        icon: {FeatherName: 'mail'},
        rules: {
          required: 'Email address is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        },
        inputProps: {keyboardType: 'email-address', autoCapitalize: 'none'},
      },
    ],
    [],
  );

  return (
    <>
      <Row w={'full'} bg={'white'} alignItems={'center'} p={5} space={5}>
        <Pressable onPress={() => goBack()}>
          <AppIcon
            IoniconsName={'arrow-back-circle-outline'}
            size={32}
            color={'black'}
          />
        </Pressable>
        <Heading justifyContent={'center'}>Forget Password</Heading>
      </Row>
      <ScrollView showsVerticalScrollIndicator={false} bg="white">
        <Center px="4">
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
            onPress={handleSubmit(handleSend)}
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
                  Send Otp
                </Text>
              </HStack>
            )}
          </Pressable>
          <Box alignItems="center" flexDirection="row">
            <Text color={'black'} fontSize="16" fontWeight="400" mr="2">
              Already have an account?
            </Text>
            <Link isUnderlined={false} onPress={goBack}>
              <Text
                color={'black'}
                fontSize="16"
                fontWeight="600"
                textDecorationLine={'underline'}>
                Sign in
              </Text>
            </Link>
          </Box>
        </Center>
      </ScrollView>
    </>
  );
}
