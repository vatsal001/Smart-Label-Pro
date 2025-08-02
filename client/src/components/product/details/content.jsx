import { useProduct } from "@hooks";
import PropTypes from "prop-types";
import cogoToast from "cogo-toast";
import { useDispatch } from "react-redux";
import { CURRENCY } from "@utils/constant";
import { useState, useEffect } from "react";
import Select from "@components/ui/select";
import Button from "@components/ui/button";
import { excerpt, toCapitalize } from "@utils/method";
import settings from "@data/settings";
import {
  IoLogoTwitter,
  IoLogoLinkedin,
  IoLogoFacebook,
  IoIosHeartEmpty,
  IoIosGitCompare,
} from "react-icons/io";
import {
  ProductSKU,
  ContentWrap,
  ProductName,
  ProductPrices,
  ProductRatings,
  ProductSwatches,
  ProductSwatchItem,
  ProductSocialShare,
  ProductActionButton,
  QuantityIncDecButton,
} from "@components/product/details/details.style";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import Ratings from "@components/product/details/rating";
import { addToCartAction } from "@global/actions/cartAction";
import Input from "@components/ui/input";
import { Col, Form, InputGroup, Row } from "@bootstrap";
import { FormWrap } from "@components/auth/auth.style";
import { InputField } from "@components/checkout/checkout-form.style";

const ProductDetailsContent = ({ product, ...props }) => {
  let { title, description, variants, options } = product.node;
  variants = variants?.edges;
  const dispatch = useDispatch();
  const shortDesc = excerpt(title, 40);
  const [selectedOptions, setSelectedOptions] = useState({});
  console.log(product);
  const {
    sku,
    stock,
    price,
    isStock,
    quantity,
    variations,
    isDiscounted,
    isInWishlist,
    compareAtPrice,
    isInCompareList,
    onVariantHandler,
    onCompareHandler,
    onWishlistHandler,
    onIncrementQuantity,
    cartProductQuantity,
    onDecrementQuantity,
  } = useProduct(product);

  const onAddToCartHandler = (rest) => {
    dispatch(addToCartAction(rest));
    cogoToast.success(`${rest?.title} is added to cart.`, {
      position: "top-right",
      heading: "Successfully Add!",
      hideAfter: 3,
    });
  };

  //   useEffect(() => {
  //     if (variants && variants?.length) {
  //       options.forEach((option) => {
  //         setSelectedOptions((prevValue) => {
  //           return {
  //             ...prevValue,
  //             [option?.name]: {
  //               value: option?.values[0],
  //               label: toCapitalize(option?.values[0]),
  //             },
  //           };
  //         });
  //       });
  //     }
  //   }, [variants, options]);

  useEffect(() => {
    if (Object.keys(selectedOptions).length > 1) {
      onVariantHandler(selectedOptions);
    }
  }, [selectedOptions]);

  return (
    <ContentWrap {...props}>
      {/* <ProductSKU>
        <strong>Availability: </strong>
        {isStock ? "Out of Stock" : `${stock - cartProductQuantity} in Stock`}
      </ProductSKU> */}
      <ProductName>{title}</ProductName>
      {/*<ProductRatings>*/}
      {/*    <Ratings ratings={ratings}/>*/}
      {/*</ProductRatings>*/}

      <ProductPrices>
        {isDiscounted ? (
          <>
            <del className="price old">{CURRENCY + compareAtPrice} </del>
            <span className="price new">{CURRENCY + price}</span>
          </>
        ) : (
          <span className="price new">{CURRENCY + price}</span>
        )}
      </ProductPrices>
      <Form>
        <InputField>
          <Row>
            <Col md={3}>
              <Input
                id="width"
                name="width"
                type="width"
                required={true}
                label="Width (Inch)"
                // value={defaultValue?.password}
                // onChange={onInputChange}
              />
            </Col>

            <Col md={3}>
              <Input
                id="height"
                name="height"
                type="height"
                required={true}
                label="Height (Inch)"
                // value={defaultValue?.password}
                // onChange={onInputChange}
              />
            </Col>
            <Col md={6}>
              <Input
                id="quality"
                name="quality"
                type="quality"
                required={true}
                label="Quantity"
                // value={defaultValue?.password}
                // onChange={onInputChange}
              />
            </Col>
          </Row>
        </InputField>
        <InputField className="mt-2">
          <Row>
            <Col md={6}>
              <Select
                label="Shape"
                name="shape"
                id="shape"
                options={settings.shape}
              />
            </Col>
            <Col md={6}>
              <Select
                label="Orientation"
                name="orientation"
                id="orientation"
                options={settings.orientation}
              />
            </Col>
            <Col md={6}>
              <Select
                label="Material Type"
                name="material_type"
                id="material_type"
                options={settings.material_type}
              />
            </Col>
            <Col md={6}>
              <Select
                label="Lamination"
                name="lamination"
                id="lamination"
                options={settings.lamination}
              />
            </Col>
            <Col md={6}>
              <Select
                label="Batch Code / Best Before"
                name="batch_code"
                id="batch_code"
                options={settings.batch_code}
              />
            </Col>
            <Col md={6}>
              <Select
                label="Design Adjustment"
                name="design_adjustment"
                id="design_adjustment"
                options={settings.design_adjustment}
              />
            </Col>
            <Col md={6}>
              <Select
                label="Hire Designer"
                name="hire_designer"
                id="hire_designer"
                options={settings.hire_designer}
              />
            </Col>
          </Row>
        </InputField>
      </Form>

      <ProductActionButton>
        <div className="quantity-cart-button">
          {/* <QuantityIncDecButton>
            <button
              className="btn btn-decrement"
              onClick={() => onDecrementQuantity()}
              style={{ pointerEvents: quantity === 1 ? "none" : "visible" }}
            >
              <CgMathMinus />
            </button>
            <input type="text" value={quantity} size={stock} readOnly />
            <button
              className="btn btn-increment"
              onClick={() => onIncrementQuantity()}
              style={{ pointerEvents: quantity === stock ? "none" : "visible" }}
            >
              <CgMathPlus />
            </button>
          </QuantityIncDecButton> */}

          {/* <Button
            tag="button"
            bg="primary"
            color="white"
            hvrBg="secondary"
            className="btn-cart"
            style={{
              opacity: isStock ? 0.6 : 1,
              pointerEvents: isStock ? "none" : "visible",
            }}
            onClick={() =>
              onAddToCartHandler({
                ...product,
                price,
                quantity,
                variations,
              })
            }
          >
            {isStock ? "Out of Stock" : "Add to Cart"}
          </Button> */}
          <div className="">
            <h5>Estimated Shipping Cost</h5>
            <InputField>
              <Row>
                <Col md={6}>
                  <Input
                    id="country"
                    name="country"
                    type="country"
                    required={true}
                    label="Country"
                    // value={defaultValue?.password}
                    // onChange={onInputChange}
                  />
                </Col>

                <Col md={6}>
                  <Input
                    id="height"
                    name="height"
                    type="height"
                    required={true}
                    label="Parish"
                    // value={defaultValue?.password}
                    // onChange={onInputChange}
                  />
                </Col>
              </Row>
            </InputField>
          </div>
        </div>
        <p>
          A product label is an essential component of a product's packaging. It
          serves as a means of communicating important information to the
          consumer about the product they are purchasing. A label typically
          includes the product name, brand, and a brief description of what the
          product is or does. Additionally, labels may contain nutritional
          information, usage instructions, and any warnings or precautions that
          the consumer should be aware of. Our product labels are made of
          durable vinyl material and is designed to be affixed to the product in
          a manner that is easy to read and understand. The label may also
          include a barcode or QR code, which can be scanned for more detailed
          product information or to track the item's origin and destination. In
          addition to providing valuable information to the consumer, a printed
          product label can also serve as a means of branding and marketing for
          the product. A well-designed label can help to distinguish the product
          from its competitors and catch the eye of potential customers.
          Overall, a product label plays an important role in both informing and
          attracting consumers, making it a vital component of any product's
          packaging. Labels for all your business needs. • Perfect for product
          packaging and branding merchandise • Shapes and sizes for almost any
          need • Label stocks: white paper and white/clear vinyl • Can be
          printed on sheets or convenient rolls(Roll Labels) • Estimated
          Delivery Time - 5 Business Days
        </p>
        <div className="wishlist-compare-button">
          <button
            className="btn btn--wishlist"
            onClick={() => onWishlistHandler()}
          >
            <IoIosHeartEmpty />{" "}
            {!isInWishlist ? "Add to wishlist" : "Remove from wishlist"}
          </button>
          <button
            className="btn btn--compare"
            onClick={() => onCompareHandler()}
          >
            <IoIosGitCompare />{" "}
            {!isInCompareList ? "Add to Compare" : "Remove from compare"}
          </button>
        </div>
      </ProductActionButton>
    </ContentWrap>
  );
};

ProductDetailsContent.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductDetailsContent;
