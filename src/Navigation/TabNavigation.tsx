import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ColorName, useColor } from '../model/color';
import { FontFamily } from '../adapter/asserts/fonts';
import HomeScreen from '../View/Screens/App/HomeScreen';
import ExploreScreen from '../View/Screens/App/ExploreScreen';
import CartScreen from '../View/Screens/App/CartScreen';
import OrdersScreen from '../View/Screens/App/OrdersScreen';
import ProfileScreen from '../View/Screens/App/ProfileScreen';

const Tab = createBottomTabNavigator();

type TabIconProps = {
  label: string;
  focused: boolean;
  badge?: number;
};

const TabIcon = ({ label, focused, badge }: TabIconProps) => {
  const color = useColor();

  return (
    <View style={styles.iconWrap}>
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: focused
              ? color[ColorName.primary]
              : color[ColorName.OysterWhite],
            borderColor: focused
              ? color[ColorName.primary]
              : color[ColorName.border],
          },
        ]}
      >
        <Text
          style={[
            styles.iconLetter,
            {
              color: focused
                ? color[ColorName.white]
                : color[ColorName.textSecondary],
            },
          ]}
        >
          {label.slice(0, 1)}
        </Text>
      </View>
      {typeof badge === 'number' && badge > 0 ? (
        <View style={[styles.badge, { backgroundColor: color[ColorName.error] }]}
        >
          <Text style={styles.badgeText}>{badge > 9 ? '9+' : badge}</Text>
        </View>
      ) : null}
    </View>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const insets = useSafeAreaInsets();
  const color = useColor();

  return (
    <View
      style={[
        styles.tabBar,
        {
          paddingBottom: Math.max(insets.bottom, 10),
          backgroundColor: color[ColorName.white],
          borderTopColor: color[ColorName.border],
        },
      ]}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // const badge = route.name === 'Cart' ? 2 : undefined;
         const badge = route.name === 'Cart' ;

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            style={({ pressed }) => [
              styles.tabItem,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <TabIcon
              label={typeof label === 'string' ? label : route.name}
              focused={isFocused}
              badge={badge}
            />
            <Text
              style={[
                styles.label,
                {
                  color: isFocused
                    ? color[ColorName.primary]
                    : color[ColorName.textSecondary],
                },
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ tabBarLabel: 'Explore' }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{ tabBarLabel: 'Cart' }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ tabBarLabel: 'Orders' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
  },
  label: {
    marginTop: 6,
    fontSize: 11,
    fontFamily: FontFamily.MANROPE.SEMI_BOLD,
  },
  iconWrap: {
    position: 'relative',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  iconLetter: {
    fontSize: 14,
    fontFamily: FontFamily.MANROPE.BOLD,
  },
  badge: {
    position: 'absolute',
    right: -4,
    top: -4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 9,
    color: '#FFFFFF',
    fontFamily: FontFamily.MANROPE.BOLD,
  },
});

export default TabNavigation;
