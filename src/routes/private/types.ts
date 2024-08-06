import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Private} from '~/screens';

export type BottomTabsTypes = {
  Home: undefined;
  Profile: undefined;
};

type PrivateScreens = {
  [key in keyof typeof Private]: undefined;
};
type OmittedScreen = 'Search' | 'OrderDetailDistributor';
export type PrivateNavigationProp = Omit<PrivateScreens, OmittedScreen> & {
  Search: {title?: string};
  OrderDetailDistributor: {id: string};
};

export type PrivateRoutesTypes = {
  TabLayouts: undefined;
} & PrivateNavigationProp;

export type StackAndTabType = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabsTypes>,
  NativeStackNavigationProp<PrivateRoutesTypes>
>;
