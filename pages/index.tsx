import { getContentfulClientApi } from "../helpers/getContentfulClientApi";
import { InferGetStaticPropsType, GetStaticProps } from "next";
import { TypeArticle, TypeArticleFields } from "../cf-types";
import ArticlePreview from "../components/ArticlePreview";

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
    <div>
      <ul>
        {articles.map((article: TypeArticle) => (
          <ArticlePreview key={article.sys.id} article={article} />
        ))}
      </ul>
    </div>
  );
}
