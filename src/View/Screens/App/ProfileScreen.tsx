import React from 'react';
import ScreenShell from './ScreenShell';
import { Text } from 'react-native';

const ProfileScreen = () => {
  return (
    <ScreenShell
      title="Profile"
      subtitle="Manage addresses, payment methods, and notification preferences."
    />
    // <Text>Profile</Text>
  );
};

export default ProfileScreen;
