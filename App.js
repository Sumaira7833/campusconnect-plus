import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import EventDetailsScreen from './screens/EventDetailsScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import SocialFeedScreen from './screens/SocialFeedScreen';
import SettingsScreen from './screens/SettingsScreen';
import { ThemeProvider, useThemeMode } from './utils/theme';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      source={require('./assets/iu logo.png')}
      style={{ width: 120, height: 40, resizeMode: 'contain' }}
    />
  );
}

function TabsRoot() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerTitle: () => <LogoTitle />,
        headerTitleAlign: 'center'
      }}
    >
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Feed" component={SocialFeedScreen} />
      <Tabs.Screen name="Settings" component={SettingsScreen} />
    </Tabs.Navigator>
  );
}

function RootNav() {
  const { effective } = useThemeMode();
  const theme = effective === 'dark' ? DarkTheme : DefaultTheme;
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerTitle: () => <LogoTitle />,
          headerTitleAlign: 'center'
        }}
      >
        <Stack.Screen
          name="CampusConnect+"
          component={TabsRoot}
          options={{ headerShown: false }} // Hides duplicate header on tab root
        />
        <Stack.Screen
          name="EventDetails"
          component={EventDetailsScreen}
          options={{ title: 'Event Details' }}
        />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <RootNav />
    </ThemeProvider>
  );
}
