import React from "react";
import Link from "next/link";
import { TypeArticle } from "../cf-types";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { pipe } from "ramda";

function getFirstCharacters(content: string) {
  return content.substring(0, 20);
}

interface ArticlePreviewProps {
  article: TypeArticle;
}

export default function ArticlePreview(
  props: ArticlePreviewProps
): JSX.Element {
  return (
    <div>
      {props.article.fields.titre}
      <p>
        {pipe(
          documentToPlainTextString,
          getFirstCharacters
        )(props.article.fields.contenu)}
      </p>
      <Link href={"/articles/" + props.article.fields.slug}>
        <a>Lire la suite</a>
      </Link>
      <br />
    </div>
  );
}
