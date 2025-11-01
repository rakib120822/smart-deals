import React from "react";
import { Link } from "react-router";

function Card({ product }) {
  
  const { title, price_max, price_min, status, _id } = product;

  return (
    <div className="card bg-base-100  shadow-sm">
      <figure className="px-5 pt-5">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body  ">
        <div className="max-w-20 text-primary  rounded-2xl  text-center md:py-0.5 lg:py-1 bg-primary/10">
          {status}
        </div>
        <h2 className="card-title">{title}</h2>
        <div className="text-primary   text-start md:py-0.5 lg:py-1 rounded-2xl my-1 font-bold text-lg">
          Price : ${price_min} - {price_max}
        </div>

        <Link
          to={`/product-details/${_id}`}
          className="btn btn-primary btn-outline"
        >
          View More
        </Link>
      </div>
    </div>
  );
}

export default Card;
