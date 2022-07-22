import React from "react";
import { HStack } from "native-base";

import { MainLogo } from "./MainLogo";

export const SingleHeader: React.FC<any> = () => (
   <HStack
      bg="#181A20"
      px="1"
      justifyContent="space-between"
      alignItems="center"
      w="100%"
   >
      <HStack alignItems="center">
         <MainLogo />
      </HStack>
   </HStack>
);
