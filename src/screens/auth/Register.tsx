import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AnimatedLottieView from 'lottie-react-native';
import {
  Alert,
  AlertDialog,
  Box,
  Center,
  HStack,
  Heading,
  IInputProps,
  Image,
  Pressable,
  Radio,
  ScrollView,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
} from 'native-base';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Dimensions} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {ANIMATIONS} from '~/assets';
import {AppInput, Btn, CountryPicker, Manufacturer} from '~/components/core';
import AppIcon, {IconProps} from '~/components/core/AppIcon';
import {useMutation, useSwrApi} from '~/hooks';
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

type PickerItem = {
  id: number;
  name: string;
};

export default function Register(): JSX.Element {
  const {data} = useSwrApi('user?role=MANUFACTURER');
  const result = data?.data?.data;
  const HEIGHT = Dimensions.get('window').height;
  const WIDTH = Dimensions.get('window').width;
  const {mutation, isLoading} = useMutation();
  const [selectedManufactures, setSelectedManufactures] = useState<any[]>([]);
  const [manufactureVisible, setManufactureVisible] = useState(false);

  const [isManufacturePickerOpen, setIsManufacturePickerOpen] = useState(false);

  const manufacture: any = [];
  result?.map((item: any, index: number) =>
    manufacture.push({id: item?.id, name: `Manufacturer${index}`}),
  );
  const [selectedTab, setSelectedTab] = useState<
    'distributor' | 'representative'
  >('distributor');
  const handleRemoveManufacture = (manufactureId: any) => {
    setSelectedManufactures(prevManufactures => {
      const updatedManufactures = prevManufactures.filter(
        manufacture => manufacture.id !== manufactureId,
      );

      // Console log the selected categories after removal
      return updatedManufactures;
    });
  };
  const [selectedDate, setSelectedDate] = useState();
  const selectedManufacturesIds: string[] = [];
  selectedManufactures.map(item => selectedManufacturesIds.push(item.id));
  const handleRegistration = async (data: FormData) => {
    try {
      const res = await mutation(
        `user/add-distributor-cr?isDistributor=${
          selectedTab === 'distributor' ? true : false
        }`,
        {
          isAlert: true,
          body: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            manufacturerIds: selectedManufacturesIds,
            storeAddress: data.address,
            password: data.password,
          },
        },
      );
      if (res?.results?.success) {
        navigate('Login');
      }
      console.log('resss---', res);
    } catch (error) {
      Alert(
        `${error instanceof Error ? error?.message : 'Something Went wrong'}`,
      );
    }
  };
  const handleCrRegistration = async (data: FormData) => {
    try {
      const res = await mutation('user/add-distributor-cr', {
        isAlert: true,
        body: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          manufacturerIds: data.ManufacturerId,
          dob: selectedDate,
          empId: data.EmployeeId,
        },
      });
      if (res?.results?.success) {
        navigate('Login');
      }
      console.log('resss---', res);
    } catch (error) {
      Alert(
        `${error instanceof Error ? error?.message : 'Something Went wrong'}`,
      );
    }
  };
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

  const handleTabChange = (tab: 'distributor' | 'representative') => {
    setSelectedTab(tab);
  };

  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [categoryPickerVisible, setCategoryPickerVisible] = useState(false);

  const [selectedItem, setSelectedItem] = useState<PickerItem | null>(null);
  const [isCategoryPickerOpen, setIsCategoryPickerOpen] = useState(false);

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
  const handleSelect = (item: PickerItem) => {
    const isAlreadySelected = selectedManufactures.some(
      manufacture => manufacture.id === item.id,
    );
    if (!isAlreadySelected) {
      const newManufacture = {
        id: item.id,
        name: item.name,
      };
      setSelectedManufactures([...selectedManufactures, newManufacture]);
    }
    setManufactureVisible(false);
  };
  const toast = useToast();
  const [visible, setVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: 'IN',
    name: 'India',
    phone: '91',
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry1, setSecureTextEntry1] = useState(true);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();
  const {navigate} =
    useNavigation<NativeStackNavigationProp<PublicRoutesTypes>>();

  const bg = useColorModeValue('black', 'white');

  const handleRemoveCategory = (categoryId: any) => {
    setSelectedCategories(prevCategories => {
      const updatedCategories = prevCategories.filter(
        category => category.id !== categoryId,
      );
      console.log('Selected Categories:', updatedCategories);
      return updatedCategories;
    });
  };
  const renderInputFields = () => {
    if (selectedTab === 'distributor') {
      return (
        <>
          {[
            {
              key: 'name',
              label: 'Name',
              placeholder: 'Enter your full name',
              icon: {AntDesignName: 'user'},
              rules: {
                required: 'Fullname is required',
              },
              inputProps: {autoCapitalize: 'none', marginBottom: '2'},
            },
            {
              key: 'phone',
              label: 'Mobile number',
              placeholder: 'Enter your mobile number',
              icon: {IoniconsName: 'call', color: 'gray'},
              rules: {
                required: 'Mobile number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Invalid mobile number',
                },
              },
              inputProps: {
                keyboardType: 'numeric',
                autoCapitalize: 'none',
                variant: 'underlined',
                bg: 'white',
              },
            },
            {
              key: 'email',
              label: 'Email',
              placeholder: 'Enter Email',
              icon: {FeatherName: 'mail'},
              rules: {
                required: 'Username is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              },
              inputProps: {
                keyboardType: 'email-address',
                autoCapitalize: 'none',
                marginBottom: '2',
              },
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
                    bg={'transparent'}
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
            {
              key: 'confirmPassword',
              label: 'Confirm Password',
              placeholder: 'Confirm Password',
              icon: {FeatherName: 'lock'},
              rules: {
                required: 'Confirm Password is required',
                validate: {
                  matchesPassword: (value: any, {password}: any) => {
                    return value === password || 'Passwords do not match';
                  },
                },
              },
              inputProps: {
                secureTextEntry,
                rightElement: (
                  <Btn
                    bg={'transparent'}
                    colors={['#fff', '#fff']}
                    _text={{color: 'black', fontSize: 'xs'}}
                    onPress={() => setSecureTextEntry1(!secureTextEntry1)}>
                    {secureTextEntry1 ? (
                      <AppIcon IoniconsName="eye-off" size={20} />
                    ) : (
                      <AppIcon IoniconsName="eye" size={20} />
                    )}
                  </Btn>
                ),
              },
            },
            {
              key: 'gst',
              label: 'GSTID',
              placeholder: 'Enter GSTIN',
              icon: {MaterialCommunityIconsName: 'numeric'},
              rules: {
                required: 'GSTIN is required',
                pattern: {
                  value:
                    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{2}[0-9]{1}$/,
                  message: 'Invalid GST number',
                },
              },
              inputProps: {autoCapitalize: 'none'},
            },
            {
              key: 'address',
              label: 'Address',
              placeholder: 'Enter your Address',
              icon: {IoniconsName: 'location-outline'},
              rules: {
                required: 'Address is required',
              },
              inputProps: {
                autoCapitalize: 'none',
                marginBottom: '2',
              },
            },
          ].map(input => (
            <AppInput
              input={input}
              key={input.key}
              control={control}
              errorMessage={errors?.[input?.key]?.message}
              leftElement={
                input.key === 'phone' ? (
                  <Pressable onPress={() => setVisible(true)}>
                    <HStack alignItems="center" space={2}>
                      <Image
                        source={{
                          uri: `https://flagcdn.com/w160/${selectedCountry.code.toLocaleLowerCase()}.webp`,
                        }}
                        alt="IN"
                        h={5}
                        w={8}
                        key="1"
                        alignSelf="center"
                        resizeMode="contain"
                        borderRadius={2}
                      />
                      <AppIcon
                        AntDesignName="caretdown"
                        color={'#000'}
                        size={10}
                      />
                    </HStack>
                  </Pressable>
                ) : undefined
              }
            />
          ))}

          <Box>
            <Text
              fontSize={15}
              fontFamily={'Monstera-Regular'}
              mb={2}
              mt={2}
              opacity={0.8}>
              Manufacturer
            </Text>

            <Box maxW="100%">
              <Pressable
                onPress={() => setManufactureVisible(true)}
                bg="white"
                borderRadius={4}
                p={3}
                px={4}
                minW={'100%'}
                borderColor={'gray'}
                borderWidth={0.4}>
                <HStack justifyContent={'space-between'}>
                  <HStack space={5}>
                    <AppIcon
                      FontAwesomeName="building-o"
                      size={20}
                      color={'gray'}
                    />
                    <Text fontSize={13} color={'grey'} opacity={0.8}>
                      Choose manufacturer
                    </Text>
                  </HStack>
                  <AppIcon OcticonsName="chevron-down" size={20} />
                </HStack>
              </Pressable>
            </Box>
            {selectedManufactures?.length > 0 && (
              <Heading
                textAlign={'center'}
                mt={3}
                mb={3}
                fontSize={14}
                color={'success.600'}>
                Selected Manufacturers
              </Heading>
            )}
            <Box>
              <Box
                flexDirection={'row'}
                flexWrap="wrap"
                maxW="100%"
                p={1}
                borderRadius={8}>
                {selectedManufactures.map((manufacture, index) => (
                  <Box
                    key={index}
                    flexDirection={'row'}
                    alignItems={'center'}
                    bg={'white'}
                    m={1}
                    p={1}
                    borderWidth={0.5}
                    borderRadius={8}>
                    <HStack space={2}>
                      <Text ml={2} fontSize={'xs'}>
                        {manufacture.name}
                      </Text>
                      <Pressable
                        onPress={() => handleRemoveManufacture(manufacture.id)}>
                        <AppIcon
                          EntypoName="circle-with-cross"
                          size={20}
                          key={manufacture.id}
                          color={'gray'}
                        />
                      </Pressable>
                    </HStack>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </>
      );
    } else if (selectedTab === 'representative') {
      return (
        <>
          {[
            {
              key: 'name',
              label: 'Name',
              placeholder: 'Enter your full name',
              icon: {AntDesignName: 'user'},
              rules: {
                required: 'Fullname is required',
              },
              inputProps: {autoCapitalize: 'none', marginBottom: '2'},
            },
            {
              key: 'phone',
              label: 'Mobile number',
              placeholder: 'Enter your mobile number',
              icon: {IoniconsName: 'call', color: 'gray'},
              rules: {
                required: 'Mobile number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Invalid mobile number',
                },
              },
              inputProps: {
                keyboardType: 'numeric',
                autoCapitalize: 'none',
                variant: 'underlined',
                bg: 'white',
              },
            },
            {
              key: 'email',
              label: 'Email',
              placeholder: 'Enter Email',
              icon: {FeatherName: 'mail'},
              rules: {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              },
              inputProps: {
                keyboardType: 'email-address',
                autoCapitalize: 'none',
                marginBottom: '2',
              },
            },
            {
              key: 'EmployeeId',
              label: 'Employee Id',
              placeholder: 'Enter Employee Id',
              icon: {AntDesignName: 'user'},
              rules: {
                required: 'Employee Id is required',
                // pattern: {
                //     value: /^[0-9]{10}$/,
                //     message: 'Invalid Employee Id',
                // },
              },
              inputProps: {autoCapitalize: 'none', marginBottom: '2'},
            },
            {
              key: 'ManufacturerId',
              label: 'Manufacturer Id',
              placeholder: 'Enter Manufacturer Id',
              icon: {FontAwesomeName: 'building-o'},
              rules: {
                required: 'Manufacturer Id is required',
              },
              inputProps: {autoCapitalize: 'none', marginBottom: '2'},
            },
          ].map(input => (
            <AppInput
              input={input}
              key={input.key}
              control={control}
              errorMessage={errors?.[input?.key]?.message}
              leftElement={
                input.key === 'phone' ? (
                  <Pressable onPress={() => setVisible(true)}>
                    <HStack alignItems="center" space={2}>
                      <Image
                        source={{
                          uri: `https://flagcdn.com/w160/${selectedCountry.code.toLocaleLowerCase()}.webp`,
                        }}
                        alt="IN"
                        h={5}
                        w={8}
                        key="1"
                        alignSelf="center"
                        resizeMode="contain"
                        borderRadius={2}
                      />
                      <AppIcon
                        AntDesignName="caretdown"
                        color={'#000'}
                        size={10}
                      />
                    </HStack>
                  </Pressable>
                ) : undefined
              }
            />
          ))}

          <Box mb={8}>
            <Text
              fontSize={15}
              fontFamily={'Monstera-Regular'}
              mb={2}
              mt={2}
              opacity={0.8}>
              Date of birth
            </Text>

            <Box maxW="100%" w={WIDTH}>
              <Pressable onPress={showDatePicker}>
                <Box
                  borderBottomWidth={1}
                  borderRadius={2}
                  borderColor={'coolGray.300'}
                  p={1}
                  py={2}>
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
          </Box>

          <DateTimePickerModal
            date={selectedDate}
            isVisible={datePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </>
      );
    }

    return null;
  };

  const handleRoleChange = (tab: 'distributor' | 'representative') => {
    handleTabChange(tab);
  };
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bg="white"
        _dark={{bg: 'dark.100'}}>
        <Center flexGrow={1} px="5" w="full" mt={2} mb={5}>
          <Heading color={'gray.600'} m={5}>
            Choose type
          </Heading>
          <Radio.Group
            name="role"
            value={selectedTab}
            onChange={value =>
              handleRoleChange(value as 'distributor' | 'representative')
            }>
            <HStack space={5}>
              <Radio my={1} value="distributor">
                <Text>Distributor</Text>
              </Radio>
              <Radio my={1} value="representative">
                <Text>Company Representative</Text>
              </Radio>
            </HStack>
          </Radio.Group>

          {renderInputFields()}

          <Btn
            w={WIDTH * 0.9}
            h={10}
            shadow={1}
            bg={'black'}
            onPress={
              selectedTab === 'distributor'
                ? handleSubmit(handleRegistration)
                : handleSubmit(handleCrRegistration)
            }
            // onPress={() => {
            //   if (selectedManufactures.length === 0) {
            //     toast.show({
            //       title: 'Please select a manufacturer',
            //       duration: 3000,
            //       background: 'red.600',
            //     });
            //   } else {
            //     handleSubmit(handleRegistration);
            //   }
            // }}
            mt={5}>
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
              <Heading size={'md'} color={'white'}>
                Sign up
              </Heading>
            )}
          </Btn>

          <Box alignItems="center" w="100%" mt={5}>
            <Box alignItems="center" flexDirection="row">
              <Text color={bg} fontSize="16" fontWeight="400">
                Already have an account?
              </Text>
              <Btn
                colors={['#fff', '#fff']}
                _text={{color: 'black', fontSize: 'sm'}}
                onPress={() => navigate('Login')}>
                <Heading size={'xs'} underline>
                  Login
                </Heading>
              </Btn>
            </Box>
          </Box>
        </Center>
      </ScrollView>

      <CountryPicker
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onSelect={(country: any) => {
          setSelectedCountry(country);
          setVisible(false);
        }}
      />

      <Manufacturer
        visible={manufactureVisible}
        data={manufacture}
        onSelect={handleSelect}
        onClose={() => setManufactureVisible(false)}
        selected={selectedItem}
        placeholder="Search..."
        title="Choose manufacturer"
      />

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <Box
            bg={'white'}
            h={HEIGHT / 3}
            alignItems={'center'}
            justifyContent={'center'}>
            <AnimatedLottieView
              source={ANIMATIONS.success}
              autoPlay
              loop={true}
            />
          </Box>
          <Heading mb={8} textAlign={'center'} color={'success.700'}>
            Registration Complete{' '}
          </Heading>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
}
