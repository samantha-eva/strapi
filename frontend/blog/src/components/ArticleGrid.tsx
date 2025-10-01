import { SimpleGrid } from "@chakra-ui/react";
import ArticleCard from "./ArticleCard";

type Article = {
  id: number;
  title: string;
  slug: string;
  coverImage: { url: string };
  content:string;
  author: { name: string };
  publishedAt: string;
};

type ArticleGridProps = {
  articles: Article[];
};

export default function ArticleGrid({ articles }: ArticleGridProps) {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          slug={article.slug}
          title={article.title}
          coverImageUrl={article.coverImage.url}
          content={article.content}
          authorName={article.author.name}
          publishedAt={article.publishedAt}
        />
      ))}
    </SimpleGrid>
  );
}
