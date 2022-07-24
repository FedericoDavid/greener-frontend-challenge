import React, { createContext, useContext, useState, useEffect } from "react";
import {
   signInWithEmailAndPassword,
   createUserWithEmailAndPassword,
   onAuthStateChanged,
   signOut,
   updateProfile,
   sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../services/db/firebase";

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
   isError: boolean;
   signInUser: (email: string, password: string) => void;
   registerUser: (email: string, password: string, name: string) => void;
   logoutUser: () => void;
   forgotPassword: (email: string) => void;
}

export function AuthUserContextProvider({ children }) {
   const [user, setUser] = useState<User | any>();
   const [userIsLoading, setUserILoading] = useState<boolean>(false);
   const [isError, setIsError] = useState<boolean>(false);

   useEffect(() => {
      setUserILoading(true);

      const unsubscribe = onAuthStateChanged(auth, (res) => {
         if (res) {
            setUser(res);
         } else {
            setUser(null);
            console.log("unauthorized");
            setIsError(true);
         }

         setIsError(false);
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
         .then((res) => console.log(res))
         .catch((err) => {
            console.error(err);
            setIsError(true);
         })
         .finally(() => setUserILoading(false));
   };

   const signInUser = (email: string, password: string) => {
      setUserILoading(true);

      signInWithEmailAndPassword(auth, email, password)
         .then((res) => console.log(res))
         .catch((err) => {
            console.error(err.code);
            setIsError(true);
         })
         .finally(() => setUserILoading(false));
   };

   const logoutUser = () => signOut(auth);

   const forgotPassword = (email: string) =>
      sendPasswordResetEmail(auth, email);

   const contextValue = {
      user,
      userIsLoading,
      isError,
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
