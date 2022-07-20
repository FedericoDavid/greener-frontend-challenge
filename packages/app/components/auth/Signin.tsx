import React, { useState } from "react";
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
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";

import { useAuthUserContext } from "app/context/userAuth";

type FormInputProps = {
   email: string;
   password: string;
};

interface SigninProps {}

const Signin: React.FC<SigninProps> = () => {
   const [error, setError] = useState(false);
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<FormInputProps>({
      defaultValues: {
         email: "",
         password: "",
      },
   });
   const { Label } = FormControl;
   const { signInUser, forgotPassword, isError } = useAuthUserContext();

   const onSubmit = (data: FormInputProps) => {
      if (!data) return;

      signInUser(data.email, data.password);
   };

   //    const forgotPasswordHandler = () => {
   //       const email = emailRef.current.value;
   //       if (email)
   //          forgotPassword(email).then(() => {
   //             emailRef.current.value = "";
   //          });
   //    };

   return (
      <Box safeArea flex={1} p={2} w="40%" mx="auto">
         <Heading size="lg" color="primary.500">
            Welcome
         </Heading>
         <Heading color="muted.400" size="xs">
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
                  color: "cyan.500",
               }}
               alignSelf="flex-end"
               mt={1}
            >
               Forget Password?
            </Link>
            <VStack space={2}>
               <Button
                  colorScheme="cyan"
                  _text={{
                     color: "white",
                  }}
                  onPress={handleSubmit(onSubmit)}
               >
                  Login
               </Button>
            </VStack>
            <HStack justifyContent="center">
               <Text fontSize="sm" color="muted.700" fontWeight={400}>
                  I'm a new user
               </Text>
               <Link
                  _text={{
                     color: "cyan.500",
                     bold: true,
                     fontSize: "sm",
                     marginLeft: "5px",
                  }}
                  href="#"
               >
                  Sign Up
               </Link>
            </HStack>
            <Text>{isError && error && "Error"}</Text>
         </VStack>
      </Box>
   );
};

export default Signin;
