import React from "react";
import Link from "next/link";
import * as CFRichTextTypes from "@contentful/rich-text-types";
import { TypeArticle } from "../cf-types";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { pipe, slice } from "ramda";

const getTwentyFirstChararacters = (content: string) => slice(0, 20, content);

function getArticlePreview(
  articleContent: CFRichTextTypes.Block | CFRichTextTypes.Inline
) {
  return pipe(
    documentToPlainTextString,
    getTwentyFirstChararacters
  )(articleContent);
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
      <p>{getArticlePreview(props.article.fields.contenu)}</p>
      <Link href={`/articles/${props.article.fields.slug}`}>
        <a>Lire la suite</a>
      </Link>
      <br />
    </div>
  );
}
