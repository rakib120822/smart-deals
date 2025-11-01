import React, { useEffect, useState } from "react";
import { use } from "react";
import { useRef } from "react";
import { useLoaderData } from "react-router";
import AuthContext from "../../context/AuthContext";
import Swal from "sweetalert2";

function ProductsDetails() {
  const bidModalRef = useRef(null);
  const [bids, setBids] = useState([]);
  const product = useLoaderData();

  const { user } = use(AuthContext);
  const { _id } = product;

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const bid = e.target.bid.value;
  
    const newBid = {
      product: _id,
      buyer_name: name,
      buyer_email: email,
      bid_price: bid,
      bid_image: user?.photoURL,
      status: "pending",
    };
    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your bid is placed",
            showConfirmButton: false,
            timer: 1500,
          });
          newBid._id = data.insertedId;

          setBids([...bids, newBid].sort((a, b) => a.bid_price - b.bid_price));
        }
      });
  };

  useEffect(() => {
    fetch(`http://localhost:3000/bids/${_id}`)
      .then((res) => res.json())
      .then((data) => setBids(data));
  }, [_id]);

  return (
    <div className="  flex flex-col justify-center items-center h-screen w-full">
      <div className="hero-content flex-col lg:flex-row border">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Box Office News!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button
            onClick={() => bidModalRef.current.showModal()}
            className="btn btn-primary"
          >
            I want to buy a product
          </button>

          {/* Open the modal using document.getElementById('ID').showModal() method */}

          <dialog
            ref={bidModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box text-center">
              <h3 className="font-bold text-lg">Give the best offer!</h3>
              <p className="py-4">Offer something seller can't regists</p>
              <form onSubmit={handleBidSubmit}>
                <fieldset className="fieldset">
                  <label className="floating-label">
                    <input
                      type="text"
                      className="input w-full text-black"
                      placeholder="name"
                      defaultValue={user?.displayName}
                      readOnly
                      name="name"
                    />
                    <span> Name</span>
                  </label>
                  <label className="floating-label mt-3">
                    <input
                      type="email"
                      className="input w-full"
                      defaultValue={user?.email}
                      readOnly
                      name="email"
                    />
                    <span> email</span>
                  </label>
                  <label className="floating-label mt-3">
                    <input
                      type="number"
                      className="input w-full"
                      placeholder="Your Bid"
                      min={10}
                      name="bid"
                    />
                    <span> bids</span>
                  </label>

                  <button className="btn btn-neutral mt-4">
                    Please Your Bid
                  </button>
                </fieldset>
              </form>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      <div>
        <h3 className="text-3xl my-5">
          Bids for this Products : {bids.length}
        </h3>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {bids.map((bid, index) => (
                <tr key={bid._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid.buyer_name}</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>{bid.buyer_email}</td>
                  <td>{bid.bid_price}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductsDetails;
