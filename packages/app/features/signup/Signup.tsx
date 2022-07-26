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

type SignUpInputProps = {
   name: string;
   email: string;
   password: string;
};

export function SignUp() {
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<SignUpInputProps>({
      defaultValues: {
         name: "",
         email: "",
         password: "",
      },
   });
   const { Label } = FormControl;
   const { registerUser } = useAuthUserContext();

   const onSubmit = (data: SignUpInputProps) => {
      if (!data) return;

      registerUser(data.email, data.password, data.name);
   };

   return (
      <>
         <SingleHeader />
         <Box safeArea flex={1} p={2} w="40%" mx="auto">
            <Heading size="xl" color="indigo.400">
               Welcome
            </Heading>
            <Heading color="indigo.400" size="xs">
               Sign up to continue!
            </Heading>
            <VStack space={2} mt={5}>
               <Controller
                  control={control}
                  rules={{
                     required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                     <>
                        <Label>Name</Label>
                        <Input
                           onBlur={onBlur}
                           onChangeText={onChange}
                           value={value}
                        />
                     </>
                  )}
                  name="name"
               />
               {errors.name?.type === "required" && (
                  <Text color="red.500">Name is required</Text>
               )}

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
                  <Text color="red.500">Email is required</Text>
               )}
               {errors.email?.type === "pattern" && (
                  <Text color="red.500">Please enter a valid email</Text>
               )}

               <Controller
                  control={control}
                  rules={{
                     required: true,
                     minLength: 6,
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
                  <Text color="red.500">Password is required</Text>
               )}
               {errors.password?.type === "minLength" && (
                  <Text color="red.500">Password is too short</Text>
               )}
               {errors.password?.type === "maxLength" && (
                  <Text color="red.500">Password is too long</Text>
               )}

               <VStack space={2}>
                  <Button
                     colorScheme="indigo"
                     _text={{
                        color: "white",
                     }}
                     onPress={handleSubmit(onSubmit)}
                  >
                     Login
                  </Button>
               </VStack>
               <HStack justifyContent="center">
                  <Text fontSize="sm" color="indigo.500" fontWeight={400}>
                     I'm already have an account
                  </Text>
                  <Link
                     _text={{
                        color: "indigo.500",
                        bold: true,
                        fontSize: "sm",
                        marginLeft: "5px",
                     }}
                     href="/signin"
                  >
                     Sign In
                  </Link>
               </HStack>
            </VStack>
         </Box>
         <Footer />
      </>
   );
}
