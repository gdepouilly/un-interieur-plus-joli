import * as CFRichTextTypes from "@contentful/rich-text-types";
import * as Contentful from "contentful";

export interface TypeArticleFields {
    titre: Contentful.EntryFields.Symbol;
    slug?: Contentful.EntryFields.Symbol;
    contenu: CFRichTextTypes.Block | CFRichTextTypes.Inline;
    illustration: Contentful.Asset;
}

export type TypeArticle = Contentful.Entry<TypeArticleFields>;
