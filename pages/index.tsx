import { createClient } from "contentful";
import { GetStaticPropsResult } from "next";
import { TypeArticle, TypeArticleFields } from "../cf-types";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";

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

  console.log(result.items[0]);
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
          <li key={article.sys.id}>
            {" "}
            {article.fields.titre} <br />
            <Link href={"/articles/" + article.fields.slug}>
              <a>Détails</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Articles;
