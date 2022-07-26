import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "solito/router";
import {
   signInWithEmailAndPassword,
   createUserWithEmailAndPassword,
   onAuthStateChanged,
   signOut,
   updateProfile,
   sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../services/db/firebase";
import { useToast } from "native-base";

export const AuthUserContext = createContext<any>({});

export const useAuthUserContext = () => useContext(AuthUserContext);

export interface User {
   email: string;
   password?: string;
   displayName?: string;
}

export interface UserContextProviderProps {
   user: User;
   userLoading: boolean;
   signInUser: (email: string, password: string) => void;
   registerUser: (email: string, password: string, name: string) => void;
   logoutUser: () => void;
   forgotPassword: (email: string) => void;
}

export function AuthUserContextProvider({ children }) {
   const [user, setUser] = useState<User | any>();
   const [userIsLoading, setUserILoading] = useState<boolean>(false);

   const { push } = useRouter();
   const toast = useToast();

   useEffect(() => {
      setUserILoading(true);

      const unsubscribe = onAuthStateChanged(auth, (res) => {
         if (res) {
            setUser(res);
         } else {
            setUser(null);
            console.log("unauthorized");
         }

         setUserILoading(false);
      });

      return unsubscribe;
   }, []);

   const registerUser = async (
      email: string,
      password: string,
      name: string
   ) => {
      setUserILoading(true);

      const userCredential = await createUserWithEmailAndPassword(
         auth,
         email,
         password
      );

      const newUser = {
         email,
         displayName: name,
      };

      setUser(newUser);

      updateProfile(userCredential.user, {
         displayName: name,
      })
         .then((res) => {
            toast.show({
               title: "Register Successful ✔",
               placement: "top",
            });
            push("/");
         })
         .catch((err) => {
            toast.show({
               title: `Ups! ${err.message}`,
               placement: "top",
            });

            console.error(err);
         })
         .finally(() => setUserILoading(false));
   };

   const signInUser = (email: string, password: string) => {
      setUserILoading(true);

      signInWithEmailAndPassword(auth, email, password)
         .then((res) => {
            toast.show({
               title: "Register Successful ✔",
               placement: "top",
            });
            push("/");
         })
         .catch((err) => {
            toast.show({
               title: `Ups! ${err.message}`,
               placement: "top",
            });

            console.error(err.code);
         })
         .finally(() => setUserILoading(false));
   };

   const logoutUser = () =>
      signOut(auth).then(() =>
         toast.show({
            title: "Logout Successful ✔",
            placement: "top",
         })
      );

   const forgotPassword = (email: string) =>
      sendPasswordResetEmail(auth, email);

   const contextValue = {
      user,
      userIsLoading,
      signInUser,
      registerUser,
      logoutUser,
      forgotPassword,
   };

   return (
      <AuthUserContext.Provider value={contextValue}>
         {children}
      </AuthUserContext.Provider>
   );
}
