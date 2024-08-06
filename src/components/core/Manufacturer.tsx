import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
    Modal,
} from 'react-native';
import { FlatList, Pressable, Text, HStack, Heading, Icon, Input, VStack, Box } from 'native-base';

type PickerItem = {
    id: number;
    name: string;
};

type Props = {
    visible: boolean;
    data: PickerItem[];
    onSelect: (item: PickerItem) => void;
    onClose: () => void;
    selected?: PickerItem | null;
    placeholder: string;
    title: string;
};

export default ({ onClose, onSelect, visible, data, selected, placeholder, title }: Props) => {
    const [searchTxt, setSearchTxt] = useState('');
    const [searchRes, setSearchRes] = useState(() => data);

    useEffect(() => {
        if (searchTxt.length === 11) {
            const resArr = data.filter((item: PickerItem) =>
                item.name.toLowerCase().includes(searchTxt.toLowerCase())
            );
            setSearchRes(resArr);
        } else {
            setSearchRes([]);
        }
    }, [searchTxt, data]);



    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={() => onClose()}
        >
            <Box flex={1} m={2} p={2}>
                <VStack space={3}>
                    <HStack mt={2} space={8}>
                        <Pressable onPress={() => onClose()}>
                            <MaterialIcons name="arrow-back" size={25} color="#000" />
                        </Pressable>
                        <Heading alignSelf={'center'} fontSize="lg">
                            {title}
                        </Heading>
                    </HStack>
                    <Input
                        placeholder={placeholder}
                        width="100%"
                        borderRadius="4"
                        backgroundColor={'#fff'}
                        px="1"
                        fontSize="14"
                        value={searchTxt}
                        onChangeText={setSearchTxt}
                        InputLeftElement={
                            <Icon
                                m="2"
                                ml="3"
                                size="6"
                                color="gray.400"
                                as={<MaterialIcons name="search" />}
                            />
                        }
                    />
                </VStack>
                <FlatList
                    data={searchRes}
                    renderItem={({ item }) => (
                        <Pressable p={2} borderBottomWidth={1} borderBottomColor={'#ccc'} onPress={() => onSelect(item)}>
                            <Text>{item.name}</Text>
                        </Pressable>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </Box>
        </Modal>
    );
};


