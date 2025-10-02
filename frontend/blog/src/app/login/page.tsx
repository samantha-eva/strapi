"use client";

import { useState } from "react";
import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState(""); // email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Stocker le JWT et le username
        localStorage.setItem("user", JSON.stringify({ jwt: data.jwt, username: data.user.username }));
        router.push("/"); // redirection vers la page d'accueil
      } else {
        setError(data.message[0].messages[0].message || "Erreur de connexion");
      }
    } catch (err) {
      setError("Erreur de connexion");
    }
  }

  return (
    <Box maxW="sm" mx="auto" mt={20} p={6} borderWidth="1px" borderRadius="md">
      <Heading mb={6}>Connexion</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Input
            placeholder="Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <Input
            placeholder="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" colorScheme="blue" w="full">Se connecter</Button>
          {error && <Text color="red.500">{error}</Text>}
        </VStack>
      </form>
    </Box>
  );
}
