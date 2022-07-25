import React, { useState, useEffect } from "react";
import {
   Avatar,
   Box,
   FlatList,
   Heading,
   Text,
   Center,
   useToast,
   Input,
   Spinner,
   ScrollView,
   Stack,
   Link,
} from "native-base";

import { useCryptoAPIClient } from "app/services/api/useCryptoAPIClient";
import { useFormatter } from "app/hooks/useFormatter";

interface MainListProps {
   trendingCoins: Array<any>;
}

export const MainList: React.FC<MainListProps> = ({ trendingCoins }) => {
   const [coinsList, setCoinsList] = useState<Array<any>>([]);
   const [search, setSearch] = useState<string>("");
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const { formatNumber } = useFormatter();
   const cryptoAPIClient = useCryptoAPIClient();

   const toast = useToast();

   const getCoinsList = async (): Promise<void> => {
      setIsLoading(true);

      if (search.length !== 0) {
         const res = await cryptoAPIClient.getCoinList("usd");

         if (!res) {
            toast.show({
               title: "Ups! Something went wrong.",
               placement: "bottom",
            });
            return;
         }

         const searchResult = res.filter(
            (coin) =>
               coin.name.toLowerCase().includes(search) ||
               coin.symbol.toLowerCase().includes(search)
         );

         setCoinsList(searchResult);
         setIsLoading(false);
      } else {
         setCoinsList(trendingCoins);
         setIsLoading(false);
      }
   };

   useEffect(() => {
      getCoinsList();
   }, [search]);

   useEffect(() => {
      setCoinsList(trendingCoins);
   }, [trendingCoins]);

   const ListHeader = () => (
      <Stack
         direction="row"
         minWidth="100%"
         space={3}
         alignItems="center"
         height="50px"
         backgroundColor="#6366F1"
         marginBottom="5px"
         _text={{
            color: "#fff",
         }}
      >
         <Center w="10%" />
         <Center
            w="20%"
            _text={{
               fontWeight: "bold",
               fontSize: 16,
               color: "white",
               width: "100%",
               textAlign: "left",
            }}
         >
            Name
         </Center>
         <Center
            w="10%"
            _text={{
               fontWeight: "bold",
               fontSize: 16,
               color: "white",
               width: "100%",
            }}
         >
            Symbol
         </Center>
         <Center
            w="20%"
            _text={{
               fontWeight: "bold",
               fontSize: 16,
               color: "white",
               width: "100%",
               textAlign: "center",
            }}
         >
            Current Price
         </Center>
         <Center
            w="35%"
            _text={{
               fontWeight: "bold",
               fontSize: 16,
               color: "white",
               width: "100%",
               textAlign: "center",
            }}
         >
            Total Market Cap
         </Center>
      </Stack>
   );

   return (
      <Box display="flex" margin="auto" marginTop="20px" width="80%">
         <Heading p="4" pb="3" alignItems="start">
            <Text bold fontSize="2xl">
               Cryptocurrency Prices by Market Cap
            </Text>
            <Input
               variant="outline"
               placeholder="Search..."
               onChangeText={(value) => setSearch(value)}
               width="100%"
               height="50px"
               justifyContent="center"
               fontSize="16px"
               marginTop="15px"
               marginBottom="15px"
            />
         </Heading>
         {isLoading ? (
            <Spinner color="indigo.500" size="lg" />
         ) : (
            <ScrollView
               horizontal={true}
               width="100%"
               _contentContainerStyle={{
                  mb: "8",
                  minW: "100%",
               }}
            >
               <Box minHeight="300px" width="100%">
                  <ListHeader />
                  <FlatList
                     data={coinsList}
                     keyExtractor={(coin) => coin.id}
                     renderItem={({ item }: { item: any }) => (
                        <Link
                           href={`/coin/${item.id}`}
                           _hover={{
                              bg: "coolGray.100",
                           }}
                        >
                           <Box
                              borderBottomWidth="1"
                              borderColor="coolGray.200"
                              pl="4"
                              pr="5"
                              py="2"
                              width="100%"
                           >
                              <Stack
                                 direction="row"
                                 space={3}
                                 justifyContent="space-between"
                                 alignItems="center"
                              >
                                 <Center w="10%">
                                    <Avatar
                                       size="48px"
                                       source={{
                                          uri: item?.image,
                                       }}
                                    />
                                 </Center>
                                 <Center
                                    w="20%"
                                    _text={{
                                       fontWeight: "bold",
                                       fontSize: 16,
                                       textAlign: "left",
                                       width: "100%",
                                    }}
                                 >
                                    {item?.name}
                                 </Center>
                                 <Center
                                    w="20%"
                                    _text={{
                                       fontWeight: "bold",
                                       fontSize: 16,
                                       textAlign: "left",
                                       width: "100%",
                                       textTransform: "uppercase",
                                    }}
                                 >
                                    {item?.symbol}
                                 </Center>
                                 <Center
                                    w="25%"
                                    _text={{
                                       fontWeight: "bold",
                                       fontSize: 16,
                                       textAlign: "left",
                                       width: "100%",
                                    }}
                                 >
                                    {`$${formatNumber(
                                       item?.current_price.toFixed(2)
                                    )}`}
                                 </Center>
                                 <Center
                                    w="35%"
                                    _text={{
                                       fontWeight: "bold",
                                       fontSize: 16,
                                       width: "100%",
                                       textAlign: "left",
                                    }}
                                 >
                                    {`$${formatNumber(
                                       item?.market_cap.toString().slice(0, -6)
                                    )}M`}
                                 </Center>
                              </Stack>
                           </Box>
                        </Link>
                     )}
                  />
               </Box>
            </ScrollView>
         )}
      </Box>
   );
};
