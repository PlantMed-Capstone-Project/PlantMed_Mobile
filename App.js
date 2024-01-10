import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Welcome from './screens/Welcome';
import Detail from './screens/Detail';
import Bottom from './bottomTab/Bottom'
import Profile from './screens/Profile';
const Stack = createNativeStackNavigator();

function HomePage() {
  return (
    <Stack.Navigator screenOptions={{ header: () => null }}>
      <Stack.Screen name="BottomTab" component={Bottom} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: () => null }} initialRouteName='Welcome'>
        <Stack.Screen name='Welcome' component={Welcome} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='HomePage' component={HomePage} />
        <Stack.Screen name='Profile' component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

