import React from "react";
import { registerRootComponent } from "expo";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/Login";
import SignUp from "./app/Signup";
import "react-native-reanimated";

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  OtpSection: undefined;
};

const App: React.FC = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
      <NavigationContainer>
        <StatusBar hidden/>
        {/* <StatusBar translucent backgroundColor='transparent'/> */}
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
          <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default registerRootComponent(App);
