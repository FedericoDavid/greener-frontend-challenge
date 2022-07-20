import React from "react";
import { Link } from "solito/link";
import { Flex, Image } from "native-base";

const greenerLogo = require("../../app/assets/logo-greener.svg");

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
   return (
      <Flex direction="row" px={6}>
         <Image
            resizeMode="contain"
            size={140}
            height={20}
            source={{ uri: greenerLogo.default.src }}
            alt="greener-logo"
            cursor="pointer"
         />
      </Flex>
   );
};
