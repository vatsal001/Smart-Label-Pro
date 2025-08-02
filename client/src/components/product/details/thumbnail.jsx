import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import Image from "@components/ui/image";
import Slider, { Slide } from "@components/ui/swiper";
import {
  ProductThumbGallery,
  ProductThumbNav,
} from "@components/product/details/details.style";

const ProductDetailsThumb = ({ thumbnails }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const thumbGalleryConfig = {
    pagination: false,
    thumbs: {
      swiper: thumbsSwiper,
    },
  };

  const thumbNavConfig = {
    freeMode: true,
    slidesPerView: 4,
    spaceBetween: 10,
    pagination: false,
    navigation: thumbnails?.length > 4,
    watchSlidesProgress: true,
    onSwiper: setThumbsSwiper,
    watchSlidesVisibility: true,
  };
  console.log(thumbnails, "thumbnails");
  return (
    <Fragment>
      <ProductThumbGallery>
        <Slider settings={thumbGalleryConfig}>
          {thumbnails?.map((image) => (
            <Slide key={image?.node?.originalSrc}>
              <figure>
                <Image
                  width={600}
                  height={500}
                  //   layout="fill"
                  alt="furns"
                  src={image?.node?.originalSrc}
                />
              </figure>
            </Slide>
          ))}
        </Slider>
      </ProductThumbGallery>

      {thumbnails?.length > 1 && (
        <ProductThumbNav>
          <Slider settings={{ ...thumbNavConfig }}>
            {thumbnails?.map((image) => (
              <Slide key={image?.node?.id}>
                <figure>
                  <Image
                    width={600}
                    height={500}
                    alt="furns"
                    src={image?.node?.originalSrc}
                  />
                </figure>
              </Slide>
            ))}
          </Slider>
        </ProductThumbNav>
      )}
    </Fragment>
  );
};

ProductDetailsThumb.propTypes = {
  thumbnails: PropTypes.array.isRequired,
};

export default ProductDetailsThumb;
