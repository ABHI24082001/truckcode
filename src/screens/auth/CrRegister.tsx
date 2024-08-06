import React, { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
    AlertDialog,
    Box,
    Center,
    HStack,
    Heading,
    IInputProps,
    Image,
    Pressable,
    ScrollView,
    Text,
    useColorModeValue,
    useToast,
} from 'native-base';
import { useForm } from 'react-hook-form';
import { AppInput, Btn, CountryPicker, Manufacturer } from '~/components/core';
import AppIcon, { IconProps } from '~/components/core/AppIcon';
import { PublicRoutesTypes } from '~/routes';
import AnimatedLottieView from 'lottie-react-native';
import { ANIMATIONS, IMAGES } from '~/assets';
import { Dimensions } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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

    const HEIGHT = Dimensions.get('window').height;
    const WIDTH = Dimensions.get('window').width;


    const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
    const [categoryPickerVisible, setCategoryPickerVisible] = useState(false);

    const [selectedItem, setSelectedItem] = useState<PickerItem | null>(null);
    const [isCategoryPickerOpen, setIsCategoryPickerOpen] = useState(false);

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


    const category = [
        { id: 175675, name: 'Manufacturer 1' },
        { id: 256488, name: 'Manufacturer 2' },
        { id: 38768768, name: 'Manufacturer 3' },
        { id: 487786, name: 'Manufacturer 4' },

    ];

    const openCategoryModal = () => {
        setIsCategoryPickerOpen(true);
    };

    const handleClose = () => {
        setCategoryPickerVisible(false);
    };

    const handleSelect = (item: PickerItem) => {
        // Check if the item is already in the selectedCategories array
        const isAlreadySelected = selectedCategories.some((category) => category.id === item.id);

        if (!isAlreadySelected) {

            const newCategory = {
                id: item.id,
                name: item.name,
            };

            setSelectedCategories([...selectedCategories, newCategory]);
        }

        setCategoryPickerVisible(false);
    };



    const toast = useToast();

    const [visible, setVisible] = useState(false);

    const [selectedCountry, setSelectedCountry] = useState({
        code: 'IN',
        name: 'India',
        phone: '91',
    });


    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const { navigate } =
        useNavigation<NativeStackNavigationProp<PublicRoutesTypes>>();

    const bg = useColorModeValue('black', 'white');

    const handleRemoveCategory = (categoryId: any) => {
        setSelectedCategories(prevCategories => {
            const updatedCategories = prevCategories.filter(category => category.id !== categoryId);

            // Console log the selected categories after removal
            console.log('Selected Categories:', updatedCategories);

            return updatedCategories;
        });
    };

    const handleRegistration = async (data: FormData) => {
        try {

            const registrationSuccessful = true;

            if (registrationSuccessful) {
                setIsOpen(true);
                // setTimeout(() => {
                //   onClose();
                //   navigate('Login')
                // }, 3000);
            } else {
                toast.show({
                    title: 'Registration Failed',
                    duration: 5000,
                    background: 'red.600',
                });
            }
        } catch (error) {
            console.error(error);
            toast.show({
                title: 'Registration Failed',
                duration: 5000,
                background: 'red.600',
            });
        }
    };

    const formInputs: FormInput[] = useMemo(
        () => [
            {
                key: 'name',
                label: 'Name',
                placeholder: 'Enter your full name',
                icon: { AntDesignName: 'user' },
                rules: {
                    required: 'Fullname is required',
                },
                inputProps: { autoCapitalize: 'none', marginBottom: '2' },
            },
            {
                key: 'phone',
                label: 'Mobile number',
                placeholder: 'Enter your mobile number',
                icon: { IoniconsName: 'call', color: 'gray' },
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
                    bg: 'white'
                },
            },
            {
                key: 'email',
                label: 'Email',
                placeholder: 'Enter Email',
                icon: { FeatherName: 'mail' },
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
                icon: { AntDesignName: 'user' },
                rules: {
                    required: 'Employee Id is required',
                    // pattern: {
                    //     value: /^[0-9]{10}$/,
                    //     message: 'Invalid Employee Id',
                    // },
                },
                inputProps: { autoCapitalize: 'none', marginBottom: '2' },
            },
            {
                key: 'ManufacturerId',
                label: 'Manufacturer Id',
                placeholder: 'Enter Manufacturer Id',
                icon: { AntDesignName: 'user' },
                rules: {
                    required: 'Manufacturer Id is required',
                    // pattern: {
                    //     value: /^[0-9]{10}$/,
                    //     message: 'Invalid Employee Id',
                    // },
                },
                inputProps: { autoCapitalize: 'none', marginBottom: '2' },
            },
        ],
        [secureTextEntry],
    );


    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);

    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                bg="white"
                _dark={{ bg: 'dark.100' }}>
                <Center flexGrow={1} px="5" w="full">
                    <Image
                        width="60"
                        height="70"
                        source={IMAGES.LOGO3}
                        alt="logo"
                        mt={10}
                    />
                    <Heading fontSize={18} m={4} mt={5} color={'success.600'} w={'full'} textAlign={'center'} underline py={3}>
                        Signup as Company Representative{' '}
                    </Heading>

                    {formInputs.map(input => (
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
                        <Text fontSize={15} fontFamily={'Monstera-Regular'} mb={2} mt={2} opacity={0.8}>
                            Date of birth
                        </Text>

                        <Box maxW="100%" w={WIDTH}>
                            <Pressable onPress={showDatePicker}>
                                <Box
                                    borderBottomWidth={1}
                                    borderRadius={2}
                                    borderColor={'coolGray.300'}
                                    p={1}
                                    py={2}

                                >
                                    <HStack
                                        alignItems={'center'}
                                    >

                                        <AppIcon AntDesignName="calendar" color={'gray'} />

                                        <Text fontSize={15} pl={4} color={'gray.500'} opacity={0.8} fontFamily={'Monstera-Regular'}>
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

                    <Btn w={WIDTH * 0.9} h={10} shadow={1} onPress={() => {
                        handleSubmit((data) => {
                            console.log('Form Data:', {
                                ...data,
                                dateOfBirth: selectedDate ? new Date(selectedDate).toLocaleDateString() : null,
                                phoneNumber: `${selectedCountry.phone}${data.phone}`,
                            });
                            handleRegistration(data);
                        })();
                    }}>
                        <Heading size={'md'} color={'white'}>
                            Sign up
                        </Heading>
                    </Btn>




                    <Box alignItems="center" w="100%" mt={5}>


                        <Box alignItems="center" flexDirection="row">
                            <Text color={bg} fontSize="16" fontWeight="400">
                                Already have an account?
                            </Text>
                            <Btn
                                colors={['#fff', '#fff']}
                                _text={{ color: 'black', fontSize: 'sm' }}
                                onPress={() => navigate('Login')}>
                                <Heading size={'xs'} underline>Login</Heading>
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

            <DateTimePickerModal
                date={selectedDate}
                isVisible={datePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>


                    <Box bg={'white'} h={HEIGHT / 4} alignItems={'center'} justifyContent={'center'}>
                        <AnimatedLottieView
                            source={ANIMATIONS.success}
                            autoPlay
                            loop={true}
                        />
                    </Box>
                    <Heading textAlign={'center'} color={'gray.600'}>Registration Complete </Heading>
                    <Text mb={8} fontSize={12} mt={3} textAlign={'center'} color={'gray.500'}>Check your mail for login credentials.</Text>

                </AlertDialog.Content>
            </AlertDialog >

        </>
    );
}
