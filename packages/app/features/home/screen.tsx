import React from "react";

import { Navbar } from "app/components/Navbar";
import { useAuthUserContext } from "app/context/userAuth";

export function HomeScreen() {
   const { user, isLoading, isError } = useAuthUserContext();

   if (isError) return <p>Error message</p>; //check error message

   if (isLoading) return <p>...Spinner</p>;

   return (
      <div>
         <Navbar user={user} />
      </div>
   );
}

export default HomeScreen;
