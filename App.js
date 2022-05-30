import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen';
import MapviewScreen from './src/MapviewScreen';

export default function App() {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
    <Stack.Screen name="Map" component={MapviewScreen} options={{headerShown:false}} />
  </Stack.Navigator>
</NavigationContainer>
  )
}