import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import StackRouter from './src/routes/Router';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StackRouter/>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
