import React from "react";
import axios from "axios";
import { IProduct } from "../../../types/IProduct";
import { useQuery } from "react-query";

const fetchProduct = (id: number) => {
  return axios
    .get(`http://localhost:3333/products/${id}`)
    .then((reponse) => reponse.data);
};

export type ProductDetailProps = {
  id: number;
  onProductList: () => void;
};
export const ProductDetails = ({ id, onProductList }: ProductDetailProps) => {
  const { data: product, isLoading } = useQuery<IProduct>(
    [`products/${id}`],
    () => fetchProduct(id)
  );

  /* const [product, setProduct] = React.useState<IProduct>();
  const [isLoading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setLoading(true);

    fetchProduct(1)
      .then((data) => {
        setProduct(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
*/
  if (isLoading || !product) {
    return <h1>Loading Product...</h1>;
  }

  return (
    <div className="container">
      <a
        href="#"
        onClick={() => {
          onProductList();
        }}
      >
        Voltar para a lista de produtos
      </a>

      <div className="row">
        <label>ID:</label>
        {product?.id}
      </div>

      <div className="row">
        <label>Name:</label>
        {product?.name}
      </div>

      <div className="row">
        <label>Price:</label>
        {product?.price}
      </div>

      <div className="row">
        <label>Description:</label>
        {product?.description}
      </div>

      <div className="row">
        <label>Image:</label>
        <img alt="Imagem" src={product?.image}></img>
      </div>
    </div>
  );
};
