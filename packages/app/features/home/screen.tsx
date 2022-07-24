import React, { useState, useEffect } from "react";
import { useMediaQuery, useToast } from "native-base";
import "react-alice-carousel/lib/alice-carousel.css";

import { Hero, MainList, Navbar } from "app/components";

import { useAuthUserContext } from "app/context/userAuth";
import { useCryptoAPIClient } from "app/services/api/useCryptoAPIClient";

export function HomeScreen() {
   const [trendingCoins, setTrendingCoins] = useState<Array<any>>([]);

   const [isSmallScreen] = useMediaQuery({ maxWidth: 768 });
   const toast = useToast();

   const cryptoAPIClient = useCryptoAPIClient();
   const { user, userIsLoading, isError } = useAuthUserContext();

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

   if (isError) return <p>Error message</p>; //check error message

   if (userIsLoading) return <p>...Spinner</p>;

   return (
      <div>
         <Navbar user={user} isSmallScreen={isSmallScreen} />
         <Hero isSmallScreen={isSmallScreen} trendingCoins={trendingCoins} />
         <MainList trendingCoins={trendingCoins} />
      </div>
   );
}

export default HomeScreen;
