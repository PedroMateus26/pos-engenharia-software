import Pagination from "core/components/Pagination";
import { ProductResponse, Product } from "core/types/Product";
import { makeRequest } from "core/utils/request";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "../Card";

type Props = {
  product: Product;
};

const List = () => {
  const [productResponse, setProductResponse] = useState<ProductResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);

  console.log(productResponse);

  useEffect(() => {
    console.log(productResponse);

    const params = {
      page: activePage,
      linesPerPage: 4,
    };

    setIsLoading(true);
    makeRequest({ url: "/products", params })
      .then((response) => setProductResponse(response.data))
      .finally(() => {
        setIsLoading(false);
      });
  }, [activePage]);

  const history = useHistory();
  const handleCreate = () => {
    history.push("/admin/product/create");
  };

  return (
    <div className="admin-product-list">
      <button className="btn btn-primary btn-lg" onClick={handleCreate}>
        ADICIONAR
      </button>
      <div className="admin-list-container">
        {productResponse?.content.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
      {productResponse && (
        <Pagination
          totalPages={productResponse.totalPages}
          activePage={activePage}
          onChange={(page) => setActivePage(page)}
        />
      )}
    </div>
  );
};

export default List;
