import React, { useEffect, useState } from "react";
import { createParam } from "solito";
import ReactHtmlParser from "react-html-parser";

import { useCryptoAPIClient } from "app/services/api/useCryptoAPIClient";
import { Box, Spinner, Text, useMediaQuery, useToast } from "native-base";
import { Footer, SingleHeader } from "app/components";

const { useParam } = createParam<{ id: string }>();

export function CoinDetailScren() {
   const [coin, setCoin] = useState<any>();
   const [isLoading, setIsLoading] = useState<boolean>();

   const [isSmallScreen] = useMediaQuery({ maxWidth: 768 });

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

      console.log(res);

      setCoin(res);
      setIsLoading(false);
   };

   useEffect(() => {
      getCoinDetails();
   }, []);

   return (
      <>
         <SingleHeader />
         <div
            style={{
               display: "flex",
               flexDirection: isSmallScreen ? "column" : "row",
               alignItems: isSmallScreen ? "center" : "",
            }}
            // display="flex"
            // flexDirection={isSmallScreen ? "column" : "row"}
            // alignItems={isSmallScreen ? "center" : null}
         >
            {isLoading ? (
               <Spinner color="indigo.500" size="lg" />
            ) : (
               <div
                  style={{
                     width: isSmallScreen ? "100%" : "30%",
                     display: "flex",
                     alignItems: "center",
                     marginTop: 25,
                     borderRightWidth: "2px",
                     borderRightColor: "gray.300",
                  }}
                  // width={isSmallScreen ? "100%" : "30%"}
                  // display="flex"
                  // flexDirection="column"
                  // alignItems="center"
                  // marginTop={25}
                  // borderRightColor="gray.300"
               >
                  <img
                     src={coin?.image.large}
                     alt={coin?.name}
                     height="200"
                     style={{ marginBottom: 20 }}
                  />
                  <Text size="2xl" bold marginBottom={20}>
                     {coin?.name}
                  </Text>
                  <Text
                     size="xl"
                     bold
                     width="100%"
                     padding={25}
                     paddingBottom={15}
                     paddingTop={0}
                     textAlign="justify"
                  >
                     {coin?.name}
                  </Text>
                  <Text
                     w="100%"
                     padding={25}
                     paddingBottom={15}
                     paddingTop={0}
                     textAlign="justify"
                  >
                     {ReactHtmlParser(
                        coin?.description.en.toString().split(". ")[0]
                     )}
                  </Text>
               </div>
            )}
         </div>
         <Footer />
      </>
   );
}
