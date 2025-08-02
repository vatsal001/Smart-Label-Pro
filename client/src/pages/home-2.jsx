import Head from "next/head";
import Layout from "@components/layout";
import settings from "@data/settings.json";
import LatestBlog from "@components/blog/posts";
import Promotions from "@components/promotions";
import Categories from "@components/categories";
import sliderData from "@data/slider/home-2.json";
import { ProductsTab } from "@components/product/feed";
import { SliderTwo as Slider } from "@components/slider";
import { client, blogsQuery, productsQuery, collectionsQuery } from "@graphql";

const HomeTwo = ({ blogs = [], products = [], collections = [] }) => {
  return (
    <Layout bg="gray250">
      <Head>
        <title>{"Home 2 :: " + settings?.title}</title>
        <meta name="description" content={settings?.description} />
      </Head>

      <Slider
        animate={true}
        data={sliderData}
        settings={{ effect: "fade", speed: 1000 }}
      />

      <Categories categories={collections} />

      <ProductsTab products={products} limit={8} />

      <Promotions fluid={true} />

      <LatestBlog posts={blogs} pt={[60, 60, 100]} />
    </Layout>
  );
};

export const getStaticProps = async () => {
  try {
    const blogsRes = await client(blogsQuery(4));
    const blogs = blogsRes?.blogs?.edges?.[0]?.node?.articles?.edges ?? [];

    const productsRes = await client(productsQuery(50));
    const products = productsRes?.products?.edges ?? [];

    const collectionsRes = await client(collectionsQuery(5));
    const collections = collectionsRes?.collections?.edges ?? [];

    return {
      props: {
        blogs,
        products,
        collections,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.log("❌ Error in getStaticProps for HomeTwo:", error);
    // return {
    //   notFound: true,
    // };
    return {
      props: {
        blogs: [],
        products: [],
        collections: [],
      },
      revalidate: 60,
    };
  }
};

export default HomeTwo;
