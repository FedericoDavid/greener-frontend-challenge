import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../../features/home/screen";
import { UserDetailScreen } from "../../features/user/detail-screen";
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
   "user-detail": {
      id: string;
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
            name="user-detail"
            component={UserDetailScreen}
            options={{
               title: "User",
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
