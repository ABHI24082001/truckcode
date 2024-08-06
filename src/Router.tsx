import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {useAuth} from './hooks';
import PrivateRoutes from './routes/private';
import PublicRoutes from './routes/public';
import {Splash} from './screens/public';

const Routes = () => {
  const {user, getUser, setUser} = useAuth();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isEnter, setIsEnter] = React.useState<string | null>();
  const handleEnter = async () => {
    try {
      const viewedOnboarding = await AsyncStorage.getItem('viewedOnboarding');
      setIsEnter(viewedOnboarding);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleEnter();
    (async () => {
      getUser();
    })();
  }, [getUser]);
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  if (isLoading) {
    return <Splash />;
  }
  return user ? (
    <PrivateRoutes />
  ) : (
    <PublicRoutes
      initialRouteName={isEnter === 'yes' ? 'Login' : 'Onboarding'}
    />
  );
};

export default Routes;
