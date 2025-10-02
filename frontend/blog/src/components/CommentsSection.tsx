"use client";

import { useState, useEffect } from "react";
import { Box, Button, Textarea, VStack, Text } from "@chakra-ui/react";

type Comment = {
  id: number;
  authorName: string;
  content: string;
};

type CommentsSectionProps = {
  initialComments: Comment[];
};

type User = {
  jwt: string;
  username: string;
};

export default function CommentsSection({ initialComments }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [content, setContent] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("Vous devez être connecté pour commenter.");
      return;
    }
    if (!content) {
      setError("Le commentaire ne peut pas être vide.");
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      setError("Erreur de configuration");
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.jwt}`,
        },
        body: JSON.stringify({
          data: {
            content,
            authorName: user.username,
          },
        }),
      });

      if (res.ok) {
        const newComment = await res.json();
        setComments([...comments, { id: newComment.data.id, authorName: user.username, content }]);
        setContent("");
      } else {
        setError("Erreur lors de l'ajout du commentaire");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'ajout du commentaire");
    }
  }

  return (
    <Box mt={8} w="100%">
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Commentaires ({comments.length})
      </Text>

      <VStack align="start" spacing={4} mb={6}>
        {comments.map((c) => (
          <Box key={c.id} p={3} borderWidth="1px" borderRadius="md" w="100%">
            <Text fontWeight="bold">{c.authorName}</Text>
            <Text>{c.content}</Text>
          </Box>
        ))}
      </VStack>

      {user ? (
        <form onSubmit={handleSubmit}>
          <VStack spacing={3} align="stretch">
            <Textarea
              placeholder="Votre commentaire"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <Button type="submit" colorScheme="blue">
              Ajouter un commentaire
            </Button>
          </VStack>
        </form>
      ) : (
        <Text color="gray.500">Connectez-vous pour ajouter un commentaire.</Text>
      )}

      {error && <Text color="red.500" mt={2}>{error}</Text>}
    </Box>
  );
}
