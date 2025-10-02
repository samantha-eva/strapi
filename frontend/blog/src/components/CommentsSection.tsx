"use client";

import { useState } from "react";
import { Box, Button, Input, Textarea, VStack, Text } from "@chakra-ui/react";

type Comment = {
  id: number;
  authorName: string;
  content: string;
};

type CommentsSectionProps = {
  articleId: number;
  initialComments: Comment[];
};

export default function CommentsSection({ articleId, initialComments }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!authorName || !content) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.error("NEXT_PUBLIC_API_URL n'est pas défini !");
      return;
    }

    const res = await fetch(`${apiUrl}/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          article: articleId,
          authorName,
          content,
        },
      }),
    });

    if (res.ok) {
      const newComment = await res.json();
      setComments([...comments, { id: newComment.data.id, authorName, content }]);
      setAuthorName("");
      setContent("");
    } else {
      console.error("Erreur lors de l'ajout du commentaire");
    }
  }

  return (
    <Box mt={8} w="100%">
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Commentaires ({comments.length})
      </Text>

      {/* Liste des commentaires */}
      <VStack align="start" spacing={4} mb={6}>
        {comments.map((c) => (
          <Box key={c.id} p={3} borderWidth="1px" borderRadius="md" w="100%">
            <Text fontWeight="bold">{c.authorName}</Text>
            <Text>{c.content}</Text>
          </Box>
        ))}
      </VStack>

      {/* Formulaire d’ajout */}
      <form onSubmit={handleSubmit}>
        <VStack spacing={3} align="stretch">
          <Input
            placeholder="Votre nom"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
          <Textarea
            placeholder="Votre commentaire"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button type="submit" colorScheme="blue">
            Ajouter un commentaire
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
