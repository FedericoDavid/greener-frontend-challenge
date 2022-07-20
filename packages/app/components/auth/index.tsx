import React, { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

interface AuthProps {}

export const Auth: React.FC<AuthProps> = () => {
   const [index, setIndex] = useState(false);

   return <div>{!index ? <Signin /> : <Signup />}</div>;
};
