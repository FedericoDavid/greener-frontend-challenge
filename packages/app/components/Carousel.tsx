import React, { useEffect, useState } from "react";
import { Box, Link, useToast } from "native-base";
import AliceCarousel from "react-alice-carousel";

import { useCryptoAPIClient } from "app/services/api/useCryptoAPIClient";
import { useFormatter } from "app/hooks/useFormatter";

interface CarouselProps {}

export const Carousel: React.FC<CarouselProps> = () => {
   const [trendingCoins, setTrendingCoins] = useState<Array<any>>([]);

   const cryptoAPIClient = useCryptoAPIClient();
   const { formatNumber } = useFormatter();
   const toast = useToast();

   const getTrendingCoins = async (): Promise<void> => {
      const res = await cryptoAPIClient.getTrendingCoins("usd");

      if (!res) {
         toast.show({
            title: "Ups! Something went wrong.",
            placement: "bottom",
         });
         return;
      }

      setTrendingCoins(res);
   };

   useEffect(() => {
      getTrendingCoins();
   }, []);

   const responsiveItems = {
      0: {
         items: 2,
      },
      512: {
         items: 4,
      },
   };

   const items = trendingCoins.map((coin) => {
      let profit = coin?.price_change_percentage_24h >= 0;

      return (
         <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            cursor="pointer"
            textTransform="uppercase"
            color="white"
         >
            <Link href={`/coins/${coin.id}`}>
               <img
                  src={coin?.image}
                  alt={coin.name}
                  height={80}
                  style={{ marginBottom: 10 }}
               />
            </Link>
            <span>
               {coin?.symbol}
               &nbsp;
               <span
                  style={{
                     color: profit ? "rgb(14, 203, 129)" : "red",
                     fontWeight: 500,
                  }}
               >
                  {profit && "+"}
                  {coin?.price_change_percentage_24h?.toFixed(2)}%
               </span>
            </span>
            <span style={{ fontSize: 22, fontWeight: 500 }}>
               {`$ ${formatNumber(coin?.current_price.toFixed(2))}`}
            </span>
         </Box>
      );
   });

   return (
      <Box
         display="flex"
         alignItems="center"
         margin="auto"
         marginTop="65px"
         width="80%"
      >
         <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1500}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsiveItems}
            items={items}
            autoPlay
         />
      </Box>
   );
};
