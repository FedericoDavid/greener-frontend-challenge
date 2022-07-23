import React, { useState, useEffect } from "react";
import {
   Avatar,
   Box,
   FlatList,
   Heading,
   HStack,
   Spacer,
   useToast,
   Text,
   Center,
} from "native-base";

import { useCryptoAPIClient } from "app/services/api/useCryptoAPIClient";
import { useFormatter } from "app/hooks/useFormatter";

interface MainListProps {}

export const MainList: React.FC<MainListProps> = () => {
   const [coinList, setCoinList] = useState<any[]>([]);
   const [isLoading, setIsloading] = useState<boolean>(false);

   const cryptoAPIClient = useCryptoAPIClient();
   const { formatNumber } = useFormatter();
   const toast = useToast();

   const getCoinList = async (): Promise<void> => {
      setIsloading(true);

      const res = await cryptoAPIClient.getCoinList("usd");

      if (!res) {
         toast.show({
            title: "Ups! Something went wrong.",
            placement: "bottom",
         });
         return;
      }

      console.log(res);
      setCoinList(res);
   };

   useEffect(() => {
      getCoinList();
   }, []);

   const ListHeader = () => (
      <HStack
         width="100%"
         space={3}
         justifyContent="space-around"
         alignItems="center"
         textAlign="center"
         height="50px"
         backgroundColor="#6366F1"
         marginBottom="5px"
         _text={{
            color: "#fff",
         }}
      >
         <Center w="50" />
         <Center w="40">
            <Text bold fontSize={16} color="white">
               Name
            </Text>
         </Center>
         <Center w="50">
            <Text bold fontSize={16} color="white">
               Symbol
            </Text>
         </Center>
         <Center>
            <Text bold fontSize={16} color="white">
               Current Price
            </Text>
         </Center>
         <Center>
            <Text bold fontSize={16} w="100%" color="white">
               Total Market Cap
            </Text>
         </Center>
      </HStack>
   );

   const renderTable = () => (
      <Box display="flex" margin="auto" marginTop="20px" width="80%">
         <Heading p="4" pb="3" alignItems="start">
            <Text bold fontSize="2xl">
               Cryptocurrency Prices by Market Cap
            </Text>
         </Heading>
         <ListHeader />
         <FlatList<any>
            data={coinList}
            keyExtractor={(coin) => coin.id}
            renderItem={({ item }: { item: any }) => (
               <Box
                  borderBottomWidth="1"
                  borderColor="coolGray.200"
                  pl="4"
                  pr="5"
                  py="2"
                  textAlign="center"
               >
                  <HStack
                     space={3}
                     justifyContent="space-between"
                     alignItems="center"
                     textAlign="center"
                  >
                     <Center w="20">
                        <Avatar
                           size="48px"
                           source={{
                              uri: item?.image,
                           }}
                        />
                     </Center>
                     <Center w="20">
                        <Text bold fontSize={16}>
                           {item?.name}
                        </Text>
                     </Center>
                     <Center w="20">
                        <Text bold fontSize={16} textTransform="uppercase">
                           {item?.symbol}
                        </Text>
                     </Center>
                     <Center w="60">
                        <Text bold fontSize={16}>
                           ${formatNumber(item?.current_price.toFixed(2))}
                        </Text>
                     </Center>
                     <Center>
                        <Text bold fontSize={16}>
                           $
                           {formatNumber(
                              item?.market_cap.toString().slice(0, -6)
                           )}
                           M
                        </Text>
                     </Center>
                  </HStack>
               </Box>
            )}
         />
      </Box>
   );

   return renderTable();
};
