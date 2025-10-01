import { Box, Heading, Text, Image, VStack } from "@chakra-ui/react";

type ArticleDetailProps = {
  title: string;
  content: string;
  coverImageUrl: string;
  authorName: string;
  publishedAt: string;
};

export default function ArticleDetail({
  title,
  content,
  coverImageUrl,
  authorName,
  publishedAt,
}: ArticleDetailProps) {
  return (
    <VStack align="start" spacing={6} maxW="800px" mx="auto" py={8}>
      <Heading as="h1">{title}</Heading>
      <Text color="gray.600">{authorName} - {new Date(publishedAt).toLocaleDateString()}</Text>
      <Image src={coverImageUrl} alt={title} borderRadius="md" />
      <Box className="prose" dangerouslySetInnerHTML={{ __html: content }} />
    </VStack>
  );
}
