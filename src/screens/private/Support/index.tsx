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
  Actionsheet,
  Pressable,
  useDisclose,
  VStack,
} from 'native-base';
import React, {useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {ANIMATIONS} from '~/assets';
import {PrivateContainer} from '~/components/containers';
import {AppInput, Btn} from '~/components/core';
import AppIcon from '~/components/core/AppIcon';
import {useMutation} from '~/hooks';
import {StackAndTabType} from '~/routes/private/types';
import {screenWidth} from '~/styles';

type FormValues = {
  slipNumber: string;
  quantity: string;
  fuelRate: string;
  amount: string;
  remarks: string;
  pumpName: string;
  fuelType: string;
};

type FormInput = {
  key: keyof FormValues;
  label: string;
  placeholder: string;
  icon?: string;
  rules: Object;
  inputProps?: IInputProps;
};

type FormData = {
  slipNumber: string;
  quantity: string;
  fuelRate: string;
  amount: string;
  remarks: string;
  pumpName: string;
  fuelType: string;
};

const Support = ({route: {params}}: any) => {
  const {goBack, navigate} = useNavigation<StackAndTabType>();
  const {mutation, isLoading} = useMutation();

  // Separate disclose hooks for Pump and Fuel
  const pumpDisclose = useDisclose();
  const fuelDisclose = useDisclose();

  const [selectPumpName, setSelectPumpName] = useState('');
  const [selectFuelName, setSelectFuelName] = useState('');

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<FormData>();

  const formInputs: FormInput[] = useMemo(() => {
    return [
      {
        key: 'slipNumber',
        label: 'Slip Number *',
        placeholder: 'Enter Slip Number',
        rules: {
          required: 'Slip Number is required',
        },
      },
      {
        key: 'quantity',
        label: 'Quantity *',
        placeholder: '0.00',
        rules: {
          required: 'Quantity is required',
        },
      },
      {
        key: 'fuelRate',
        label: 'Fuel Rate *',
        placeholder: '0.00',
        rules: {
          required: 'Fuel Rate is required',
        },
      },
      {
        key: 'amount',
        label: 'Amount *',
        placeholder: '0.00',
        rules: {
          required: 'Amount is required',
        },
      },
      {
        key: 'remarks',
        label: 'Remarks *',
        placeholder: 'Enter Remarks',
        rules: {
          required: 'Remark is required',
        },
      },
      {
        key: 'pumpName',
        label: 'Pump Name *',
        placeholder: 'Select Pump Name',
        rules: {
          required: 'Pump Name is required',
        },
      },
      {
        key: 'fuelType',
        label: 'Fuel Type *',
        placeholder: 'Select Fuel Type',
        rules: {
          required: 'Fuel Type is required',
        },
      },
    ];
  }, []);

  const handleSupport = async (data: FormData) => {
    try {
      console.log('Form Data:', {
        ...data,
        pumpName: selectPumpName,
        fuelType: selectFuelName,
      });

      const res = await mutation('support', {
        isAlert: true,
        body: {
          ...data,
          pumpName: selectPumpName,
          fuelType: selectFuelName,
        },
      });

      if (res?.results?.success) {
        navigate('AllSupport');
        params?.mutate();
      }
    } catch (error) {
      Alert(
        `${error instanceof Error ? error?.message : 'Something went wrong'}`,
      );
    }
  };

  const SelectPump = [
    {id: '1', label: 'Hindustan'},
    {id: '2', label: 'Indian'},
  ];

  const SelectFuel = [
    {id: '1', label: 'Diesel'},
    {id: '2', label: 'Natural gas'},
  ];

  return (
    <PrivateContainer title="Fuel Type " flex={1} bg="white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        h="100%"
        flex={1}     
        px={screenWidth * 0.04}
        py={screenWidth * 0.05}>
        <Center flexGrow={1} h="100%" w="full">
          <Box size="250" alignSelf="center">
            <AnimatedLottieView source={ANIMATIONS.Login} autoPlay loop />
          </Box>

          <VStack space={3} w="full" mt={4}>
            <Text fontSize="16" mb={1}>
              Select Pump Name
            </Text>
            <Pressable onPress={pumpDisclose.onOpen}>
              <HStack
                borderWidth={1}
                borderColor="#dedede"
                padding={3}
                borderRadius={10}
                bgColor="#fff"
                alignItems="center"
                justifyContent="space-between">
                <Text>{selectPumpName || 'Select an Option'}</Text>
                <AppIcon AntDesignName="down" />
              </HStack>
            </Pressable>
          </VStack>

          <Actionsheet
            isOpen={pumpDisclose.isOpen}
            onClose={pumpDisclose.onClose}>
            <Actionsheet.Content>
              {SelectPump.map(option => (
                <Actionsheet.Item
                  key={option.id}
                  onPress={() => {
                    setSelectPumpName(option.label);
                    pumpDisclose.onClose();
                  }}>
                  {option.label}
                </Actionsheet.Item>
              ))}
            </Actionsheet.Content>
          </Actionsheet>

          <VStack space={3} w="full" mt={4}>
            <Text fontSize="16" mb={1}>
              Select Fuel Type
            </Text>
            <Pressable onPress={fuelDisclose.onOpen}>
              <HStack
                borderWidth={1}
                borderColor="#dedede"
                padding={3}
                borderRadius={10}
                bgColor="#fff"
                alignItems="center"
                justifyContent="space-between">
                <Text>{selectFuelName || 'Select an Option'}</Text>
                <AppIcon AntDesignName="down" />
              </HStack>
            </Pressable>
          </VStack>

          <Actionsheet
            isOpen={fuelDisclose.isOpen}
            onClose={fuelDisclose.onClose}>
            <Actionsheet.Content>
              {SelectFuel.map(option => (
                <Actionsheet.Item
                  key={option.id}
                  onPress={() => {
                    setSelectFuelName(option.label);
                    fuelDisclose.onClose();
                  }}>
                  {option.label}
                </Actionsheet.Item>
              ))}
            </Actionsheet.Content>
          </Actionsheet>

          {formInputs.map(input => (
            <AppInput
              key={input.key}
              input={input}
              control={control}
              errorMessage={errors?.[input?.key]?.message}
            />
          ))}

          <Box mb={20}>
            <Btn
              py={1}
              my={3}
              alignItems="center"
              w="full"
              bg="black"
              px={1}
              onPress={handleSubmit(handleSupport)}>
              {isLoading ? (
                <HStack space={2} py={2}>
                  <Spinner alignSelf="center" size="sm" color="white" />
                  <Text
                    color="white"
                    fontSize="18"
                    fontFamily="Montserrat-SemiBold"
                    textAlign="center">
                    Loading...
                  </Text>
                </HStack>
              ) : (
                <HStack alignItems="center">
                  <Text fontSize={18} mr="auto" bold color="white" py={3}>
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
