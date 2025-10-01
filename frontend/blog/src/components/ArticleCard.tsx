import { Box, Image, Text, VStack, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";

type ArticleCardProps = {
  slug: string;
  title: string;
  content: string; // HTML content
  coverImageUrl: string;
  authorName: string;
  publishedAt: string;
};

export default function ArticleCard({
  slug,
  title,
  coverImageUrl,
  authorName,
  publishedAt,
  content
}: ArticleCardProps) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      _hover={{ shadow: "lg" }}
      bg="white"
    >
      {/* Image cliquable */}
      <Link href={`/articles/${slug}`} passHref>
        <ChakraLink display="block">
          <Image
            src={coverImageUrl}
            alt={title}
            width="100%"
            height="200px"
            objectFit="cover"
          />
        </ChakraLink>
      </Link>

      <VStack align="start" spacing={2} p={4}>
        {/* Title cliquable */}
        <Link href={`/articles/${slug}`} passHref>
          <ChakraLink>
            <Text fontWeight="bold" fontSize="xl">{title}</Text>
          </ChakraLink>
        </Link>

        <Text fontSize="sm" color="gray.600">{authorName}</Text>
        <Text fontSize="sm" color="gray.500">{new Date(publishedAt).toLocaleDateString()}</Text>

        {/* Content HTML tronqué */}
        <Box
            fontSize="md"
            color="gray.700"
            display="-webkit-box"
            overflow="hidden"
            sx={{
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
            }}
            >
            {Array.isArray(content) ? content[0]?.children?.[0]?.text : content}
        </Box>

        {/* Lire la suite */}
        <Link href={`/articles/${slug}`} passHref>
          <ChakraLink color="blue.500" fontSize="sm">
            Lire la suite →
          </ChakraLink>
        </Link>
      </VStack>
    </Box>
  );
}
