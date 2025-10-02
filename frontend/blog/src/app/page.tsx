import { Container, Heading, Text, Button, HStack } from "@chakra-ui/react";
import Link from "next/link";
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

async function fetchArticles(page: number = 1): Promise<{ articles: Article[]; pageCount: number }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL n'est pas défini dans .env.local");

  const res = await fetch(
    `${apiUrl}/api/articles?filters[publishStatus][$eq]=published&populate=coverImage&populate=comments&populate=author&pagination[page]=${page}&pagination[pageSize]=6`,
    { cache: "no-store" }
  );

  const data = await res.json();

  if (!data?.data) return { articles: [], pageCount: 1 };

  const articles = data.data.map((item: Item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    publishedAt: item.publishedAt,
    coverImage: {
      url: item.coverImage?.formats?.large?.url
        ? `${apiUrl}${item.coverImage.formats.large.url}`
        : "",
    },
    content: item.content,
    author: { name: item.author?.username || "Anonyme" },
  }));

  return {
    articles,
    pageCount: data.meta?.pagination?.pageCount || 1,
  };
}

type Props = {
  searchParams?: { [key: string]: string | undefined };
};

export default async function Home({ searchParams }: Props) {
  // ⚡ Lecture sécurisée de la page (par défaut = 1)
  const currentPage = parseInt(searchParams?.page ?? "1", 10);

  // Récupération des articles
  const { articles, pageCount } = await fetchArticles(currentPage);

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={8}>Tous les articles</Heading>

      {articles.length > 0 ? (
        <>
          <ArticleGrid articles={articles} />

          {/* Pagination */}
          <HStack mt={8} spacing={2} justify="center" flexWrap="wrap">
            {currentPage > 1 && (
              <Link href={`/?page=${currentPage - 1}`}>
                <Button size="sm">Précédent</Button>
              </Link>
            )}

            {Array.from({ length: pageCount }).map((_, i) => {
              const page = i + 1;
              return (
                <Link key={page} href={`/?page=${page}`}>
                  <Button
                    size="sm"
                    variant={page === currentPage ? "solid" : "outline"}
                    colorScheme={page === currentPage ? "blue" : "gray"}
                  >
                    {page}
                  </Button>
                </Link>
              );
            })}

            {currentPage < pageCount && (
              <Link href={`/?page=${currentPage + 1}`}>
                <Button size="sm">Suivant</Button>
              </Link>
            )}
          </HStack>
        </>
      ) : (
        <Text>Aucun article publié pour le moment.</Text>
      )}
    </Container>
  );
}
