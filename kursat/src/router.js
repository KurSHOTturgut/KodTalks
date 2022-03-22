import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import FlashMessage from "react-native-flash-message"; //Toast message
//auth
import auth from '@react-native-firebase/auth';

//navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//pages
import Login from './pages/auth/Login';
import Sign from './pages/auth/Sign';
import Rooms from './pages/Rooms';
import Messages from './pages/Messages';


//styles
import colors from './assets/styles/colors';

//icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();



const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='LoginPage' component={Login} />
      <Stack.Screen name='SignPage' component={Sign} />
    </Stack.Navigator>
  );
}

const RoomsStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="RoomsPage"
        component={Rooms}
        options={{
          title: 'Odalar',
          headerTintColor: colors.bg1,
          headerTitleAlign: 'center',
          headerRight: () => (
            <Icon
              name='logout'
              size={25}
              color={colors.bg1}
              onPress={() => auth().signOut()}
            />
          )
        }}
      />
      <Stack.Screen
        name="MessagesPage"
        component={Messages}
        options={{
          title: "Mesajlar",
          headerTintColor: colors.bg1,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
            //onPress={() => { console.log(navigation); navigation.goBack() }}
            >
              <Icon
                name="chevron-left"
                size={25}
                color={colors.bg1}
              />
              <Text style={{ color: colors.bg1, }}>
                Odalar
              </Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Icon
              name='logout'
              size={25}
              color={colors.bg1}
              onPress={() => auth().signOut()}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}



const Router = () => {
  const [userSession, setUserSession] = React.useState();

  React.useEffect(() => {
    auth()
      .onAuthStateChanged(user => {
        setUserSession(!!user);
      });
  }, []);

  return (
    <NavigationContainer >
      {!userSession ?
        AuthStack()
        :
        RoomsStack()
      }

      <FlashMessage position="top" />
    </NavigationContainer>
  );
};



export default Router;
