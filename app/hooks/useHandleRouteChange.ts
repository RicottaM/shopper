import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Screens } from '../enum/screens';
import { Alert } from 'react-native';

export const useHandleRouteChange = () => {
  const router = useRouter();

  const handlePress = async (screen: Screens) => {
    const username = await SecureStore.getItemAsync('username');

    if (username || screen === Screens.Register || screen === Screens.Login) {
      router.push(`/screens/${screen}`);
    } else {
      Alert.alert('Sign in for full experience');
    }
  };

  return handlePress;
};
