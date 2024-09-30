import { useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';

export const useSaveAppData = () => {
  const saveDataWithExpiration = useCallback(async (key: string, value: string, expirationDays?: number) => {
    console.log(key, value, expirationDays);
    const now = new Date();
    const expirationDate = new Date(now.getTime() + (expirationDays ? expirationDays * 24 * 60 * 60 * 1000 : 0));

    const dataToSave = {
      value: value,
      expirationDate: expirationDate.toISOString(),
    };

    await SecureStore.setItemAsync(key, JSON.stringify(dataToSave));
  }, []);

  return saveDataWithExpiration;
};
