import React from "react";
import { Box, Link } from "native-base";
import AliceCarousel from "react-alice-carousel";

import { useFormatter } from "app/hooks/useFormatter";

interface CarouselProps {
   trendingCoins: Array<any>;
   isSmallScreen?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
   trendingCoins,
   isSmallScreen,
}) => {
   const { formatNumber } = useFormatter();

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
            <Link href={`/coin/${coin.id}`}>
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
         marginTop={isSmallScreen ? "50" : "65px"}
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
