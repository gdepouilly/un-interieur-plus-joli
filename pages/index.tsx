import { createClient, Entry } from "contentful";
import { GetStaticPropsResult } from "next";
import { TypeArticle } from "../cf-types";


export async function getStaticProps(): Promise<GetStaticPropsResult<Entry<TypeArticle>[]>> {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || "foo",
    accessToken: process.env.CONTENTFUL_TOKEN || "foo"
  });

  const result = await client.getEntries( { "content-type": "article"} );

  return {
    props: {
      articles: result.items
    }
  }
}


function Articles(): JSX.Element {
  return <div>Articles list goes here</div>;
}

export default Articles;
