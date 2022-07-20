import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

interface AuthProps {}

export const Auth: React.FC<AuthProps> = () => {
   const [index, setIndex] = useState(true);

   return <div>{!index ? <SignIn /> : <SignUp />}</div>;
};
