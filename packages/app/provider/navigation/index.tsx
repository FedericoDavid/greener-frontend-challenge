import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { useMemo } from "react";

export function NavigationProvider({
   children,
}: {
   children: React.ReactElement;
}) {
   return (
      <NavigationContainer
         linking={useMemo(
            () => ({
               prefixes: [Linking.createURL("/")],
               config: {
                  initialRouteName: "home",
                  screens: {
                     home: "",
                     coins: "coins/:id",
                     "user-detail": "user/:id",
                     signin: "signin",
                     signup: "signup",
                  },
               },
            }),
            []
         )}
      >
         {children}
      </NavigationContainer>
   );
}
