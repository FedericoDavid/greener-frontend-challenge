import { NavigationProvider } from "./navigation";
import React from "react";
import { NativeBaseProvider } from "native-base";
import { AuthUserContextProvider } from "app/context/userAuth";

export function Provider({ children }: { children: React.ReactNode }) {
   return (
      <NavigationProvider>
         <NativeBaseProvider>
            <AuthUserContextProvider>{children}</AuthUserContextProvider>
         </NativeBaseProvider>
      </NavigationProvider>
   );
}
