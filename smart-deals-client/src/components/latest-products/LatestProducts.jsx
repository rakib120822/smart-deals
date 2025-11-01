import React from "react";
import { use } from "react";
import Card from "../card/Card";

function LatestProducts({ latestProductsPromise }) {
  const latestProducts = use(latestProductsPromise);
  
  return (
    <div>
        <title>Latest - Products</title>
      <h1 className="text-center font-bold text-4xl my-5">
        Latest <span className="text-primary">Products</span>
      </h1>
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {latestProducts.map((product) => (
          <Card product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}

export default LatestProducts;
