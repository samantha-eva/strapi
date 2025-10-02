// app/ClientLayout.tsx
"use client";

import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider>
      {/* Navbar visible sur toutes les pages */}
      <Navbar />

      {/* Contenu de la page */}
      {children}
    </ChakraProvider>
  );
}
