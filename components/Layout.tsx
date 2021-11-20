import Image from "next/image";
import Logo from "../public/images/logo.png";
import Navbar from "./Navbar";

import { Box, Center } from "@chakra-ui/react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <Box>
      <Center>
        <Image src={Logo} alt="logo of the author" />
      </Center>
      <Navbar />
      <div className="page-content">{children}</div>
    </Box>
  );
}
