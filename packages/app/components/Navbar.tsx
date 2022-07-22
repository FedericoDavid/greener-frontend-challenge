import React from "react";
import { Link } from "solito/link";
import {
   HStack,
   Image,
   Text,
   View,
   Box,
   Button,
   useMediaQuery,
   StatusBar,
   Icon,
   IconButton,
} from "native-base";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";

import { User } from "app/context/userAuth";

const greenerLogo = require("../../app/assets/logo-greener.svg");
interface NavbarProps {
   user: User;
}

export const Navbar: React.FC<NavbarProps> = ({ user }) => {
   const [isSmallScreen] = useMediaQuery({ maxWidth: 768 });

   const Logo = (): JSX.Element => (
      <Image
         resizeMode="contain"
         size={130}
         height={20}
         source={{ uri: greenerLogo.default.src }}
         alt="greener-logo"
         cursor="pointer"
         marginLeft="15px"
      />
   );

   const NavText = (label: string, marginRight?: string) => (
      <Text
         color="#fff"
         fontWeight="bold"
         marginRight={marginRight ?? ""}
         cursor="pointer"
      >
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
            <Logo />
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
                  <Link href="signin">
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
                     icon={<Icon as={FaUserCircle} name="user" />}
                  />
                  <Button marginRight="20px">Registrarse</Button>
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
               <Logo />
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
