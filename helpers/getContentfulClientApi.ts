import { ContentfulClientApi, createClient } from "contentful";

export const getContentfulClientApi = (): ContentfulClientApi => {
  return createClient({
    space: process.env.CONTENTFUL_SPACE_ID || "spaceId",
    accessToken:
      (process.env.CONTENTFUL_PREVIEW_ENABLED
        ? process.env.CONTENTFUL_PREVIEW_TOKEN
        : process.env.CONTENTFUL_TOKEN) || "token",
    host: process.env.CONTENTFUL_PREVIEW_ENABLED
      ? "preview.contentful.com"
      : "cdn.contentful.com",
  });
};
