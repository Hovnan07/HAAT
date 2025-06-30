import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationRoot } from './src/navigation';
function App() {

  return (
    <SafeAreaProvider>
      <NavigationRoot />
    </SafeAreaProvider>
  );
}

export default App;
