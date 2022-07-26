import React from "react";
import { Link } from "solito/link";
import {
   Button,
   Icon,
   IconButton,
   VStack,
   Stack,
   HStack,
   Center,
} from "native-base";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

import { User } from "app/context/userAuth";
import { MainLogo } from "./MainLogo";

interface NavbarProps {
   user: User;
   isSmallScreen?: boolean;
   onPress?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
   user,
   onPress,
   isSmallScreen,
}) => {
   const NavText = (label: string, marginRight?: string) => (
      <Center
         marginRight={marginRight ?? ""}
         cursor="pointer"
         _text={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: "14px",
         }}
      >
         {label}
      </Center>
   );

   const Mobile = () => (
      <HStack
         bg="#181A20"
         px="1"
         justifyContent="space-between"
         alignItems="center"
         w="100%"
         maxW="768px"
      >
         <Center alignItems="center">
            <MainLogo />
         </Center>
         <Center>
            <IconButton
               fontSize="24px"
               color="white"
               icon={<Icon as={GiHamburgerMenu} name="menu" />}
            />
         </Center>
      </HStack>
   );

   const Desktop = () => (
      <>
         <VStack
            justifyContent="space-around"
            width="40%"
            alignItems="center"
            backgroundColor="#181A20"
            flexDirection="row"
         >
            <MainLogo />
            {NavText("Buy cripto")}
            {NavText("Market")}
            {NavText("Trading")}
            {NavText("Earn")}
            {NavText("Finances")}
            {NavText("NFT")}
         </VStack>
         <VStack
            alignItems="center"
            flexDirection="row"
            backgroundColor="#181A20"
         >
            {!user ? (
               <>
                  <Link href="/signin">
                     <Button
                        variant="ghost"
                        colorScheme="indigo"
                        _text={{
                           color: "white",
                        }}
                     >
                        Iniciar sesion
                     </Button>
                  </Link>
                  <Link href="/signup">
                     <Button mx="20px" colorScheme="indigo">
                        Registrarse
                     </Button>
                  </Link>
                  {NavText("Descargar", "20px")}
               </>
            ) : (
               <>
                  <IconButton
                     fontSize="24px"
                     color="white"
                     colorScheme="indigo"
                     icon={<Icon as={FaUserCircle} name="user" />}
                  />
                  <Button onPress={onPress} colorScheme="indigo">
                     Logout
                  </Button>
               </>
            )}
         </VStack>
      </>
   );

   return (
      <Stack
         bg="#181A20"
         px={1}
         justifyContent="space-between"
         alignItems="center"
         w="100%"
         height="80px"
         flexDirection="row"
         backgroundColor="#181A20"
      >
         {isSmallScreen ? <Mobile /> : <Desktop />}
      </Stack>
   );
};
