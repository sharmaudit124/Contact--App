import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import DrawerNavigator from './screens/DrawerNavigator';
import { createTable } from './utils/DatabaseHandler';

export default function App() {
  useEffect(() => {
    const handleSuccess = (message) => {
    };
    const handleError = (errorMessage) => {
      console.error(errorMessage);
    };
    createTable(handleSuccess, handleError);
  }, []);


  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}


