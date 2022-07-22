import { Image } from "native-base";

const greenerLogo = require("../assets/logo-greener.svg");

export const MainLogo: React.FC<any> = () => (
   <Image
      resizeMode="contain"
      size={130}
      height={20}
      source={{ uri: greenerLogo.default.src }}
      alt="greener-logo"
      cursor="pointer"
      marginLeft="15px"
   />
);
