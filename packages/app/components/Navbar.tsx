import React from "react";
import { Link } from "solito/link";
import {
   HStack,
   Image,
   Text,
   Center,
   View,
   Box,
   Button,
   useMediaQuery,
   StatusBar,
   Icon,
   IconButton,
} from "native-base";
import { GiHamburgerMenu } from "react-icons/gi";

const greenerLogo = require("../../app/assets/logo-greener.svg");

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
   const [isSmallScreen] = useMediaQuery({ maxWidth: 412 });

   const Logo = (): JSX.Element => (
      <Image
         resizeMode="contain"
         size={130}
         height={20}
         source={{ uri: greenerLogo.default.src }}
         alt="greener-logo"
         cursor="pointer"
      />
   );

   const NavText = ({ label }): JSX.Element => (
      <Text color="#fff" fontWeight="bold">
         {label}
      </Text>
   );

   const renderDesktopNavbar = () => (
      <HStack space={4} backgroundColor="#181A20">
         {isSmallScreen && "holaaa"}
         <Center w="130" marginLeft="30px">
            <Logo />
         </Center>
         <Center w="20">
            <NavText label="Buy cripto" />
         </Center>
         <Center w="20">
            <NavText label="Market" />
         </Center>
         <Center w="20">
            <NavText label="Trading" />
         </Center>
         <Center w="20">
            <NavText label="Earn" />
         </Center>
         <Center w="20">
            <Text>Finances</Text>
         </Center>
         <Center w="20">
            <Text>NFT</Text>
         </Center>
         <Center flexDirection="row" width="50%" justifyContent="flex-end">
            <Button mx="20px">Iniciar sesion</Button>
            <Button marginRight="20px">Registrarse</Button>
         </Center>
      </HStack>
   );

   const renderMobileNavbar = () => (
      <View>
         <StatusBar backgroundColor="#181A20" />
         <Box safeAreaTop bg="#181A20" />
         <HStack
            bg="#181A20"
            px="1"
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            maxW="412"
         >
            <HStack alignItems="center">
               <Logo />
            </HStack>
            <HStack>
               <IconButton
                  fontSize="24px"
                  color="white"
                  icon={<Icon as={GiHamburgerMenu} name="favorite" />}
               />
            </HStack>
         </HStack>
      </View>
   );

   return <>{isSmallScreen ? renderMobileNavbar() : renderDesktopNavbar()}</>;
};
