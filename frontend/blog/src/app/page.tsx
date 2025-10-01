import { Container, Heading, Text } from "@chakra-ui/react";
import ArticleGrid from "../components/ArticleGrid";
import { Item } from "@/types/Item";

type Article = {
  id: number;
  title: string;
  content: string;
  slug: string;
  coverImage: { url: string };
  author: { name: string };
  publishedAt: string;
};

// Fonction pour récupérer les articles publiés depuis Strapi
async function fetchArticles(): Promise<Article[]> {
  const res = await fetch(
    "http://localhost:1337/api/articles?filters[publishStatus][$eq]=published&populate=coverImage&populate=comments&populate=author",
    { cache: "no-store" }
  );

  const data = await res.json();
  console.log('samantha data', data);

  if (!data?.data) return [];

  return data.data.map((item: Item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    publishedAt: item.publishedAt,
    coverImage: { url: 'http://localhost:1337' + item.coverImage?.formats.large.url || "" },
    content: item.content,
    author: { name: item.author?.username || "Anonyme" },
  }));
}

// Composant de la page d'accueil
export default async function Home() {
  const articles = await fetchArticles();

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={8}>Tous les articles</Heading>

      {articles.length > 0 ? (
        <ArticleGrid articles={articles} />
      ) : (
        <Text>Aucun article publié pour le moment.</Text>
      )}
    </Container>
  );
}
