import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import Screen01 from "./View/Screen01";
import Screen02 from "./View/Screen02";
import Screen03 from "./View/Screen03";
import Screen04 from "./View/Screen04";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screen01">
        <Stack.Screen
          name="Screen01"
          component={Screen01}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Screen02"
          component={Screen02}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Screen03"
          component={Screen03}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="Screen04"
          component={Screen04}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
