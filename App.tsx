import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationRoot from './src/navigation';
import { useLayoutEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSettingsStore } from './src/store/settingsStore';
import { Languages } from './src/utils/languages';

function App() {
const {setLanguage} = useSettingsStore();
  useLayoutEffect(() => {
    AsyncStorage.getItem('language').then((value) => {
      if (value) {
        setLanguage(value as Languages);
      }
    }).catch((error) => {
      setLanguage(Languages.EN)
      console.log(error);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationRoot />
    </SafeAreaProvider>
  );
}

export default App;
