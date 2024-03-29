import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Welcome from './screens/Welcome';
import Detail from './screens/Detail';
import Bottom from './bottomTab/Bottom'
import { useEffect, useState } from 'react';
import { readStorage, readStorageAsString } from './utils/store';
import { ONBOARDED, USER_KEY } from './constants/base';
import Loader from './components/Loader';
import ResetPass from './screens/ResetPass';
import Verify from './screens/Verify';
import BlogDetail from './screens/BlogDetail';
import Tutorial from './screens/Tutorial';
const Stack = createNativeStackNavigator();

function HomePage() {
  return (
    <Stack.Navigator screenOptions={{ header: () => null }}>
      <Stack.Screen name="BottomTab" component={Bottom} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="ResetPass" component={ResetPass} />
      <Stack.Screen name="BlogDetail" component={BlogDetail} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState('');
  useEffect(() => {
    setTimeout(authUser, 2000);
    checkIfOnboarded()
  }, []);


  const checkIfOnboarded = async () => {
    try {
      let onboarded = await readStorageAsString(ONBOARDED)
      if (onboarded === null) {
        setInitialRouteName('Tutorial')
      }
    } catch (e) {
      console.log(e)
    }

  }

  const authUser = async () => {
    try {
      let userData = await readStorage(USER_KEY);
      setInitialRouteName(userData?.isLogin ? 'HomePage' : 'Welcome');
    } catch (error) {
      setInitialRouteName('Welcome');
    }
  }

  return (
    <NavigationContainer>
      {initialRouteName == '' ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator screenOptions={{ header: () => null }} initialRouteName={initialRouteName}>
            <Stack.Screen name='Tutorial' component={Tutorial} />
            <Stack.Screen name='Welcome' component={Welcome} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='SignUp' component={SignUp} />
            <Stack.Screen name='Verify' component={Verify} />
            <Stack.Screen name='HomePage' component={HomePage} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  )
}

