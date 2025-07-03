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
  [Screen.MARKET_DETAIL]: { marketId: string, index: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const NavigationRoot = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={Screen.MARKETS}
        screenOptions={{
          header: () => null,
          animation: 'fade',
          presentation: 'card',
        }}>
        <Stack.Screen 
          name={Screen.MARKETS} 
          component={MarketsScreen} 
        />
        <Stack.Screen 
          name={Screen.MARKET_LIST} 
          component={MarketListScreen} 
        />
        <Stack.Screen 
          name={Screen.MARKET_DETAIL} 
          component={MarketDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationRoot;