import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "core/assets/images/arrow.svg";
import ProductPrice from "core/components/ProductPrice";
import { Product } from "core/types/Product";
import { makeRequest } from "core/utils/request";
import ProductDescriptionLoader from "../Loader/ProductDescriptionLoader";
import ProductInfoLoader from "../Loader/ProductInfoLoader";
import "./styles.scss";

type ParamsType = {
  productId: string;
};

const ProductDetails = () => {
  const { productId } = useParams<ParamsType>();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    makeRequest({ url: `/products/${productId}` })
      .then((response) => setProduct(response.data))
      .finally(() => setIsLoading(false));
  }, [productId]);
  return (
    <div className="producs-details-container">
      <div className="card-base border-radius-20 producs-details">
        <Link to="/products" className="product-details-goback">
          <ArrowIcon className="icon-goback" />
          <h1 className="text-goback">VOLTAR</h1>
        </Link>
        <div className="row product-details-card">
          <div className="col-6 pr-5">
            {isLoading ? (
              <ProductInfoLoader/>
            ) : (
              <>
                <div className="product-details-card text-center">
                  <img
                    src={product?.imgUrl}
                    alt={product?.name}
                    className="product-details-image"
                  />
                </div>
                <h1 className="product-details-name">{product?.name}</h1>
                {product?.price && <ProductPrice price={product?.price} />}
              </>
            )}
          </div>
          <div className="col-6 product-details-card">
            {isLoading ? (
              <ProductDescriptionLoader/>
            ) : (
              <>
                <h1 className="product-description-title">
                  Decri????o do Produto
                </h1>
                <p className="product-description-text">
                  {product?.description}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
