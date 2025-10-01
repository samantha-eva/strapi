import { Container, Text } from "@chakra-ui/react";
import ArticleDetail from "@/components/ArticleDetail";

type Article = {
  id: number;
  title: string;
  content: string;
  slug: string;
  coverImage: { url: string };
  author: { name: string };
  publishedAt: string;
};

type Props = { params: { slug: string } };

async function fetchArticle(slug: string): Promise<Article | null> {
  const res = await fetch(
    `http://localhost:1337/api/articles?filters[slug][$eq]=${slug}&populate=coverImage&populate=author`,
    { cache: "no-store" }
  );
  const data = await res.json();
  if (!data?.data || data.data.length === 0) return null;

  const item = data.data[0];
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    publishedAt: item.publishedAt,
    coverImage: { url: item.coverImage?.formats?.large?.url ? `http://localhost:1337${item.coverImage.formats.large.url}` : "" },
    content: item.content,
    author: { name: item.author?.username || "Anonyme" },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await fetchArticle(params.slug);

  if (!article) return (
    <Container py={8}><Text>Aucun article trouvé.</Text></Container>
  );

  return (
    <Container maxW="container.md" py={8}>
      <ArticleDetail
        title={article.title}
        content={article.content}
        coverImageUrl={article.coverImage.url}
        authorName={article.author.name}
        publishedAt={article.publishedAt}
      />
    </Container>
  );
}
