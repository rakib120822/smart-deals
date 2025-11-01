import React from "react";
import LatestProducts from "../latest-products/LatestProducts";

const latestProductsPromise = fetch(
  "http://localhost:3000/latest-products"
).then((res) => res.json());

function Home() {
  return (
    <div>
      <title>Home</title>
      <LatestProducts latestProductsPromise={latestProductsPromise} />
    </div>
  );
}

export default Home;
