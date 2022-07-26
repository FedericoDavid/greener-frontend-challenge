import React from "react";
import { Link } from "solito/link";
import {
   HStack,
   Text,
   View,
   Box,
   Button,
   StatusBar,
   Icon,
   IconButton,
} from "native-base";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";

import { User } from "app/context/userAuth";
import { MainLogo } from "./MainLogo";
interface NavbarProps {
   user: User;
   isSmallScreen?: boolean;
   onPress?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
   user,
   isSmallScreen,
   onPress,
}) => {
   const NavText = (label: string, marginRight?: string) => (
      <Text color="#fff" marginRight={marginRight ?? ""} cursor="pointer" bold>
         {label}
      </Text>
   );

   const renderDesktop = () => (
      <HStack
         bg="#181A20"
         px="1"
         justifyContent="space-between"
         alignItems="center"
         w="100%"
         backgroundColor="#181A20"
      >
         <HStack justifyContent="space-between" width="50%" alignItems="center">
            <MainLogo />
            {NavText("Buy cripto")}
            {NavText("Market")}
            {NavText("Trading")}
            {NavText("Earn")}
            {NavText("Finances")}
            {NavText("NFT")}
         </HStack>
         <HStack alignItems="center">
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
                  <Button mx={2} onPress={onPress} colorScheme="indigo">
                     Logout
                  </Button>
               </>
            )}
         </HStack>
      </HStack>
   );

   const renderMobile = () => (
      <View>
         <StatusBar backgroundColor="#181A20" />
         <Box safeAreaTop bg="#181A20" />
         <HStack
            bg="#181A20"
            px="1"
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            maxW="768px"
         >
            <HStack alignItems="center">
               <MainLogo />
            </HStack>
            <HStack>
               <IconButton
                  fontSize="24px"
                  color="white"
                  icon={<Icon as={GiHamburgerMenu} name="menu" />}
               />
            </HStack>
         </HStack>
      </View>
   );

   return <>{isSmallScreen ? renderMobile() : renderDesktop()}</>;
};
