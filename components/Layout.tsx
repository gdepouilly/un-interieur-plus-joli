import Image from "next/image";
import Logo from "../public/images/logouninterieur.png";
import Navbar from "./Navbar";

import { Box, Center } from "@chakra-ui/react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <Box>
      <Center>
        <Image src={Logo} alt="logo of the author" width="298" height="198"/>
      </Center>
      <Navbar />
      <div className="page-content">{children}</div>
    </Box>
  );
}
