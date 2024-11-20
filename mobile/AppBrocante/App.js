import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import User from './components/User';
import Setting from './components/Setting';
import Research from './components/Research';

import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Research' screenOptions={{ headerShown : false}}>
        <Tab.Screen name="Research" component={Research}/>
        <Tab.Screen name="User" component={User}/>
        <Tab.Screen name="Setting" component={Setting}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
