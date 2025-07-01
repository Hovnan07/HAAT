import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen from '../utils/screen';
import MarketsScreen from '../screens/Markets';
import MarketListScreen from '../screens/MarketList';
import MarketDetailScreen from '../screens/MarketDetail';

export type RootStackParamList = {
  [Screen.MARKETS]: undefined; 
  [Screen.MARKET_LIST]: undefined;
  [Screen.MARKET_DETAIL]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const NavigationRoot = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Screen.MARKETS}>
        <Stack.Screen 
          name={Screen.MARKETS} 
          component={MarketsScreen} 
          options={{ 
            header: () => null,
          }} 
        />
        <Stack.Screen 
          name={Screen.MARKET_LIST} 
          component={MarketListScreen} 
          options={{ 
            header: () => null,
          }} 
        />
        <Stack.Screen 
          name={Screen.MARKET_DETAIL} 
          component={MarketDetailScreen} 
          options={{ 
            header: () => null,
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationRoot;