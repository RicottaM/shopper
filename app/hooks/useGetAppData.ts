import { useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';

export const useGetAppData = () => {
  const getDataWithExpiration = useCallback(async (key: string) => {
    const savedData = await SecureStore.getItemAsync(key);

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      const expirationDate = new Date(parsedData.expirationDate);
      const now = new Date();

      if (now < expirationDate) {
        return parsedData.value;
      } else {
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    }

    return null;
  }, []);

  return getDataWithExpiration;
};
