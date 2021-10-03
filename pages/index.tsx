import { createClient } from "contentful";
import { GetStaticPropsResult } from "next";
import { TypeArticle, TypeArticleFields } from "../cf-types";
import { InferGetStaticPropsType } from "next";
import ArticlePreview from "../components/ArticlePreview";

interface StaticProps {
  articles: TypeArticle[];
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<StaticProps>
> {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || "foo",
    accessToken: process.env.CONTENTFUL_TOKEN || "foo",
  });

  const result = await client.getEntries<TypeArticleFields>();

  return {
    props: {
      articles: result.items,
    },
  };
}

function Articles({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <div>
      <ul>
        {articles.map((article) => (
          <ArticlePreview key={article.sys.id} article={article} />
        ))}
      </ul>
    </div>
  );
}

export default Articles;
