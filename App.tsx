/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import TodosScreen from './src/list';
import EditScreen from './src/edit';

export const RoutersConfig = {
  routes: {
    Home: {
      screen: TodosScreen
    },
    Edit: {
      screen: EditScreen
    }
  },
  initial: {
    initialRouteName: 'Home'
  }
};
