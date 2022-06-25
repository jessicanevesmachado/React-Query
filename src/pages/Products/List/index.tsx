import React from "react";
import axios from "axios";
import { IProduct } from "../../../types/IProduct";
import { useQuery } from "react-query";
const fetchProduct = () => {
  return axios
    .get(`http://localhost:3333/products/`)
    .then((reponse) => reponse.data);
};

type ProductListProp = {
  onProductDetail: (id: number) => void;
};
export const ProductList = ({ onProductDetail }: ProductListProp) => {
  // ele faz Auto Refetching removendo erros de polling
  const { data: products, isLoading } = useQuery<IProduct[]>(["products"], () =>
    fetchProduct()
  );

  /* const [products, setProducts] = React.useState<IProduct[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setLoading(true);

    fetchProduct()
      .then((data) => {
        setProducts(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);*/

  if (isLoading || !products) {
    return <h1>Loading Products List...</h1>;
  }

  return (
    <div className="container">
      <h1> Products List</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>Detail</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>
                <a
                  href="#"
                  onClick={() => {
                    onProductDetail(product.id);
                  }}
                >
                  Detail
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
