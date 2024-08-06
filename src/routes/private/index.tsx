import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {PrivateRoutesTypes} from '~/routes/private/types';
import {Private} from '~/screens';
import {TabLayout} from '../layouts';
import { ScannedDataProvider } from '~/screens/private/Home/ScannedDataContext';

const Stack = createSharedElementStackNavigator<PrivateRoutesTypes>();

export default function PrivateRoutes({}) {
  return (
    <ScannedDataProvider>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="TabLayouts" component={TabLayout} />
        <Stack.Screen name="Checkout" component={Private.Checkout} />
        <Stack.Screen name="Coupons" component={Private.Coupons} />
        <Stack.Screen name="FAQs" component={Private.FAQs} />
        <Stack.Screen name="Home" component={Private.Home} />
        <Stack.Screen name="ScanScreen" component={Private.ScanScreen} />
        <Stack.Screen name="HistoryScreen" component={Private.HistoryScreen} />
        <Stack.Screen name="Notifications" component={Private.Notifications} />
        <Stack.Screen name="Offers" component={Private.Offers} />
        <Stack.Screen name="Profile" component={Private.Profile} />
        <Stack.Screen name="Search" component={Private.Search} />
        <Stack.Screen name="ProfileEdit" component={Private.ProfileEdit} />
        <Stack.Screen
          name="ChangePassword"
          component={Private.ChangePassword}
        />
        <Stack.Screen name="AllSupport" component={Private.AllSupport} />
        <Stack.Screen
          name="OrderDetailDistributor"
          component={Private.OrderDetailDistributor}
        />
        <Stack.Screen name="Order" component={Private.Order} />
        <Stack.Screen name="Manufacturer" component={Private.Manufacturer} />
        <Stack.Screen
          name="Settings"
          component={Private.Settings}
          sharedElements={(route, otherRoute, showing) => {
            return ['id-1'];
          }}
        />
        <Stack.Screen name="Support" component={Private.Support} />
      </Stack.Navigator>
    </ScannedDataProvider>
  );
}
