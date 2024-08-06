import React from 'react';
import {
    Avatar,
    Box,
    Center,
    Divider,
    Heading,
    Pressable,
    Row,
    ScrollView,
    Image,
    Text,
} from 'native-base';
import AppIcon from './AppIcon';
import { useNavigation } from '@react-navigation/native';
import { StackAndTabType } from '~/routes/private/types';

const NotificationIcon = ({
    onPress,
    isNotification,
}: {
    onPress?: () => void;
    isNotification?: boolean;
}) => {
    const { navigate } = useNavigation<StackAndTabType>();

    return (
        <Pressable
            onPress={onPress ? onPress : () => navigate('Notifications')}
            _pressed={{ opacity: 0.5 }}>
            <AppIcon size={22} color={'black'} FeatherName={'bell'} />
            {isNotification && (
                <Box
                    bg={'error.500'}
                    h={2}
                    w={2}
                    borderRadius={'full'}
                    position={'absolute'}
                    top={0}
                    left={0.5}
                />
            )}
        </Pressable>
    );
};

export default NotificationIcon;