import {useNavigation} from '@react-navigation/native';
import AnimatedLottieView, {AnimationObject} from 'lottie-react-native';
import {Center, Heading, Spinner, Text, Box} from 'native-base';
import {Btn} from '~/components/core';
import {screenWidth} from '~/styles';

type Props = {
  title: string;
  animation?: AnimationObject;
  subtitle?: string;
  action?: {
    label: string;
    onPress?: () => void;
  };
  noLoop?: boolean;
  isLoading?: boolean;
} & React.ComponentProps<typeof Center>;

export default function Empty({
  title,
  subtitle,
  action,
  animation,
  isLoading,
  noLoop = false,
  ..._centerProps
}: Props) {
  const {goBack} = useNavigation();
  const onPress = action?.onPress ?? goBack;
  return (
    <>
      <Center {..._centerProps}>
        {animation && (
          <Center h="96" w="full">
            {isLoading ? (
              <Spinner size={'lg'} />
            ) : (
              <AnimatedLottieView source={animation} autoPlay loop={!noLoop} />
            )}
          </Center>
        )}
        {isLoading ? (
          <></>
        ) : (
          <Center px={screenWidth * 0.05}>
            <Heading>{title}</Heading>
            {Boolean(subtitle) && (
              <Text
                fontSize={'sm'}
                textAlign="center"
                fontFamily={'Montserrat-SemiBold'}
                my="2">
                {subtitle}
              </Text>
            )}
            {Boolean(action) && (
              <Btn my={'2'} onPress={onPress}>
                {`${action?.label}`}
              </Btn>
            )}
          </Center>
        )}
      </Center>
    </>
  );
}
