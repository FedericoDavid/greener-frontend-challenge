import React from "react";
import "react-alice-carousel/lib/alice-carousel.css";

import { useAuthUserContext } from "app/context/userAuth";
import { Hero, MainList, Navbar } from "app/components";
import { useMediaQuery } from "native-base";

export function HomeScreen() {
   const { user, isLoading, isError } = useAuthUserContext();
   const [isSmallScreen] = useMediaQuery({ maxWidth: 768 });

   if (isError) return <p>Error message</p>; //check error message

   if (isLoading) return <p>...Spinner</p>;

   return (
      <div>
         <Navbar user={user} isSmallScreen={isSmallScreen} />
         <Hero isSmallScreen={isSmallScreen} />
         <MainList />
      </div>
   );
}

export default HomeScreen;
