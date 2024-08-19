import {useNavigation} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import {
  Actionsheet,
  Avatar,
  Box,
  Button,
  FormControl,
  HStack,
  Heading,
  IInputProps,
  Input,
  Modal,
  Pressable,
  Radio,
  Row,
  ScrollView,
  Text,
  TextArea,
  VStack,
  useDisclose,
} from 'native-base';
import React, {useMemo, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import { ANIMATIONS } from '~/assets';
import { PrivateContainer } from '~/components/containers';
import {AppIcon} from '~/components/core';
import {useSwrApi} from '~/hooks';
import {StackAndTabType} from '~/routes/private/types';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function OrderDetailDistributor({route: {params}}: any) {
  const [showModal, setShowModal] = React.useState(false);
  const {data} = useSwrApi(`order/${params?.id}`);
  const result = data?.data?.data;

  const arr: any = [];
  result?.orderedItems?.map((item: any) => arr.push(item?.quantity));
  const totalQuantity = arr.reduce(
    (accumulator: number, currentValue: number) => accumulator + currentValue,
    0,
  );
  const date = new Date();

  const [cancel, setCancel] = React.useState('');
  const {isOpen, onOpen, onClose} = useDisclose();
  const [selectedOption, setSelectedOption] = useState('');
  const {navigate, goBack} = useNavigation<StackAndTabType>();

  const handleCancelChange = (nextValue: string) => {
    setCancel(nextValue);

    if (nextValue === 'other') {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormData>();

  type FormInput = {
    key: string;
    label?: string;
    placeholder?: any;
    rules?: Object;
    inputProps?: IInputProps;
  };

  type FormData = {
    [key: string]: string;
  };

 const Create_Employee_Inputs: FormInput[] = useMemo(
   () => [
     {
       label: 'Owner Name  *',
       key: 'ownerName',
       placeholder: 'Owner Name ',
       rules: {
         required: 'Owner Name is required',
         pattern: {
           message: 'Invalid Owner Name ',
         },
       },
       inputProps: {},
     },
     {
       label: 'Challan No /LR No *',
       key: 'challanNo',
       placeholder: 'Enter Challan No ',
       rules: {
         required: 'Challan no is required',
         pattern: {
           message: 'Invalid Challan no ',
         },
       },
       inputProps: {},
     },
     {
       label: 'Do Number  *',
       key: 'doNumber',
       placeholder: 'Select do Number ',
       rules: {
         required: 'Select do number is required',
         pattern: {
           message: 'Invalid Do Number ',
         },
       },
       inputProps: {},
     },
     {
       label: 'Work Order  *',
       key: 'workOrder',
       placeholder: 'Work order ',
       rules: {
         required: 'Select work order is required',
         pattern: {
           message: 'Invalid Work Order',
         },
       },
       inputProps: {},
     },
     {
       label: 'Client Name  *',
       key: 'clientName',
       placeholder: 'Client Name ',
       rules: {
         required: 'Client Name is required',
         pattern: {
           message: 'Invalid Client Name',
         },
       },
       inputProps: {},
     },
     {
       label: 'Source Name  *',
       key: 'sourceName',
       placeholder: 'Source Name ',
       rules: {
         required: 'Source Name is required',
         pattern: {
           message: 'Invalid Source Name',
         },
       },
       inputProps: {},
     },
     {
       label: 'Destination Name  *',
       key: 'destinationName',
       placeholder: 'Destination Name ',
       rules: {
         required: 'Destination Name is required',
         pattern: {
           message: 'Invalid Destination Name',
         },
       },
       inputProps: {},
     },
     {
       label: 'Material Name  *',
       key: 'materialName',
       placeholder: 'Material Name ',
       rules: {
         required: 'Material Name is required',
         pattern: {
           message: 'Invalid Material Name',
         },
       },
       inputProps: {},
     },
     {
       label: 'Net WT  *',
       key: 'netWt',
       placeholder: 'Net Wt ',
       rules: {
         required: 'Net Wt is required',
         pattern: {
           message: 'Invalid Net Wt',
         },
       },
       inputProps: {},
     },
   ],
   [],
 );

  const SelectVehicle = [
    {id: '1', label: 'KA-03-HA-1985'},
    {id: '2', label: 'AP-29-BH-8545'},
  ];

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
    console.log('Selected Vehicle:', selectedOption);
  };

      const [selectedDate, setSelectedDate] = useState();
      const [datePickerVisible, setDatePickerVisible] = useState(false);

      const [showError, setShowError] = useState(false);
      const showDatePicker = () => {
        setDatePickerVisible(true);
      };

      const hideDatePicker = () => {
        setDatePickerVisible(false);
      };

      const handleConfirm = (date: any) => {
        setSelectedDate(date);
        hideDatePicker();
      };

  return (
    <>
      <PrivateContainer title="Loading Details " flex={1} bg="white">
        <ScrollView>
          <Box size="250" alignSelf="center" my={3}>
            <AnimatedLottieView source={ANIMATIONS.order} autoPlay loop />
          </Box>

          <Text mx={2} fontFamily={'Helvetica'} fontSize={'md'} color={'#000'}>
            Load Date
          </Text>

          <Box maxW="100%" w={400}>
            <Pressable onPress={showDatePicker}>
              <Box
                ml={4}
                borderRadius={6}
                bgColor={'#fff'}
                borderWidth={'1'}
                borderColor={'#c7c7c7'}
                my={2}
                p={2}
                py={3}>
                <HStack alignItems={'center'}>
                  <AppIcon AntDesignName="calendar" color={'gray'} />
                  <Text
                    fontSize={15}
                    pl={4}
                    color={'gray.500'}
                    opacity={0.8}
                    fontFamily={'Monstera-Regular'}>
                    {selectedDate
                      ? new Date(selectedDate).toLocaleDateString()
                      : 'Select date of birth'}
                  </Text>
                </HStack>
              </Box>
            </Pressable>
            {showError && (
              <Text bold color={'red.500'}>
                * Please select date of birth
              </Text>
            )}
          </Box>

          <Text mx={2} fontFamily={'Helvetica'} fontSize={'md'} color={'#000'}>
            Select Vehicle Number
          </Text>

          <Pressable onPress={onOpen}>
            <HStack
              my={2}
              borderWidth={1}
              borderColor={'#dedede'}
              padding={3}
              borderRadius={10}
              bgColor={'#fff'}
              mx={3}
              alignItems={'center'}
              justifyContent={'space-between'}>
              <Text>
                {selectedOption ? selectedOption : 'Select an Option'}
              </Text>
              <AppIcon AntDesignName="down" />
            </HStack>
          </Pressable>

          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
              {SelectVehicle.map(option => (
                <Actionsheet.Item
                  key={option.id}
                  onPress={() => {
                    setSelectedOption(option.label);
                    onClose();
                  }}>
                  {option.label}
                </Actionsheet.Item>
              ))}
            </Actionsheet.Content>
          </Actionsheet>

          <Box alignItems={'flex-start'}>
            {Create_Employee_Inputs.map(input => (
              <React.Fragment key={input.key}>
                <Controller
                  control={control}
                  name={input?.key}
                  rules={input.rules}
                  defaultValue=""
                  render={({field: {onBlur, onChange, value}}) => (
                    <>
                      <Text
                        mx={2}
                        fontFamily={'Helvetica'}
                        fontSize={'md'}
                        color={'#000'}>
                        {input?.label}
                      </Text>
                      <Input
                        mx={3}
                        my={'3'}
                        placeholder={input.placeholder}
                        placeholderTextColor={'#94a3b8'}
                        fontFamily={'Helvetica'}
                        focusOutlineColor={'amber.900'}
                        backgroundColor={'#ffff'}
                        fontSize={15}
                        color="#000"
                        variant={'outline'}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        isInvalid={Boolean(errors[input.key])}
                        {...input?.inputProps}
                      />
                    </>
                  )}
                />
                {errors[input.key] && (
                  <Text
                    my={'2'}
                    mx={'2'}
                    fontSize="xs"
                    color="red.600"
                    fontFamily={'Helvetica'}
                    alignSelf="flex-start">
                    {errors?.[input?.key]?.message}
                  </Text>
                )}
              </React.Fragment>
            ))}
          </Box>

          <Button
            mx={5}
            my={5}
            bgColor={'#000'}
            onPress={handleSubmit(onSubmit)}>
            Submit
          </Button>

          <DateTimePickerModal
            date={selectedDate}
            isVisible={datePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </ScrollView>
      </PrivateContainer>
    </>
  );
}
