import Image from "next/image";
import Logo from "../public/images/logo.png";
import Navbar from "./Navbar";

import { Box } from "@chakra-ui/react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <Box>
      <Image src={Logo} alt="logo of the author" />
      <Navbar />
      <div className="page-content">{children}</div>
    </Box>
  );
}
