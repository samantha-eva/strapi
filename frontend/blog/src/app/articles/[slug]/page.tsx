// app/articles/[slug]/page.tsx
import { Container, Text } from "@chakra-ui/react";
import ArticleDetail from "@/components/ArticleDetail";
import CommentsSection from "@/components/CommentsSection";

type Article = {
  id: number;
  title: string;
  content: string;
  slug: string;
  coverImage: { url: string };
  author: { name: string };
  publishedAt: string;
  comments?: { id: number; authorName: string; content: string }[];
};

type Props = { params: { slug: string } };

// Fetch article depuis Strapi
async function fetchArticle(slug: string): Promise<Article | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL n'est pas défini dans .env.local");

  const res = await fetch(
    `${apiUrl}/api/articles?filters[slug][$eq]=${slug}&populate=coverImage&populate=author&populate=comments`,
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
    coverImage: { 
      url: item.coverImage?.formats?.large?.url 
        ? `${apiUrl}${item.coverImage.formats.large.url}` 
        : "" 
    },
    content: item.content,
    author: { name: item.author?.username || "Anonyme" },
    comments: item.comments || []
  };
}

// Composant page détail
export default async function ArticlePage(props: Props) {
  const { slug } = await props.params; // ⚡ Next.js App Router nécessite await pour params
  const article = await fetchArticle(slug);

  if (!article) {
    return (
      <Container py={8}>
        <Text>Aucun article trouvé.</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      <ArticleDetail
        title={article.title}
        content={article.content}
        coverImageUrl={article.coverImage.url}
        authorName={article.author.name}
        publishedAt={article.publishedAt}
      />

      <CommentsSection
        initialComments={article.comments || []}
      />
    </Container>
  );
}
