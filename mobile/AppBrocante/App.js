import React, { createContext, useState, useContext } from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import CreateAccount from './screens/user/CreateAccount';
import LogIn from './screens/user/LogIn';
import Research from './screens/Research';
import Setting from './screens/Setting';
import Wait from './screens/Wait';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Contexte global pour gérer l'état de chargement
const LoadingContext = createContext();

// Thèmes personnalisés
const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#E5D289',
    tabBarBackground: '#E5D289',
    tabBarActive: '#3F2100',
    tabBarInactive: '#B0855A',
  },
};

// Écran Tab avec la navigation
function MainTabs() {
  const { setIsLoading } = useContext(LoadingContext);

  const navigateWithLoading = (navigation, screenName) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate(screenName);
    }, 2000);
  };
  

  return (
    <Tab.Navigator
      initialRouteName="Research"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: LightTheme.colors.tabBarBackground,
          height: 60,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'User') {
            iconName = 'person';
          } else if (route.name === 'Research') { 
            iconName = 'search';
          } else if (route.name === 'Setting') {
            iconName = 'settings';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: LightTheme.colors.tabBarActive,
        tabBarInactiveTintColor: LightTheme.colors.tabBarInactive,
      })}
    >
      <Tab.Screen name="User">
        {(props) => <LogIn {...props} navigateWithLoading={navigateWithLoading} />}
      </Tab.Screen>
      <Tab.Screen name="Research">
        {(props) => <Research {...props} navigateWithLoading={navigateWithLoading} />}
      </Tab.Screen>
      <Tab.Screen name="Setting">
        {(props) => <Setting {...props} navigateWithLoading={navigateWithLoading} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}


export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <PaperProvider>
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <NavigationContainer theme={LightTheme}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen name="Wait" component={Wait} />
          </Stack.Navigator>
        </NavigationContainer>
      </LoadingContext.Provider>
    </PaperProvider>
  );
}
