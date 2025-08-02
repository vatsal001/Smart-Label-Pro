import { GraphQLClient } from "graphql-request";

const client = async (query, variables) => {
  const endpoint = `https://localhost:5000`;

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
  });

  return await [];
};

export default client;
