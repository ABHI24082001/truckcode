import React from 'react';
import {Input, Box, HStack, useColorModeValue} from 'native-base';
import {AppIcon, Btn} from '~/components/core';
import {IconProps} from './core/AppIcon';
type Props = {
  placeHolder: string;
  action?: {
    onPressIn?: () => void;
    onPress?: () => void;
  };
  icons?: {
    icon?: IconProps;
    onPress?: () => void;
    side: 'LEFT' | 'RIGHT';
  }[];
} & React.ComponentProps<typeof Box>;

export default function SearchInput({
  placeHolder,
  action,
  icons,
  ..._box
}: Props): JSX.Element {
  const bg2 = useColorModeValue('white', 'dark.50');
  const bg = useColorModeValue('muted.200', 'white');
  const leftIcon = icons?.find(_ => _.side === 'LEFT');
  const rightIcons = icons?.filter(_ => _.side === 'RIGHT');
  const {onPressIn} = action || {};
  return (
    <>
      <Box {..._box}>
        <Input
          placeholder={placeHolder}
          bg={bg}
          flex={1}
          p="2"
          borderRadius="12"
          borderColor={bg2}
          alignItems="center"
          onPressIn={onPressIn}
          leftElement={
            <Box ml="3" alignItems="center">
              <AppIcon
                size={18}
                color="grey"
                {...(leftIcon?.icon || {
                  FeatherName: 'search',
                })}
              />
            </Box>
          }
          rightElement={
            <HStack alignItems="center">
              {rightIcons?.map((_, i) => (
                <React.Fragment key={i}>
                  <Btn
                    colors={['transparent', 'transparent']}
                    onPress={() => _.onPress?.()}
                    mx={'auto'}>
                    <AppIcon size={18} color="grey" {..._?.icon} />
                  </Btn>
                </React.Fragment>
              ))}
            </HStack>
          }
        />
      </Box>
    </>
  );
}
