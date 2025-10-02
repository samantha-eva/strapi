"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

// La définition de l'animation n'est plus ici, mais dans globals.css

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isLargerThanMD] = useMediaQuery("(min-width: 768px)");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      setError("Erreur de configuration");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/api/auth/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem(
          "user",
          JSON.stringify({ jwt: data.jwt, username: data.user.username })
        );
        router.push("/");
      } else {
        setError(data.error?.message || "Email ou mot de passe incorrect");
      }
    } catch (err) {
      setError("Erreur de connexion, veuillez réessayer");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient="linear(to-r, blue.50, indigo.100)"
      p={4}
    >
      <Flex
        maxW="6xl"
        w="full"
        mx="auto"
        bg="white"
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="2xl"
      >
        {/* Panneau avec l'animation */}
        {isLargerThanMD && (
          <Flex
            flex={1}
            bgGradient="linear(to-br, teal.400, blue.600)"
            p={12}
            align="center"
            justify="center"
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bgGradient="linear(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3))"
              bgSize="200% 200%"
              // On utilise le nom de l'animation défini dans globals.css
              animation="gradient-shift 5s ease infinite"
            />
            <VStack zIndex={1} color="white" textAlign="center" spacing={4}>
              <Heading fontSize="4xl" fontWeight="bold">
                Bienvenue !
              </Heading>
              <Text fontSize="xl">
                Connectez-vous pour accéder à votre espace personnel.
              </Text>
            </VStack>
          </Flex>
        )}

        {/* Panneau avec le formulaire */}
        <Box flex={1} p={12}>
          <VStack spacing={6} align="stretch" as="form" onSubmit={handleSubmit}>
            <Heading textAlign="center" mb={2} fontSize="3xl" color="blue.800">
              Connexion
            </Heading>
            <Text textAlign="center" mb={6} fontSize="lg" color="gray.600">
              Entrez vos identifiants pour continuer
            </Text>

            <FormControl isRequired>
              <FormLabel fontSize="lg" fontWeight="semibold" color="gray.700">
                Email
              </FormLabel>
              <Input
                placeholder="votre@email.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                fontSize="md"
                h={16}
                borderRadius="md"
                focusBorderColor="blue.500"
                _focus={{ boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.5)" }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="lg" fontWeight="semibold" color="gray.700">
                Mot de passe
              </FormLabel>
              <InputGroup size="md">
                <Input
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fontSize="md"
                  h={16}
                  borderRadius="md"
                  focusBorderColor="blue.500"
                  _focus={{ boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.5)" }}
                />
                <InputRightElement h="full">
                  <IconButton
                    aria-label="Afficher le mot de passe"
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              w="full"
              size="lg"
              fontSize="lg"
              h={16}
              borderRadius="md"
              isLoading={isLoading}
              loadingText="Connexion en cours"
              mt={4}
            >
              Se connecter
            </Button>

            {error && (
              <Text color="red.500" fontSize="md" textAlign="center" mt={2}>
                {error}
              </Text>
            )}
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
}