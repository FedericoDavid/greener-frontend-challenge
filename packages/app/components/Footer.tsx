import { Center, HStack } from "native-base";
import React from "react";

export const Footer: React.FC = () => (
   <HStack space={3} justifyContent="center">
      <Center
         h="20"
         w="100%"
         bg="#181A20"
         shadow={3}
         _text={{
            fontSize: "16px",
            textAlign: "center",
         }}
      >
         CryptoCurrencies Greener © 2022
      </Center>
   </HStack>
);
