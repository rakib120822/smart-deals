import React, { use, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Swal from "sweetalert2";

function MyBids() {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);

  const handleRemoveBid = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/bids/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });

              const remainingBids = bids.filter((bid) => bid._id !== _id);
              setBids(remainingBids);
            }
          });

        
      }
    });
  };

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bids?email=${user.email}`)
        .then((res) => res.json())
        .then((data) =>
          setBids(data.sort((a, b) => b.bid_price - a.bid_price))
        );
    }
  }, [user?.email]);

  return (
    <div className="w-11/12 mx-auto">
      <h3 className="my-5">My bids: {bids.length}</h3>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Buyer Name</th>
              <th>Buyer Email</th>
              <th>Bid Price</th>
              <th>Status</th>
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
                <td>
                  <div className="badge badge-md badge-soft badge-warning">
                    {bid.status}
                  </div>
                </td>
                <th>
                  <button
                    onClick={() => handleRemoveBid(bid._id)}
                    className="btn btn-error btn-outline btn-md"
                  >
                    Remove
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyBids;
