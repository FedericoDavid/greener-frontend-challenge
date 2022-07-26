import React from "react";
import {
   Button,
   Input,
   VStack,
   Text,
   Box,
   Heading,
   Link,
   HStack,
   FormControl,
} from "native-base";
import { useForm, Controller } from "react-hook-form";

import { useAuthUserContext } from "app/context/userAuth";
import { Footer, SingleHeader } from "app/components";

type SignInInputProps = {
   email: string;
   password: string;
};

export function SignIn() {
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<SignInInputProps>({
      defaultValues: {
         email: "",
         password: "",
      },
   });
   const { Label } = FormControl;
   const { signInUser, forgotPassword } = useAuthUserContext();

   const onSubmit = (data: SignInInputProps) => {
      if (!data) return;

      signInUser(data.email, data.password);
   };

   return (
      <>
         <SingleHeader />
         <Box safeArea flex={1} p={2} w="40%" mx="auto">
            <Heading size="xl" color="indigo.400">
               Welcome
            </Heading>
            <Heading color="indigo.400" size="xs">
               Sign in to continue!
            </Heading>
            <VStack space={2} mt={5}>
               <Controller
                  control={control}
                  rules={{
                     required: true,
                     pattern:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                     <>
                        <Label>Email</Label>
                        <Input
                           onBlur={onBlur}
                           onChangeText={onChange}
                           value={value}
                        />
                     </>
                  )}
                  name="email"
               />
               {errors.email?.type === "required" && (
                  <Text>Email is required</Text>
               )}
               {errors.email?.type === "pattern" && (
                  <Text>Please enter a valid email</Text>
               )}
               <Controller
                  control={control}
                  rules={{
                     required: true,
                     minLength: 3,
                     maxLength: 8,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                     <>
                        <Label>Password</Label>
                        <Input
                           onBlur={onBlur}
                           onChangeText={onChange}
                           value={value}
                           type="password"
                        />
                     </>
                  )}
                  name="password"
               />
               {errors.password?.type === "required" && (
                  <Text>Password is required</Text>
               )}
               {errors.password?.type === "minLength" && (
                  <Text>Password is too short</Text>
               )}
               {errors.password?.type === "maxLength" && (
                  <Text>Password is too long</Text>
               )}
               <Link
                  _text={{
                     fontSize: "xs",
                     fontWeight: "700",
                     color: "indigo.400",
                  }}
                  alignSelf="flex-end"
                  mt={1}
               >
                  Forget Password?
               </Link>
               <VStack space={2}>
                  <Button
                     colorScheme="indigo"
                     _text={{
                        color: "white",
                     }}
                     onPress={handleSubmit(onSubmit)}
                  >
                     Sign Up
                  </Button>
               </VStack>
               <HStack justifyContent="center">
                  <Text fontSize="sm" color="muted.700" fontWeight={400}>
                     I'm a new user
                  </Text>
                  <Link
                     _text={{
                        color: "indigo.400",
                        bold: true,
                        fontSize: "sm",
                        marginLeft: "5px",
                     }}
                     href="/signup"
                  >
                     Sign Up
                  </Link>
               </HStack>
            </VStack>
         </Box>
         <Footer />
      </>
   );
}
