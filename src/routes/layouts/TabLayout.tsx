import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NativeBaseProvider, useColorMode} from 'native-base';
import React from 'react';
import {AppIcon} from '~/components/core';
import {IconProps} from '~/components/core/AppIcon';
import {Private} from '~/screens';
import {fontFamily} from '../../../app.json';

const Tab = createBottomTabNavigator();
type BottomTabsTypes = {
  route: string;
  label: string;
  icon: IconProps;
  component: React.FC<any>;
};
const TabArr: BottomTabsTypes[] = [
  {
    route: 'Scan',
    label: 'Scan',
    icon: {
      MaterialCommunityIconsName: 'qrcode-scan',
    },
    component: Private.Home,
  },
  {
    route: 'History',
    label: 'History',
    icon: {
      AntDesignName: 'solution1',
    },
    component: Private.Profile,
  },
  {
    route: 'Admin',
    label: 'Admin',
    icon: {
      AntDesignName: 'user',
    },
    component: Private.Coupons,
  },
];

export default function TabLayout() {
  const {colorMode} = useColorMode();
  return (
    <NativeBaseProvider>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        {TabArr.map((_, i) => {
          return (
            <Tab.Screen
              key={i}
              name={_.route}
              component={_.component}
              options={{
                tabBarIcon: ({color, focused, size}) => {
                  return <AppIcon {..._.icon} color={color} size={size} />;
                },
                tabBarLabelStyle: {fontFamily: `${fontFamily}-Regular`},
              }}
            />
          );
        })}
      </Tab.Navigator>
    </NativeBaseProvider>
  );
}
