import React, { useEffect, useState } from "react";
import { createParam } from "solito";
import {
   Center,
   HStack,
   Spinner,
   Stack,
   useMediaQuery,
   useToast,
   VStack,
} from "native-base";
import ReactHtmlParser from "react-html-parser";

import { useCryptoAPIClient } from "app/services/api/useCryptoAPIClient";
import { Footer, MarketChart, SingleHeader } from "app/components";
import { useFormatter } from "app/hooks/useFormatter";

const { useParam } = createParam<{ id: string }>();

export function CoinDetailScren() {
   const [coin, setCoin] = useState<any>();
   const [isLoading, setIsLoading] = useState<boolean>();

   const [isSmallScreen] = useMediaQuery({ maxWidth: 768 });

   const { formatNumber } = useFormatter();
   const cryptoAPIClient = useCryptoAPIClient();
   const [coinId] = useParam("id");

   const toast = useToast();

   const getCoinDetails = async (): Promise<void> => {
      if (!coinId) return;

      setIsLoading(true);

      const res = await cryptoAPIClient.getCoinDetails(coinId);

      if (!res) {
         toast.show({
            title: "Ups! Something went wrong.",
            placement: "bottom",
         });

         setIsLoading(false);
         return;
      }

      setCoin(res);
      setIsLoading(false);
   };

   useEffect(() => {
      getCoinDetails();
   }, [coinId]);

   const CoinDetails = () => {
      let profit = coin?.price_change_percentage_24h >= 0;

      return (
         <Stack direction={isSmallScreen ? "column" : "row"} my="auto">
            <Stack
               direction="column"
               w={isSmallScreen ? "100%" : "35%"}
               borderRightWidth="2px"
               borderRightColor="gray.300"
            >
               <Center
                  height={200}
                  w="100%"
                  alignItems="center"
                  marginTop="20px"
               >
                  <img src={coin?.image.large} alt={coin?.name} height="200" />
               </Center>
               <Center
                  alignItems="center"
                  marginBottom={3}
                  _text={{
                     fontWeight: "bold",
                     fontSize: "48px",
                  }}
               >
                  {coin?.name}
               </Center>
               <Center
                  w="80%"
                  textAlign="justify"
                  marginX="auto"
                  marginBottom={5}
                  _text={{ fontSize: "16px" }}
               >
                  {ReactHtmlParser(
                     coin?.description.en.toString().split(". ")[0]
                  )}
               </Center>

               <HStack
                  justifyContent="space-around"
                  w="100%"
                  marginBottom={1}
                  flexDirection="row"
               >
                  <VStack
                     flexDirection="column"
                     mx="auto"
                     justifyContent="center"
                  >
                     <HStack flexDirection="column" my={1}>
                        <Center
                           _text={{ fontSize: 24, fontWeight: "bold" }}
                           paddingRight={3}
                        >
                           Rank:
                        </Center>
                        <Center _text={{ fontSize: 24 }}>
                           {formatNumber(coin?.market_cap_rank)}
                        </Center>
                     </HStack>
                     <HStack flexDirection="column" my={1}>
                        <Center
                           _text={{ fontSize: 24, fontWeight: "bold" }}
                           paddingRight={3}
                        >
                           Current Price:
                        </Center>
                        <Center _text={{ fontSize: 24 }}>
                           {`$${formatNumber(
                              coin?.market_data?.current_price["usd"]
                           )}`}
                        </Center>
                     </HStack>
                     <HStack flexDirection="column" my={1}>
                        <Center
                           _text={{ fontSize: 24, fontWeight: "bold" }}
                           paddingRight={3}
                        >
                           Max 24h:
                        </Center>
                        <Center _text={{ fontSize: 24 }}>
                           {`$${formatNumber(
                              coin?.market_data?.high_24h["usd"]
                           )}`}
                        </Center>
                     </HStack>
                  </VStack>
                  <VStack
                     flexDirection="column"
                     mx="auto"
                     my={1}
                     justifyContent="center"
                  >
                     <HStack flexDirection="column" my={1}>
                        <Center
                           _text={{ fontSize: 24, fontWeight: "bold" }}
                           paddingRight={3}
                        >
                           Market Cap:
                        </Center>
                        <Center _text={{ fontSize: 24 }}>
                           {`$${formatNumber(
                              coin?.market_data?.market_cap["usd"]
                                 .toString()
                                 .slice(0, 6)
                           )}M`}
                        </Center>
                     </HStack>
                     <HStack flexDirection="column" my={1}>
                        <Center
                           _text={{ fontSize: 24, fontWeight: "bold" }}
                           paddingRight={3}
                        >
                           Change 24h:
                        </Center>
                        <Center
                           _text={{
                              fontSize: 24,
                              color: profit ? "rgb(14, 203, 129)" : "red",
                           }}
                        >
                           {`${
                              profit ? "+" : ""
                           } ${coin?.market_data?.price_change_percentage_24h?.toFixed(
                              2
                           )}%`}
                        </Center>
                     </HStack>
                     <HStack flexDirection="column" my={1}>
                        <Center
                           _text={{ fontSize: 24, fontWeight: "bold" }}
                           paddingRight={3}
                        >
                           Low 24h:
                        </Center>
                        <Center _text={{ fontSize: 24 }}>
                           {`$${formatNumber(
                              coin?.market_data?.low_24h["usd"]
                           )}`}
                        </Center>
                     </HStack>
                  </VStack>
               </HStack>
            </Stack>
            <Stack
               w={isSmallScreen ? "100%" : "60%"}
               margin="auto"
               p={2}
               marginTop={isSmallScreen ? "20px" : ""}
            >
               <MarketChart coinId={coin?.id} />
            </Stack>
         </Stack>
      );
   };

   return (
      <>
         <SingleHeader />
         {!coin || isLoading ? (
            <Spinner color="indigo.500" size="lg" />
         ) : (
            <CoinDetails />
         )}
         <Footer />
      </>
   );
}
