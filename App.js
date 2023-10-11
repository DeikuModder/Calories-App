import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Routes from './src/routes/Routes';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, {paddingTop: Platform.OS === 'android' && 10}]}>
        <StatusBar style='auto'/>
        <Routes />
      </SafeAreaView> 
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
