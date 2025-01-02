import React, { createContext, useState, useContext } from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as ReactNativeProvider, useSelector} from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';
import store from "./store";
import {selectIsAuthenticated} from "./store/slice/person";
import CreateAccount from './screens/user/CreateAccount';
import LogIn from './screens/user/LogIn';
import Research from './screens/Research';
import Setting from './screens/Setting';
import Wait from './screens/Wait';
import Help from './screens/user/Help';
import Interests from './screens/Interests';
import DealerDetails from './screens/DealerDetails';
import InterestsDetails from './screens/InterestDetails';
import FleaMarketDetails from './screens/FleaMarketDetails';
import UpdateProfile from './screens/user/UpdateProfile';
import Slots from './screens/Slots';
import Articles from './screens/Articles';

// Définir la barre de navigation du bas
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

function MainTabs() {
  //const langDict = useSelector((state) => state.language.langDict);
  const { setIsLoading } = useContext(LoadingContext);
  // authentifie l'useur (login / create account) avant d'accéder au reste
  const isAuthenticated = useSelector(selectIsAuthenticated); 
  const langDict = useSelector((state) => state.language.langDict);
  
  const navigateWithLoading = (navigation, screenName) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate(screenName);
    }, 2000);
  };

  return (
      <Tab.Navigator
          initialRouteName={"Research"}
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
        <Tab.Screen
        name="User"
        options={{ tabBarLabel: langDict.user }}>
          {({ navigation }) =>
              isAuthenticated ? (
                  <UpdateProfile navigation={navigation} />
              ) : (
                  <LogIn navigation={navigation} navigateWithLoading={navigateWithLoading} />
              )
          }
        </Tab.Screen>
        <Tab.Screen
        name="Research"
        options={{ tabBarLabel: langDict.search }}>
          {(props) => <Research {...props} navigateWithLoading={navigateWithLoading} />}
        </Tab.Screen>
        <Tab.Screen
        name="Setting"
        options={{ tabBarLabel: langDict.user }}>
          {(props) => <Setting {...props} navigateWithLoading={navigateWithLoading} />}
        </Tab.Screen>
      </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
      <ReactNativeProvider store={store}>
        <PaperProvider>
          <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            <NavigationContainer theme={LightTheme}>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MainTabs" component={MainTabs} options={{tabBarVisible: true}}/>
                <Stack.Screen name="CreateAccount" component={CreateAccount} options={{tabBarVisible: true}}/>
                <Stack.Screen name="Wait" component={Wait} options={{tabBarVisible: true}}/>
                <Stack.Screen name="Help" component={Help} options={{tabBarVisible: true}}/>
                <Stack.Screen name="LogIn" component={LogIn} options={{tabBarVisible: true}}/>
                <Stack.Screen name="FleaMarketDetails" component={FleaMarketDetails} options={{tabBarVisible: true}}/>
                <Stack.Screen name="Interests" component={Interests} options={{tabBarVisible: true}}/>
                <Stack.Screen name="InterestDetails" component={InterestsDetails} options={{tabBarVisible: true}}/>
                <Stack.Screen name="DealerDetails" component={DealerDetails} options={{tabBarVisible: true}}/>
                <Stack.Screen name="Slots" component={Slots} options={{tabBarVisible: true}}/>
                <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{tabBarVisible: true}}/>
                <Stack.Screen name="Articles" component={Articles} options={{tabBarVisible: true}}/>
              </Stack.Navigator>
            </NavigationContainer>
          </LoadingContext.Provider>
        </PaperProvider>
      </ReactNativeProvider>
  );
}
