import {useNavigation} from '@react-navigation/native';
import {AppIcon, NotificationIcon} from '~/components/core';
import {Box, Row, Text, Image, Pressable, StatusBar} from 'native-base';
import React from 'react';
import {IconProps} from '../core/AppIcon';
import {ImageSourcePropType} from 'react-native';
import SearchInput from '~/components/SearchInput';
import {screenWidth} from '~/styles';
import {StackAndTabType} from '~/routes/private/types';

type Props = {
  title?: string;
  color?: string;
  statusColor?: string;
  image?: {
    source: ImageSourcePropType;
    height?: number;
    width?: number;
  };
  icons?: {
    icon?: IconProps;
    iconColor?: string;
    onPress?: () => void;
    side: 'LEFT' | 'RIGHT';
  }[];
  search?: boolean;
  placeHolder?: string;
  isNotification?: boolean;
} & React.ComponentProps<typeof Box>;

export default function PrivateContainer({
  title,
  color,
  statusColor,
  image,
  children,
  icons,
  search,
  placeHolder,
  isNotification,
  ..._box
}: Props) {
  const {canGoBack, goBack, navigate} = useNavigation<StackAndTabType>();
  const leftIcon = icons?.find(_ => _.side === 'LEFT');
  const rightIcons = icons?.filter(_ => _.side === 'RIGHT');
  const bg = 'white';
  const text = 'black';
  const showSearchIcon = search && (!rightIcons || rightIcons.length < 2);
  const renderLeftIcon = () => (
    <Pressable
      bg="transparent"
      onPress={() => leftIcon?.onPress?.() || (canGoBack() ? goBack() : null)}>
      <AppIcon
        size={22}
        color={text}
        {...(leftIcon?.icon || {OcticonsName: 'arrow-left'})}
      />
    </Pressable>
  );

  const renderTitleOrImage = () =>
    image ? (
      <Pressable>
        <Image
          source={image.source}
          alt="image"
          style={{height: image.height || 40, width: image.width || 40}}
          resizeMode="contain"
        />
      </Pressable>
    ) : (
      <Text fontSize="lg" bold>
        {title}
      </Text>
    );
  return (
    <>
      
      <Box bg={'white'} safeAreaTop {..._box}>
        <Box bg={'white'} shadow={color ? '' : 3}>
          <Row
            bg={color}
            px={screenWidth * 0.02}
            py={search ? screenWidth * 0.02 : 3}
            space={3}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Row alignItems={'center'} space={3}>
              {!image && renderLeftIcon()}
              {renderTitleOrImage()}
            </Row>
            {showSearchIcon && (
              <Box flex={1} h={image ? '' : 42}>
                <SearchInput
                  flex={1}
                  placeHolder={placeHolder || 'Search for product..'}
                  action={{onPressIn: () => navigate('Search', {})}}
                  icons={[
                    {
                      icon: {MaterialCommunityIconsName: 'tune'},
                      onPress: () => {},
                      side: 'RIGHT',
                    },
                  ]}
                />
              </Box>
            )}
            <Row alignItems={'center'} space={rightIcons?.length! > 0 ? 5 : 0}>
              {rightIcons?.map((_, i) => (
                <React.Fragment key={i}>
                  <Pressable
                    bg={'transparent'}
                    onPress={() => {
                      if (_?.onPress) return _.onPress();
                    }}>
                    <AppIcon
                      size={22}
                      color={_?.iconColor ? _?.iconColor : text}
                      {..._?.icon}
                    />
                  </Pressable>
                </React.Fragment>
              ))}
              {isNotification && <NotificationIcon isNotification />}
            </Row>
          </Row>
        </Box>
        {children}
      </Box>
    </>
  );
}
