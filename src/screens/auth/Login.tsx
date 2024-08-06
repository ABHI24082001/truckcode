import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Box,
  Center,
  HStack,
  Heading,
  IInputProps,
  Image,
  Pressable,
  ScrollView,
  Text,
  useToast,
} from 'native-base';
import React, {useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Dimensions} from 'react-native';
import {useWindowDimensions} from 'react-native';
import {IMAGES} from '~/assets';
import {AppInput, Btn} from '~/components/core';
import AppIcon, {IconProps} from '~/components/core/AppIcon';
import {useAuth} from '~/hooks';
import {PublicRoutesTypes} from '~/routes';

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

export default function Login(): JSX.Element {
  const WIDTH = Dimensions.get('window').width;
  const {setUser} = useAuth();
  const toast = useToast();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const {navigate} =
    useNavigation<NativeStackNavigationProp<PublicRoutesTypes>>();
  const {height} = useWindowDimensions();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();

 const handleLogin = async ({username, password}: FormData) => {
   const defaultEmail = 'demo@gmail.com';
   const defaultPassword = '12345678';

   try {
     if (username === defaultEmail && password === defaultPassword) {
       toast.show({
         title: 'Login Successful!',
         duration: 5000,
       });
       setUser({
         email: username,
         password: password,
       });
       console.log(username, password);
     } else {
       toast.show({
         title: 'Login Failed',
         duration: 5000,
       });
     }
   } catch (error) {
     console.log(error);
   }
 };


  const formInputs: FormInput[] = useMemo(
    () => [
      {
        key: 'username',
        label: 'Email',
        placeholder: 'Username',
        icon: {FeatherName: 'mail'},
        rules: {
          required: 'Username is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        },
        inputProps: {keyboardType: 'email-address', autoCapitalize: 'none'},
      },
      {
        key: 'password',
        label: 'Password',
        placeholder: 'Password',
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
          rightElement: (
            <Btn
              colors={['#fff', '#fff']}
              _text={{color: 'black', fontSize: 'xs'}}
              onPress={() => setSecureTextEntry(!secureTextEntry)}>
              {secureTextEntry ? (
                <AppIcon IoniconsName="eye-off" size={20} />
              ) : (
                <AppIcon IoniconsName="eye" size={20} />
              )}
            </Btn>
          ),
        },
      },
    ],
    [secureTextEntry],
  );

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} bg="white">
        <Center h={height} px="4">
          <Image
            source={IMAGES.LOGO3}
            resizeMode={'contain'}
            w={'full'}
            h="40"
            alt="Logo"
            my="2"
          />
          {formInputs.map(input => (
            <AppInput
              input={input}
              key={input.key}
              control={control}
              errorMessage={errors?.[input?.key]?.message}
            />
          ))}
          <Box w="full">
            <Btn
              colors={['#fff', '#fff']}
              _text={{color: 'black', fontSize: 'sm'}}
              alignSelf={'flex-end'}
              onPress={() => navigate('ForgotPassword')}>
              Forgot Password?
            </Btn>
          </Box>
          <Btn
            w={WIDTH * 0.91}
            colors={['primary.500', 'lightBlue.600']}
            onPress={handleSubmit(handleLogin)}
            my="4"
            icon={{FeatherName: 'log-in'}}>
            Login
          </Btn>

          {/* <Box w="full" justifyContent={'center'} alignItems={'center'}>
            <Text fontSize={14}>Sign UP as</Text>

            <HStack space={2} alignItems={'center'} justifyContent={'center'}>
              <Pressable
                onPress={() => navigate('Register')}
                _pressed={{opacity: 0.5}}>
                <Heading color={'blue.500'} fontSize={12} underline>
                  {' '}
                  Distributor
                </Heading>
              </Pressable>
              <Text fontSize={15}>Or</Text>
              <Pressable
                onPress={() => navigate('CrRegister')}
                _pressed={{opacity: 0.5}}>
                <Heading color={'blue.500'} fontSize={12} underline>
                  Company Representative
                </Heading>
              </Pressable>
            </HStack>
          </Box> */}
        </Center>
      </ScrollView>
    </>
  );
}
