import { getContentfulClientApi } from "../../helpers/getContentfulClientApi";
import { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from "next";
import { TypeArticleFields } from "../../cf-types";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import { BLOCKS} from "@contentful/rich-text-types";



const renderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      return (
        <Image
          src={`https://${node.data.target.fields.file.url}`}
          height={node.data.target.fields.file.details.image.height}
          width={node.data.target.fields.file.details.image.width}
          alt={node.data.target.fields.description}
        />
      );
    },
  },
};

const client = getContentfulClientApi();

export const getStaticPaths: GetStaticPaths = async () => {
  const { items } = await client.getEntries<TypeArticleFields>({
    content_type: "article",
  });

  const paths = items.map((item) => ({
    params: { slug: item.fields.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const result = await client.getEntries<TypeArticleFields>({
    content_type: "article",
    "fields.slug": context.params?.slug,
  });

  if (!result.items.length) {
    return {
      props: {},
    };
  }

  return {
    props: { article: result.items[0] },
    revalidate: 10,
  };
};


export default function ArticleDetails(
  props: InferGetStaticPropsType<typeof getStaticProps>
): JSX.Element {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  if (!props.article) {
    return <DefaultErrorPage statusCode={404} />;
  }

  // Render article
  const { titre, contenu, illustration } = props.article.fields;
  return (
    <div>
      <h3>{titre}</h3>
      <Image
        src={"https:" + illustration.fields.file.url}
        width={illustration.fields.file.details.image.width}
        height={illustration.fields.file.details.image.height}
        alt="article-image"
      />
      <>{documentToReactComponents(contenu, renderOptions)}</>
    </div>
  );
}
