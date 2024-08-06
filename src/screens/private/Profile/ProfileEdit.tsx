import {useNavigation} from '@react-navigation/native';
import {
  Alert,
  Box,
  Center,
  HStack,
  IInputProps,
  Image,
  Pressable,
  ScrollView,
  Spinner,
  Text,
} from 'native-base';
import React, {useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import ImageCropPicker from 'react-native-image-crop-picker';
import {PrivateContainer} from '~/components/containers';
import {AppInput, Btn} from '~/components/core';
import {IconProps} from '~/components/core/AppIcon';
import {useAuth, useMutation} from '~/hooks';
import {screenHeight, screenWidth} from '~/styles';
type FormValues = {
  name: string;
  phone: string;
  username: string;
};
type FormInput = {
  key: keyof FormValues;
  label: string;
  placeholder: string;
  icon: IconProps;
  rules?: Object;
  inputProps?: IInputProps;
};
type FormData = {
  [key: string]: string;
};
export default function ProfileEdit(): JSX.Element {
  const {user, getUser} = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const {mutation, isLoading} = useMutation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    defaultValues: {
      name: user?.name || '',
      username: user?.email || '',
      phone: user?.phone || '',
    },
  });
  const {navigate} = useNavigation<any>();
  const handleEditProfile = async (data: FormData) => {
    try {
      const res = await mutation(`user/${user?.id}`, {
        method: 'PUT',
        isAlert: true,
        body: {
          name: data.name,
          phone: data.phone,
          email: data.username,
        },
      });
      if (res?.results?.success) {
        navigate('Profile');
        getUser();
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
        key: 'name',
        label: 'Name',
        placeholder: 'Enter your full name',
        icon: {AntDesignName: 'user'},
        inputProps: {autoCapitalize: 'none', marginBottom: '2'},
      },
      {
        key: 'phone',
        label: 'Mobile Number',
        placeholder: 'Enter your mobile number',
        icon: {AntDesignName: 'phone'},
        inputProps: {
          keyboardType: 'phone-pad',
          autoCapitalize: 'none',
          marginBottom: '2',
        },
      },
      {
        key: 'username',
        label: 'Email',
        placeholder: 'Username',
        icon: {FeatherName: 'mail'},
        inputProps: {
          keyboardType: 'email-address',
          autoCapitalize: 'none',
          marginBottom: '2',
          isDisabled: true,
          isReadOnly: true,
        },
      },
    ],
    [],
  );
  const pickImage = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
      });
      setSelectedImage(`data:${image.mime};base64,${image.data}`);
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };
  return (
    <PrivateContainer title="Edit Profile" flex={1}>
      <Box flex={1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box
            borderBottomRadius={50}
            h={screenHeight / 3}
            justifyContent={'center'}
            alignItems={'center'}
            overflow={'hidden'}>
            <Pressable
              onPress={pickImage}
              borderRadius={'full'}
              size={200}
              alignItems={'center'}
              justifyContent={'center'}>
              {selectedImage ? (
                <Image
                  source={{uri: selectedImage}}
                  borderRadius={'full'}
                  size={150}
                  resizeMode="contain"
                  alt="image not found"
                />
              ) : (
                <Image
                  source={{
                    uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                  }}
                  borderRadius={'full'}
                  size={150}
                  resizeMode="contain"
                  alt="image not found"
                />
              )}
            </Pressable>
          </Box>
          <Center flexGrow={1} p={screenWidth * 0.04} w="full">
            {formInputs.map(input => (
              <AppInput
                input={input}
                key={input.key}
                control={control}
                errorMessage={errors?.[input?.key]?.message}
              />
            ))}
          </Center>
        </ScrollView>
        <Box p="3">
          <Btn bg={'black'} onPress={handleSubmit(handleEditProfile)}>
            {isLoading ? (
              <HStack space={2} py={0.4}>
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
              <Text fontWeight="600" color={'white'} py={1}>
                Update
              </Text>
            )}
          </Btn>
        </Box>
      </Box>
    </PrivateContainer>
  );
}
