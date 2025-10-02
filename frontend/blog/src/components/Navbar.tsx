"use client";

import { Box, Flex, Button, Heading, Spacer, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [user, setUser] = useState<{ username: string; jwt: string } | null>(null);

  // Vérifier si le JWT est dans localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <Flex as="nav" bg="blue.500" color="white" p={4} align="center">
      <Heading size="md">MonBlog</Heading>
      <Spacer />
      {user ? (
        <>
          <Text mr={4}>Bonjour, {user.username}</Text>
          <Button colorScheme="red" variant="outline" onClick={handleLogout}>
            Déconnexion
          </Button>
        </>
      ) : (
        <Button colorScheme="green" variant="solid" onClick={() => window.location.href = "/login"}>
          Connexion
        </Button>
      )}
    </Flex>
  );
}
