import React from "react";
import Link from "next/link";
import * as CFRichTextTypes from "@contentful/rich-text-types";
import { TypeArticle } from "../cf-types";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { pipe, slice } from "ramda";
import { Box, Heading, HStack, Tag, Text, WrapItem } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import Image from "next/image";

const getFirstChararacters = (content: string) => slice(0, 100, content);

function getArticleCard(
  articleContent: CFRichTextTypes.Block | CFRichTextTypes.Inline
) {
  return pipe(documentToPlainTextString, getFirstChararacters)(articleContent);
}
interface ArticleCardProps {
  article: TypeArticle;
}

export default function ArticleCard(props: ArticleCardProps): JSX.Element {
  return (
    <WrapItem
      key={props.article.sys.id}
      width={{ base: "100%", sm: "45%", md: "45%", lg: "30%" }}
    >
      <Box w="100%">
        <Box borderRadius="lg" overflow="hidden" maxHeight="250">
          <Box h="200" w="200" className="foo" position="relative">
            <Image
              src={"https:" + props.article.fields.illustration.fields.file.url}
              layout="fill"
              objectFit="cover"
              alt={"article image"}
            />
          </Box>
        </Box>
        <HStack spacing={2} marginTop="3">
          {props.article.fields.tags?.map((tag) => (
            <Tag size={"md"} colorScheme="orange" key={tag}>
              {" "}
              {tag}{" "}
            </Tag>
          ))}
        </HStack>
        <Heading fontSize="xl" marginTop="2">
          <Link href={`/articles/${props.article.fields.slug}`} passHref>
            <a>{props.article.fields.titre}</a>
          </Link>
        </Heading>
        <Text fontWeight="medium" color="gray.400" fontSize="sm" marginTop="3">
          <CalendarIcon />{" "}
          {new Date(props.article.sys.createdAt).toLocaleDateString("fr-FR")}
        </Text>
        <Text as="p" fontSize="md" marginTop="2">
          {getArticleCard(props.article.fields.contenu)}
        </Text>
      </Box>
    </WrapItem>
  );
}
