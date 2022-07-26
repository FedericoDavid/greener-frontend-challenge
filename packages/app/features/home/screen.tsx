import React, { useState, useEffect } from "react";
import { Spinner, useMediaQuery, useToast } from "native-base";
import "react-alice-carousel/lib/alice-carousel.css";

import { Footer, Hero, MainList, Navbar } from "app/components";

import { useAuthUserContext } from "app/context/userAuth";
import { useCryptoAPIClient } from "app/services/api/useCryptoAPIClient";

export function HomeScreen() {
   const [trendingCoins, setTrendingCoins] = useState<Array<any>>([]);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const [isSmallScreen] = useMediaQuery({ maxWidth: 768 });
   const toast = useToast();

   const cryptoAPIClient = useCryptoAPIClient();
   const { user, userIsLoading, logoutUser } = useAuthUserContext();

   const getTrendingCoins = async (): Promise<void> => {
      setIsLoading(true);

      const res = await cryptoAPIClient.getTrendingCoins("usd");

      if (!res) {
         toast.show({
            title: "Ups! Something went wrong.",
            placement: "bottom",
         });

         setIsLoading(false);
         return;
      }

      setTrendingCoins(res);
      setIsLoading(false);
   };

   useEffect(() => {
      getTrendingCoins();
   }, []);

   return (
      <>
         <Navbar
            user={user}
            onPress={() => logoutUser()}
            isSmallScreen={isSmallScreen}
         />
         {isLoading || userIsLoading ? (
            <Spinner color="indigo.500" size="lg" />
         ) : (
            <>
               <Hero
                  isSmallScreen={isSmallScreen}
                  trendingCoins={trendingCoins}
               />
               <MainList trendingCoins={trendingCoins} />
            </>
         )}
         <Footer />
      </>
   );
}

export default HomeScreen;
