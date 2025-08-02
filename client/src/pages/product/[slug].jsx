import Head from "next/head";
import settings from "@data/settings";
import { useRouter } from "next/router";
import Layout from "@components/layout";
import Loader from "@components/ui/loader";
import Breadcrumb from "@components/ui/breadcrumb";
import { Fragment, useState, useEffect } from "react";
import { client, productsQuery, productQuery } from "@graphql";
import ProductDetailsContent from "@components/product/details";
import RelatedProducts from "@components/product/feed/related-products";
import ProductDescriptionReview from "@components/product/details/desc-review";

const ProductDetailsPage = ({ products, product }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  console.log(product, products);
  useEffect(() => {
    const handleStart = (url) =>
      url !== router.pathname ? setIsLoading(true) : setIsLoading(false);
    const handleComplete = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <Layout>
      <Head>
        <title>{product?.title + " :: " + settings?.title}</title>
        <meta name="description" content={settings?.title} />
      </Head>

      <Breadcrumb
        py={[60, 80]}
        mb={[60, null, 100]}
        pageTitle={product?.title}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <ProductDetailsContent product={product} />

          {/* <ProductDescriptionReview product={product} mt={[55, null, 93]} /> */}

          {/* <RelatedProducts
            products={products}
            tags={product?.tags}
            mt={[48, null, 85]}
            categories={product?.collections?.edges}
          /> */}
        </Fragment>
      )}
    </Layout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;
  const product1 = await client(productQuery(slug));
  const product = {
    node: {
      id: "prod-1",
      title: "Product Labels on Sheets",
      handle: "classic-green-tea",
      tags: ["new", "featured"],
      variants: {
        edges: [
          {
            node: {
              id: "var-1",
              title: "250g / Green / Paper",
              sku: "GT250G",
              priceV2: { amount: "9.99" },
              compareAtPriceV2: { amount: "14.99" },
              quantityAvailable: 10,
              selectedOptions: [
                { name: "Size", value: "250g" },
                { name: "Color", value: "Green" },
                { name: "Material", value: "Paper" },
              ],
            },
          },
        ],
      },
      images: {
        edges: [
          {
            node: {
              originalSrc: "/images/products/green-tea.jpg",
              altText: "Classic Green Tea",
            },
          },
        ],
      },
    },
  };
  const products = await client(productsQuery());

  if (!product) {
    throw new Error(`Product with slug '${slug}' not found`);
  }

  if (!products) {
    throw new Error(`Products fetching error!`);
  }

  return {
    props: {
      product: product,
      products: []
    },
  };
};

export default ProductDetailsPage;
