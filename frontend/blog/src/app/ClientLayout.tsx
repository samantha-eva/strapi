"use client";

import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
