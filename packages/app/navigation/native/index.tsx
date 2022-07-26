import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../../features/home/screen";
import { SignIn } from "app/features/signin/Signin";
import { SignUp } from "app/features/signup/Signup";
import { CoinDetailScren } from "app/features/coin/detail-screen";

const Stack = createNativeStackNavigator<{
   home: undefined;
   signin: undefined;
   signup: undefined;
   coin: {
      coinId: string;
   };
}>();

export function NativeNavigation() {
   return (
      <Stack.Navigator>
         <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{
               title: "Home",
            }}
         />
         <Stack.Screen
            name="coin"
            component={CoinDetailScren}
            options={{
               title: "Coin",
            }}
         />
         <Stack.Screen
            name="signin"
            component={SignIn}
            options={{
               title: "Signin",
            }}
         />
         <Stack.Screen
            name="signup"
            component={SignUp}
            options={{
               title: "Signup",
            }}
         />
      </Stack.Navigator>
   );
}
