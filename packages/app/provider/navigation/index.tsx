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
                     coin: "coin/:id",
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
