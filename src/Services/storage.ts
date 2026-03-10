import AsyncStorage from '@react-native-async-storage/async-storage';

export const Storage = {
  setUser: async (user: any) => {
    await AsyncStorage.setItem('FOODMART_USER', JSON.stringify(user));
  },

  getUser: async () => {
    const user = await AsyncStorage.getItem('FOODMART_USER');
    return user ? JSON.parse(user) : null;
  },

  removeUser: async () => {
    await AsyncStorage.removeItem('FOODMART_USER');
  },

  // ✅ add these two
  setOnboardingSeen: async () => {
    await AsyncStorage.setItem('FOODMART_ONBOARDING', 'true');
  },

  getOnboardingSeen: async (): Promise<boolean> => {
    const value = await AsyncStorage.getItem('FOODMART_ONBOARDING');
    return value === 'true';
  },
};