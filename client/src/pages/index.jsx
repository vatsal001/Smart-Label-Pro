import Head from "next/head";
import Layout from "@components/layout";
import settings from "@data/settings.json";
import LatestBlog from "@components/blog/posts";
import Promotions from "@components/promotions";
import Categories from "@components/categories";
import sliderData from "@data/slider/home-1.json";
import { ProductsTab } from "@components/product/feed";
import { SliderOne as Slider } from "@components/slider";
import { client, blogsQuery, productsQuery, collectionsQuery } from "@graphql";

const Home = ({ blogs, products, collections }) => {
  return (
    <Layout>
      <Head>
        <title>{settings?.title}</title>
        <meta name="description" content={settings?.description} />
      </Head>

      <Slider animate={true} data={sliderData} />

      <Categories categories={collections} />

      <ProductsTab products={products} limit={8} />

      <Promotions />

      <LatestBlog posts={blogs} pt={[60, 60, 100]} />
    </Layout>
  );
};

export const getStaticProps = async () => {
  try {
    const blogsData = await client(blogsQuery(4)),
      blogs = blogsData?.blogs?.edges[0]?.node?.articles?.edges || [],
      productsData = await client(productsQuery(50)),
      products = productsData?.products?.edges || [],
      collectionsData = await client(collectionsQuery(5)),
      collections = collectionsData?.collections?.edges || [];

    const collectionsTest = [
      {
        node: {
          id: "1",
          title: "Product Labels on sheet",
          handle: "Product Labels on sheet",
          image: {
            originalSrc: "/images/categories/beverages.png",
          },
        },
      },
      {
        node: {
          id: "2",
          title: "Barcodes",
          handle: "Barcodes",
          image: {
            originalSrc: "/images/categories/snacks.png",
          },
        },
      },
      {
        node: {
          id: "3",
          title: "Roll Labels",
          handle: "Roll Labels",
          image: {
            originalSrc: "/images/categories/personal-care.png",
          },
        },
      },
      {
        node: {
          id: "4",
          title: "Vinyl Banners",
          handle: "Vinyl Banners",
          image: {
            originalSrc: "/images/categories/household.png",
          },
        },
      },
      {
        node: {
          id: "5",
          title: "Signs",
          handle: "Signs",
          image: {
            originalSrc: "/images/categories/pet-supplies.png",
          },
        },
      },
    ];
    const products1 = [
      {
        node: {
          id: "prod-1",
          title: "Product Labels on Sheets (Labels and Stickers)",
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
                  originalSrc: "/images/product/SLP 1.jpg",
                  altText: "Classic Green Tea",
                },
              },
              {
                node: {
                  originalSrc: "/images/product/SLP 2.jpg",
                  altText: "Classic Green Tea",
                },
              },
              {
                node: {
                  originalSrc: "/images/product/SLP 2.jpg",
                  altText: "Classic Green Tea",
                },
              },
            ],
          },
        },
      },
      {
        node: {
          id: "prod-2",
          title: "Protein Energy Bar",
          handle: "protein-bar",
          tags: ["sale"],
          variants: {
            edges: [
              {
                node: {
                  id: "var-2",
                  title: "Single / Brown / Plastic",
                  sku: "PB-SINGLE",
                  priceV2: { amount: "2.50" },
                  compareAtPriceV2: null,
                  quantityAvailable: 30,
                  selectedOptions: [
                    { name: "Size", value: "Single" },
                    { name: "Color", value: "Brown" },
                    { name: "Material", value: "Plastic" },
                  ],
                },
              },
            ],
          },
          images: {
            edges: [
              {
                node: {
                  originalSrc: "/images/products/protein-bar.jpg",
                  altText: "Protein Bar",
                },
              },
            ],
          },
        },
      },
      {
        node: {
          id: "prod-3",
          title: "Reusable Water Bottle",
          handle: "reusable-bottle",
          tags: ["tending"],
          variants: {
            edges: [
              {
                node: {
                  id: "var-3",
                  title: "1L / Blue / Steel",
                  sku: "WB-1L",
                  priceV2: { amount: "15.00" },
                  compareAtPriceV2: { amount: "18.00" },
                  quantityAvailable: 15,
                  selectedOptions: [
                    { name: "Size", value: "1L" },
                    { name: "Color", value: "Blue" },
                    { name: "Material", value: "Steel" },
                  ],
                },
              },
            ],
          },
          images: {
            edges: [
              {
                node: {
                  originalSrc: "/images/products/water-bottle.jpg",
                  altText: "Water Bottle",
                },
              },
            ],
          },
        },
      },
    ];

    return {
      props: {
        blogs: [],
        products: products1,
        collections: collectionsTest,
      },
      revalidate: 60,
    };
  } catch (er) {
    return {
      props: {
        blogs: [],
        products: products1,
        collections: collectionsTest,
      },
      revalidate: 60,
    };
  }
};

export default Home;
