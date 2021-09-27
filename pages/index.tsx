import { createClient } from "contentful";
import { GetStaticPropsResult } from "next";
import { TypeArticle, TypeArticleFields } from "../cf-types";
import { InferGetStaticPropsType } from 'next'


interface StaticProps {
  articles: TypeArticle[];
}

export async function getStaticProps(): Promise<GetStaticPropsResult<StaticProps>> {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || "foo",
    accessToken: process.env.CONTENTFUL_TOKEN || "foo"
  });

  const result = await client.getEntries<TypeArticleFields>();

  return {
    props: {
      articles: result.items
    }
  }
}


function Articles({ articles }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return <div>Articles list goes here
    <ul>
    { articles.map((article) => 
    <li key={article.fields.titre}> { article.fields.titre } </li>
    ) }
    </ul>
     </div>;
}

export default Articles; 
