import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import StackNavigator from './src/Routes/StackNavigator'
export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <NativeBaseProvider>
          <StackNavigator />
        </NativeBaseProvider>
      </SafeAreaProvider>
    </>
  );
}