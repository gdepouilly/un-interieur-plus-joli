import { getContentfulClientApi } from "../helpers/getContentfulClientApi";
import { InferGetStaticPropsType, GetStaticProps } from "next";
import { TypeArticle, TypeArticleFields } from "../cf-types";
import ArticleCard from "../components/ArticleCard";
import { Container, Heading, Divider, Wrap } from "@chakra-ui/react";

export const getStaticProps: GetStaticProps = async () => {
  const client = getContentfulClientApi();

  const result = await client.getEntries<TypeArticleFields>({
    content_type: "article",
  });

  return {
    props: {
      articles: result.items,
    },
    revalidate: 10,
  };
};

export default function Articles({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <Container maxW={"7xl"} p="12">
      <Heading as="h2" marginTop="5">
        Derniers articles
      </Heading>
      <Divider marginTop="5" />
      <Wrap spacing="30px" marginTop="5">
        {articles.map((article: TypeArticle) => (
          <ArticleCard key={article.sys.id} article={article} />
        ))}
      </Wrap>
    </Container>
  );
}
