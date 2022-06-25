import React, { useState } from "react";
import "./App.css";
import { ProductDetails } from "./pages/Products/Detail";
import { ProductList } from "./pages/Products/List";
function App() {
  const [productId, setProductId] = React.useState<number | null>(null);

  const onProductDetail = (id: number) => {
    setProductId(id);
  };

  const onProductList = () => {
    setProductId(null);
  };

  return (
    <div className="App">
      {productId !== null ? (
        <ProductDetails id={productId} onProductList={onProductList} />
      ) : (
        <ProductList onProductDetail={onProductDetail} />
      )}
    </div>
  );
}

export default App;
