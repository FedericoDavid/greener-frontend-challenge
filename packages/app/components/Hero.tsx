import React from "react";
import { Box, Text, Image } from "native-base";
import { Carousel } from "./Carousel";

const background = require("../assets/hero-background.jpg");

interface HeroProps {
   trendingCoins: Array<any>;
   isSmallScreen?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isSmallScreen, trendingCoins }) => (
   <div style={{ height: "500px" }}>
      <Image
         source={{ uri: background.default.src }}
         size="100%"
         resizeMode="cover"
         alt="background-hero"
      />
      <Box
         paddingTop={25}
         display="flex"
         flexDirection="column"
         justifyContent="space-around"
         bottom={455}
      >
         <Box
            display="flex"
            height="40%"
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
         >
            <Text fontSize="5xl" bold marginBottom={13} color="white">
               CryptoCurrencies Greener
            </Text>
            <Text fontSize="xl" color="white">
               Buy, Trade & Hold More Than 10k Cryptocurrencies
            </Text>
         </Box>
         <Carousel
            trendingCoins={trendingCoins}
            isSmallScreen={isSmallScreen}
         />
      </Box>
   </div>
);
